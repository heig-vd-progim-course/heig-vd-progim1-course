// Problèmes de Parsons pour les pages du support.
//
// Dans le Markdown, un problème de Parsons est un bloc
// `<div class="parsons" markdown>` qui contient une consigne, puis un bloc de
// code écrit **dans le bon ordre**, et facultativement un bloc
// `<div class="parsons-explanation" markdown>`.
//
// Ce script remplace le bloc de code par ses lignes mélangées. On les remet
// dans l'ordre en les faisant glisser, à la souris ou au doigt, ou avec les
// flèches du clavier, puis on clique sur _Valider ma solution_. Rien n'est
// vérifié avant ce clic : déplacer les lignes au hasard ne fait pas gagner.
//
// Chaque validation compte comme un essai. Quand l'ordre est le bon,
// l'explication s'affiche et des confettis partent, sauf si le système demande
// de réduire les animations. Au-delà de N essais sans succès (3 par défaut,
// ou la valeur de `data-attempts` sur le bloc), un message suggère de
// retravailler la matière. On peut continuer autant qu'on veut.
//
// Deux lignes identiques (deux `}`, par exemple) sont interchangeables : on
// compare le texte des lignes, pas leur identité.
//
// Plusieurs ordres peuvent être justes. Chaque bloc de code supplémentaire,
// après le premier, est un autre ordre accepté : on y écrit le même programme,
// avec les mêmes lignes, dans l'autre ordre. Seul le premier est affiché.
//
// La coloration syntaxique est conservée : on réutilise le HTML produit par
// `pymdownx.highlight`, ligne par ligne, grâce à l'option `line_spans`.

(function () {
	"use strict";

	const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

	function celebrate(element) {
		if (typeof window.confetti !== "function" || reducedMotion.matches) {
			return;
		}

		const rect = element.getBoundingClientRect();

		window.confetti({
			particleCount: 100,
			spread: 70,
			origin: {
				x: (rect.left + rect.width / 2) / window.innerWidth,
				y: (rect.top + rect.height / 2) / window.innerHeight,
			},
		});
	}

	// Extrait les lignes du bloc de code, avec leur HTML coloré
	function extractLines(code) {
		const spans = code.querySelectorAll(":scope > span[id^='__span-']");

		if (spans.length > 0) {
			return Array.from(spans)
				.map((span) => {
					const clone = span.cloneNode(true);
					clone.querySelectorAll("a[id^='__codelineno']").forEach((a) => a.remove());
					return {
						text: clone.textContent.replace(/\n$/, ""),
						html: clone.innerHTML.replace(/\n$/, ""),
					};
				})
				.filter((line) => line.text.trim() !== "");
		}

		// Sans `line_spans` : on perd les couleurs, mais pas les lignes
		return code.textContent
			.split("\n")
			.filter((text) => text.trim() !== "")
			.map((text) => {
				const span = document.createElement("span");
				span.textContent = text;
				return { text: text, html: span.innerHTML };
			});
	}

	function shuffle(items) {
		const result = items.slice();
		for (let i = result.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[result[i], result[j]] = [result[j], result[i]];
		}
		return result;
	}

	// Mélange jusqu'à obtenir un ordre qui n'est aucune des solutions, si possible
	function shuffleAway(lines, solutions) {
		const distinct = new Set(solutions[0]).size;
		let result = shuffle(lines);
		let attempts = 0;
		while (distinct > 1 && attempts < 50 && matchesAny(result.map((l) => l.text), solutions)) {
			result = shuffle(lines);
			attempts++;
		}
		return result;
	}

	function sameOrder(a, b) {
		return a.length === b.length && a.every((text, index) => text === b[index]);
	}

	function matchesAny(order, solutions) {
		return solutions.some((solution) => sameOrder(order, solution));
	}

	// Deux solutions doivent contenir exactement les mêmes lignes
	function sameLines(a, b) {
		return sameOrder(a.slice().sort(), b.slice().sort());
	}

	const DEFAULT_ATTEMPTS = 3;

	function plural(count, word) {
		return count + " " + word + (count > 1 ? "s" : "");
	}

	function setupParsons(parsons) {
		if (parsons.dataset.parsonsReady === "true") {
			return;
		}

		// Les blocs de code de l'explication ne sont pas des solutions
		const blocks = Array.from(parsons.querySelectorAll(".highlight")).filter(
			(candidate) => !candidate.closest(".parsons-explanation"),
		);
		const block = blocks[0];
		const code = block ? block.querySelector("code") : null;
		if (!code) {
			return;
		}

		const lines = extractLines(code);
		if (lines.length < 2) {
			return;
		}

		parsons.dataset.parsonsReady = "true";

		const solution = lines.map((line) => line.text);
		const solutions = [solution];
		blocks.slice(1).forEach((other) => {
			const otherCode = other.querySelector("code");
			const alternative = otherCode ? extractLines(otherCode).map((line) => line.text) : [];
			if (sameLines(alternative, solution)) {
				solutions.push(alternative);
			} else {
				console.warn("Parsons : une solution alternative n'a pas les mêmes lignes que la première.", other);
			}
			other.remove();
		});
		const language = Array.from(block.classList).find((c) => c.startsWith("language-"));

		const explanation = parsons.querySelector(".parsons-explanation");
		if (explanation) {
			explanation.hidden = true;
		}

		const list = document.createElement("ol");
		list.className = "parsons-lines highlight" + (language ? " " + language : "");
		list.setAttribute("aria-label", "Lignes à remettre dans l'ordre");

		const maxAttempts = parseInt(parsons.dataset.attempts, 10) || DEFAULT_ATTEMPTS;
		let attempts = 0;

		const validate = document.createElement("button");
		validate.type = "button";
		validate.className = "parsons-validate md-button md-button--primary";
		validate.textContent = "Valider ma solution";

		const reset = document.createElement("button");
		reset.type = "button";
		reset.className = "parsons-reset md-button";
		reset.textContent = "Mélanger à nouveau";

		const buttons = document.createElement("div");
		buttons.className = "parsons-buttons";
		buttons.append(validate, reset);

		const feedback = document.createElement("p");
		feedback.className = "parsons-feedback";
		feedback.setAttribute("aria-live", "polite");

		const advice = document.createElement("p");
		advice.className = "parsons-advice";
		advice.hidden = true;
		advice.textContent =
			"Vous n'avez pas trouvé en moins de " +
			plural(maxAttempts, "essai") +
			". Il est peut-être nécessaire de retravailler la matière : relisez la " +
			"théorie, puis revenez à cet exercice.";

		const toolbar = document.createElement("div");
		toolbar.className = "parsons-toolbar";
		toolbar.append(buttons, feedback, advice);

		block.replaceWith(list);
		list.after(toolbar);

		function currentOrder() {
			return Array.from(list.children).map((item) => item.dataset.text);
		}

		function check() {
			if (parsons.classList.contains("parsons--solved")) {
				return;
			}
			attempts++;

			if (matchesAny(currentOrder(), solutions)) {
				parsons.classList.add("parsons--solved");
				parsons.classList.remove("parsons--wrong");
				validate.disabled = true;
				feedback.textContent =
					attempts === 1
						? "Bon ordre, trouvé au premier essai."
						: "Bon ordre, trouvé en " + plural(attempts, "essai") + ".";
				list.querySelectorAll(".parsons-line").forEach((item) => {
					item.tabIndex = -1;
				});
				if (explanation) {
					explanation.hidden = false;
				}
				celebrate(list);
			} else {
				parsons.classList.add("parsons--wrong");
				feedback.textContent =
					"Ce n'est pas encore le bon ordre. " +
					plural(attempts, "essai") +
					" pour l'instant.";
				advice.hidden = attempts < maxAttempts;
			}
		}

		function move(item, offset) {
			if (parsons.classList.contains("parsons--solved")) {
				return;
			}
			if (offset < 0 && item.previousElementSibling) {
				list.insertBefore(item, item.previousElementSibling);
			} else if (offset > 0 && item.nextElementSibling) {
				list.insertBefore(item.nextElementSibling, item);
			} else {
				return;
			}
			item.focus();
		}

		function makeItem(line) {
			const item = document.createElement("li");
			item.className = "parsons-line";
			item.dataset.text = line.text;
			item.tabIndex = 0;
			item.setAttribute("aria-roledescription", "ligne déplaçable");

			const handle = document.createElement("span");
			handle.className = "parsons-handle";
			handle.setAttribute("aria-hidden", "true");

			const content = document.createElement("code");
			content.innerHTML = line.html;

			item.append(handle, content);

			item.addEventListener("keydown", (event) => {
				if (event.key === "ArrowUp") {
					event.preventDefault();
					move(item, -1);
				} else if (event.key === "ArrowDown") {
					event.preventDefault();
					move(item, 1);
				}
			});

			// Glisser-déposer avec les Pointer Events : souris, doigt et stylet.
			// Les écouteurs sont posés sur le document, pas sur la ligne : déplacer
			// la ligne dans le DOM lui ferait perdre la capture du pointeur, et
			// elle ne recevrait plus ni les mouvements ni le relâchement.
			item.addEventListener("pointerdown", (event) => {
				if (parsons.classList.contains("parsons--solved") || event.button !== 0) {
					return;
				}
				// Au doigt, seule la poignée déplace la ligne : le reste fait défiler
				if (event.pointerType === "touch" && !event.target.closest(".parsons-handle")) {
					return;
				}
				event.preventDefault();
				item.classList.add("parsons-line--dragging");
				const pointerId = event.pointerId;

				function onMove(moveEvent) {
					if (moveEvent.pointerId !== pointerId) {
						return;
					}
					const siblings = Array.from(list.children).filter((other) => other !== item);
					const after = siblings.find((other) => {
						const rect = other.getBoundingClientRect();
						return moveEvent.clientY < rect.top + rect.height / 2;
					});
					if (after) {
						if (after !== item.nextElementSibling) {
							list.insertBefore(item, after);
						}
					} else if (item !== list.lastElementChild) {
						list.appendChild(item);
					}
				}

				function onUp(upEvent) {
					if (upEvent.pointerId !== pointerId) {
						return;
					}
					item.classList.remove("parsons-line--dragging");
					document.removeEventListener("pointermove", onMove);
					document.removeEventListener("pointerup", onUp);
					document.removeEventListener("pointercancel", onUp);
				}

				document.addEventListener("pointermove", onMove);
				document.addEventListener("pointerup", onUp);
				document.addEventListener("pointercancel", onUp);
			});

			return item;
		}

		function fill() {
			parsons.classList.remove("parsons--solved", "parsons--wrong");
			attempts = 0;
			validate.disabled = false;
			advice.hidden = true;
			feedback.textContent = "";
			if (explanation) {
				explanation.hidden = true;
			}
			list.replaceChildren(...shuffleAway(lines, solutions).map(makeItem));
		}

		validate.addEventListener("click", check);
		reset.addEventListener("click", fill);
		fill();
	}

	function setupAllParsons() {
		document.querySelectorAll(".parsons").forEach(setupParsons);
	}

	// Avec la navigation instantanée, `document$` émet à chaque changement de
	// page. Sans elle, on se contente du chargement initial.
	if (typeof window.document$ !== "undefined") {
		window.document$.subscribe(setupAllParsons);
	} else if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", setupAllParsons);
	} else {
		setupAllParsons();
	}
})();
