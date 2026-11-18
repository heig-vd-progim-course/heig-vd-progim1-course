// Code Java exécutable dans le navigateur, à l'essai.
//
// Dans le Markdown, un bloc exécutable est un
// `<div class="java-run" data-engine="cheerpj" markdown>` qui contient un bloc
// de code ```java avec une méthode `main`. Le script remplace le bloc par un
// éditeur, un bouton _Exécuter_ et une zone de sortie.
//
// Si le bloc contient aussi un bloc ```text, c'est un exercice : ce bloc est
// la sortie attendue. Après l'exécution, la sortie obtenue lui est comparée
// ligne par ligne, sans tenir compte des espaces en fin de ligne.
//
// Un bloc ```text title="Entrée" donne ce que la personne tape au clavier,
// une ligne par réponse. Une zone _Entrée_ apparaît sous l'éditeur dès que le
// code contient `IO.readln`, préremplie avec ce bloc s'il existe.
//
// `IO.readln` est remplacé, avant la compilation, par une classe générée qui
// lit ces lignes et les réaffiche après la question, comme le ferait un
// terminal : `Votre prénom : Camille`. Le remplacement se fait sur la même
// ligne, les numéros de ligne des erreurs restent justes. Un vrai clavier
// demanderait de suspendre le programme, ce qu'aucun des deux moteurs ne
// permet simplement.
//
// Deux moteurs, chargés seulement au premier clic sur _Exécuter_ :
//
// - `cheerpj` : une JVM OpenJDK compilée en WebAssembly, chargée depuis le CDN
//   de Leaning Technologies. Le vrai `javac` 25 et la vraie bibliothèque Java.
// - `teavm` : `javac` 25 et TeaVM compilés en WebAssembly. Le programme est
//   traduit en WebAssembly puis exécuté. Les fichiers sont dans
//   `docs/vendor/teavm/`, copiés depuis https://teavm.org/playground/3/.
//
// Un menu dans la barre d'outils permet de changer de moteur, pour comparer.

(function () {
	"use strict";

	const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

	// `document.currentScript` n'existe qu'au chargement du script
	const scriptUrl = document.currentScript
		? document.currentScript.src
		: window.location.href;
	const teavmBase = new URL("../vendor/teavm/", scriptUrl).href;

	const CHEERPJ_LOADER = "https://cjrtnc.leaningtech.com/5.0/loader.js";

	const ENGINES = {
		cheerpj: { label: "CheerpJ (javac 25)", load: loadCheerpJ },
		teavm: { label: "TeaVM (javac 25)", load: loadTeaVM },
	};

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

	// Laisse le navigateur afficher le statut avant un calcul bloquant
	function nextFrame() {
		return new Promise((resolve) => setTimeout(resolve, 30));
	}

	function loadScript(src) {
		return new Promise((resolve, reject) => {
			const script = document.createElement("script");
			script.src = src;
			script.onload = resolve;
			script.onerror = () => reject(new Error("Impossible de charger " + src));
			document.head.appendChild(script);
		});
	}

	// --- Saisie clavier --------------------------------------------------------

	const INPUT_CLASS = "__ProgimIO";
	const READLN_PATTERN = /\bIO\s*\.\s*readln\s*\(/g;

	function usesReadln(source) {
		return new RegExp(READLN_PATTERN.source).test(source);
	}

	// Littéral Java sûr. Les caractères non ASCII et de contrôle deviennent
	// \uXXXX, sauf les fins de ligne : Java traduit les \u avant de lire le
	// code, un \u000a couperait la chaîne. Pas d'échappement octal : le `javac`
	// de TeaVM lit mal `\0115`.
	const NAMED_ESCAPES = { 8: "\\b", 9: "\\t", 10: "\\n", 12: "\\f", 13: "\\r" };

	function javaString(text) {
		let result = '"';
		for (let i = 0; i < text.length; i += 1) {
			const ch = text[i];
			const code = text.charCodeAt(i);
			if (ch === '"' || ch === "\\") {
				result += "\\" + ch;
			} else if (NAMED_ESCAPES[code]) {
				result += NAMED_ESCAPES[code];
			} else if (code < 32 || code > 126) {
				result += "\\u" + code.toString(16).padStart(4, "0");
			} else {
				result += ch;
			}
		}
		return result + '"';
	}

	function inputClassSource(lines) {
		return [
			"final class " + INPUT_CLASS + " {",
			"    private static final String[] LINES = {",
			lines.map((line) => "        " + javaString(line) + ",").join("\n"),
			"    };",
			"    private static int next = 0;",
			"",
			"    static String readln(String prompt) {",
			"        System.out.print(prompt);",
			"        return readln();",
			"    }",
			"",
			"    static String readln() {",
			"        if (next >= LINES.length) {",
			"            System.out.println();",
			"            System.err.println(\"(Il n'y a plus de ligne dans l'entr\\u00e9e.)\");",
			"            return null;",
			"        }",
			"        String line = LINES[next];",
			"        next = next + 1;",
			"        System.out.println(line);",
			"        return line;",
			"    }",
			"}",
			"",
		].join("\n");
	}

	// Rend les fichiers à compiler : `Main.java`, et la classe de saisie si
	// le programme utilise `IO.readln`
	function prepareFiles(source, inputLines) {
		if (!usesReadln(source)) {
			return [{ name: "Main.java", content: source }];
		}
		return [
			{
				name: "Main.java",
				content: source.replace(READLN_PATTERN, INPUT_CLASS + ".readln("),
			},
			{ name: INPUT_CLASS + ".java", content: inputClassSource(inputLines) },
		];
	}

	// Les messages ne doivent pas trahir le remplacement
	function hideInputClass(text) {
		return text.replaceAll(INPUT_CLASS, "IO");
	}

	// --- CheerpJ -------------------------------------------------------------

	// CheerpJ écrit `System.out` et `System.err` dans l'élément `#console`.
	// Une seule JVM par page : les exécutions passent l'une après l'autre.
	async function loadCheerpJ() {
		await loadScript(CHEERPJ_LOADER);

		let consoleElement = document.getElementById("console");
		if (!consoleElement) {
			consoleElement = document.createElement("pre");
			consoleElement.id = "console";
			consoleElement.hidden = true;
			document.body.appendChild(consoleElement);
		}

		await window.cheerpjInit({ version: 25, status: "none" });

		let runCount = 0;

		return {
			async run(files) {
				// Un dossier par exécution : la JVM garde en mémoire les classes
				// déjà chargées, un nouveau dossier force le rechargement
				runCount += 1;
				const dir = "/files/run-" + Date.now() + "-" + runCount + "/";

				// En UTF-8, comme JavaFiddle : `javac` 25 lit l'UTF-8 par défaut
				const encoder = new TextEncoder();
				const paths = files.map((file) => {
					const path = "/str/" + file.name;
					window.cheerpjAddStringFile(path, encoder.encode(file.content));
					return path;
				});

				consoleElement.textContent = "";
				const compileCode = await window.cheerpjRunMain(
					"com.sun.tools.javac.Main",
					dir,
					...paths,
					"-d",
					dir,
				);
				await nextFrame();
				const compileLog = consoleElement.textContent.replaceAll("/str/", "");

				if (compileCode !== 0) {
					return { compileError: compileLog || "Erreur de compilation." };
				}

				consoleElement.textContent = "";
				const exitCode = await window.cheerpjRunMain("Main", dir);
				await nextFrame();

				return { output: consoleElement.textContent, exitCode: exitCode };
			},
		};
	}

	// --- TeaVM ---------------------------------------------------------------

	async function fetchBytes(url) {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error("Impossible de charger " + url);
		}
		return new Int8Array(await response.arrayBuffer());
	}

	async function loadTeaVM() {
		const runtime = await import(teavmBase + "compiler.wasm-runtime.js");
		// On passe les octets plutôt que l'URL : `load(url)` exige que le
		// serveur envoie le type `application/wasm`, ce que `zensical serve`
		// ne fait pas
		const teavm = await runtime.load(
			await fetchBytes(teavmBase + "compiler.wasm"),
		);
		const compiler = teavm.exports.createCompiler();

		const [sdk, classlib] = await Promise.all([
			fetchBytes(teavmBase + "compile-classlib-teavm.bin"),
			fetchBytes(teavmBase + "runtime-classlib-teavm.bin"),
		]);
		compiler.setSdk(sdk);
		compiler.setTeaVMClasslib(classlib);

		const diagnostics = [];
		compiler.onDiagnostic((d) => {
			diagnostics.push({
				type: d.type,
				severity: d.severity,
				fileName: d.fileName,
				lineNumber: d.lineNumber,
				columnNumber: d.columnNumber,
				message: d.message,
			});
		});

		// Même présentation que `javac` : fichier, ligne, message, puis la
		// ligne fautive et un ^ sous la colonne
		function formatDiagnostics(source) {
			const lines = source.split("\n");
			const errors = diagnostics.filter((d) => d.severity === "error");
			const text = errors
				.map((d) => {
					const file = d.fileName
						? String(d.fileName).split("/").pop()
						: "Main.java";
					let result = file + (d.lineNumber > 0 ? ":" + d.lineNumber : "");
					result += ": error: " + d.message;
					const line = lines[d.lineNumber - 1];
					if (line !== undefined) {
						result += "\n" + line;
						if (d.columnNumber > 0) {
							result += "\n" + " ".repeat(d.columnNumber - 1) + "^";
						}
					}
					return result;
				})
				.join("\n");
			const count = errors.length === 1 ? "1 error" : errors.length + " errors";
			return errors.length > 0 ? text + "\n" + count : "";
		}

		return {
			async run(files) {
				const source = files[0].content;
				diagnostics.length = 0;
				compiler.clearSourceFiles();
				compiler.clearOutputFiles();
				files.forEach((file) =>
					compiler.addSourceFile(file.name, file.content),
				);

				let compiled;
				try {
					compiled = compiler.compile();
				} catch (error) {
					// Le compilateur est dans un état inconnu : on le recharge
					delete loaded.teavm;
					return {
						compileError:
							"Le compilateur TeaVM a planté (" +
							error.message +
							").\n" +
							"Ce programme est probablement correct : essayez CheerpJ.",
					};
				}

				if (!compiled) {
					return {
						compileError: formatDiagnostics(source) || "Erreur de compilation.",
					};
				}

				const generated = await compiler.generateWebAssembly({
					outputName: "app",
					mainClass: "Main",
				});
				if (!generated) {
					return {
						compileError:
							"TeaVM n'a pas pu traduire le programme :\n" +
							formatDiagnostics(source),
					};
				}

				const outputFiles = Array.from(compiler.listWebAssemblyOutputFiles());
				const wasmName = outputFiles.find(
					(name) => name.endsWith(".wasm") && !name.includes("deobfuscator"),
				);
				const bytes = compiler.getWebAssemblyOutputFile(wasmName);

				let output = "";
				const program = await runtime.load(bytes, {
					installImports(imports) {
						imports.teavmConsole.putcharStdout = (c) => {
							output += String.fromCharCode(c);
						};
						imports.teavmConsole.putcharStderr = (c) => {
							output += String.fromCharCode(c);
						};
					},
				});

				let exitCode = 0;
				try {
					await program.exports.main([]);
				} catch (error) {
					exitCode = 1;
					output +=
						"\n" + (error && error.message ? error.message : String(error));
				}

				return { output: output, exitCode: exitCode };
			},
		};
	}

	// --- Chargement partagé et file d'attente ---------------------------------

	const loaded = {};
	const queues = {};

	function getEngine(name) {
		if (!loaded[name]) {
			loaded[name] = ENGINES[name].load();
			// Un échec de chargement doit pouvoir être retenté
			loaded[name].catch(() => delete loaded[name]);
		}
		return loaded[name];
	}

	// Une exécution à la fois par moteur. Un programme qui ne se termine pas
	// (une boucle infinie) bloque son moteur jusqu'au
	// rechargement de la page, mais pas l'autre moteur.
	function enqueue(engineName, task) {
		const previous = queues[engineName] || Promise.resolve();
		const result = previous.then(task, task);
		queues[engineName] = result.catch(() => {});
		return result;
	}

	// --- Comparaison de la sortie --------------------------------------------

	function normalize(text) {
		return text
			.replace(/\r\n/g, "\n")
			.split("\n")
			.map((line) => line.replace(/\s+$/, ""))
			.join("\n")
			.replace(/\n+$/, "");
	}

	function compare(expected, obtained) {
		const want = normalize(expected).split("\n");
		const got = normalize(obtained).split("\n");
		const rows = [];
		const length = Math.max(want.length, got.length);

		for (let i = 0; i < length; i += 1) {
			rows.push({
				line: i + 1,
				expected: want[i],
				obtained: got[i],
				ok: want[i] === got[i],
			});
		}
		return { ok: rows.every((row) => row.ok), rows: rows };
	}

	// --- Interface -----------------------------------------------------------

	function extractCode(block) {
		const code =
			block.querySelector("td.code code") || block.querySelector("pre code");
		const clone = code.cloneNode(true);
		clone.querySelectorAll("a[id^='__codelineno']").forEach((a) => a.remove());
		return clone.textContent.replace(/\n+$/, "") + "\n";
	}

	function button(text, className) {
		const element = document.createElement("button");
		element.type = "button";
		element.className = "md-button " + className;
		element.textContent = text;
		return element;
	}

	function resizeEditor(editor) {
		editor.style.height = "auto";
		editor.style.height = editor.scrollHeight + 4 + "px";
	}

	function renderCheck(container, check) {
		container.innerHTML = "";
		container.hidden = false;
		container.classList.toggle("java-run-check--ok", check.ok);
		container.classList.toggle("java-run-check--ko", !check.ok);

		const title = document.createElement("p");
		title.className = "java-run-check-title";
		title.textContent = check.ok
			? "Sortie correcte."
			: "La sortie ne correspond pas à la sortie attendue.";
		container.appendChild(title);

		if (check.ok) {
			return;
		}

		const table = document.createElement("table");
		table.innerHTML =
			"<thead><tr><th>Ligne</th><th>Attendu</th><th>Obtenu</th></tr></thead>";
		const body = document.createElement("tbody");

		check.rows
			.filter((row) => !row.ok)
			.forEach((row) => {
				const tr = document.createElement("tr");
				[String(row.line), row.expected, row.obtained].forEach(
					(value, index) => {
						const td = document.createElement("td");
						if (index === 0) {
							td.textContent = value;
						} else if (value === undefined) {
							td.innerHTML = "<em>(rien)</em>";
						} else {
							const code = document.createElement("code");
							code.textContent = value === "" ? " " : value;
							td.appendChild(code);
						}
						tr.appendChild(td);
					},
				);
				body.appendChild(tr);
			});

		table.appendChild(body);
		container.appendChild(table);
	}

	function setup(root) {
		if (root.dataset.javaRunReady) {
			return;
		}

		const javaBlock = root.querySelector(".language-java");
		if (!javaBlock) {
			return;
		}
		root.dataset.javaRunReady = "true";

		// Un bloc texte intitulé « Entrée » est la saisie, l'autre la sortie
		// attendue
		let textBlock = null;
		let inputBlock = null;
		root.querySelectorAll(".language-text").forEach((block) => {
			const title = block.querySelector(".filename");
			if (title && /^entr[ée]e/i.test(title.textContent.trim())) {
				inputBlock = inputBlock || block;
			} else {
				textBlock = textBlock || block;
			}
		});
		const expected = textBlock ? extractCode(textBlock) : null;
		const originalInput = inputBlock
			? extractCode(inputBlock).replace(/\n$/, "")
			: "";
		const original = extractCode(javaBlock);

		const titleElement = javaBlock.querySelector(".filename");
		const fileName = titleElement ? titleElement.textContent : "Main.java";

		// Éditeur
		const editor = document.createElement("textarea");
		editor.className = "java-run-editor";
		editor.spellcheck = false;
		editor.autocapitalize = "off";
		editor.setAttribute("autocomplete", "off");
		editor.setAttribute("aria-label", "Code Java de " + fileName);
		editor.value = original;

		editor.addEventListener("input", () => resizeEditor(editor));
		editor.addEventListener("keydown", (event) => {
			// Tab insère quatre espaces ; Échap puis Tab sort de l'éditeur
			if (event.key === "Tab" && !event.shiftKey && !editor.dataset.escape) {
				event.preventDefault();
				editor.setRangeText(
					"    ",
					editor.selectionStart,
					editor.selectionEnd,
					"end",
				);
				resizeEditor(editor);
			}
			editor.dataset.escape = event.key === "Escape" ? "true" : "";
		});

		// Barre d'outils
		const toolbar = document.createElement("div");
		toolbar.className = "java-run-toolbar";

		const label = document.createElement("span");
		label.className = "java-run-filename";
		label.textContent = fileName;

		const runButton = button("Exécuter", "md-button--primary java-run-button");
		const resetButton = button("Réinitialiser", "java-run-reset");

		const engineSelect = document.createElement("select");
		engineSelect.className = "java-run-engine";
		engineSelect.setAttribute("aria-label", "Moteur d'exécution");
		Object.keys(ENGINES).forEach((key) => {
			const option = document.createElement("option");
			option.value = key;
			option.textContent = ENGINES[key].label;
			engineSelect.appendChild(option);
		});
		engineSelect.value = ENGINES[root.dataset.engine]
			? root.dataset.engine
			: "cheerpj";

		const status = document.createElement("span");
		status.className = "java-run-status";
		status.setAttribute("role", "status");

		toolbar.append(label, runButton, resetButton, engineSelect, status);

		// Entrée
		const inputLabel = document.createElement("label");
		inputLabel.className = "java-run-input-label";
		inputLabel.textContent =
			"Entrée (ce que vous taperiez, une ligne par réponse)";

		const inputArea = document.createElement("textarea");
		inputArea.className = "java-run-input";
		inputArea.spellcheck = false;
		inputArea.rows = 2;
		inputArea.value = originalInput;
		inputLabel.appendChild(inputArea);

		function updateInputVisibility() {
			inputLabel.hidden = !inputBlock && !usesReadln(editor.value);
		}

		// Sortie
		const outputLabel = document.createElement("p");
		outputLabel.className = "java-run-output-label";
		outputLabel.textContent = "Sortie";
		outputLabel.hidden = true;

		const output = document.createElement("pre");
		output.className = "java-run-output";
		output.hidden = true;

		const checkBox = document.createElement("div");
		checkBox.className = "java-run-check";
		checkBox.hidden = true;

		const wrapper = document.createElement("div");
		wrapper.className = "java-run-widget";
		wrapper.append(toolbar, editor, inputLabel, outputLabel, output, checkBox);
		javaBlock.replaceWith(wrapper);

		if (inputBlock) {
			// Le contenu est repris dans la zone d'entrée
			inputBlock.remove();
		}

		if (textBlock) {
			root.classList.add("java-run--exercise");
			// La sortie attendue reste affichée, entre l'entrée et la sortie
			inputLabel.after(textBlock);
		}

		resizeEditor(editor);
		updateInputVisibility();
		editor.addEventListener("input", updateInputVisibility);

		resetButton.addEventListener("click", () => {
			editor.value = original;
			inputArea.value = originalInput;
			resizeEditor(editor);
			updateInputVisibility();
		});

		runButton.addEventListener("click", () => {
			const engineName = engineSelect.value;
			const inputText = inputArea.value.replace(/\r\n/g, "\n");
			const inputLines =
				inputText === "" ? [] : inputText.replace(/\n$/, "").split("\n");
			const files = prepareFiles(editor.value, inputLines);

			runButton.disabled = true;
			status.textContent = "En attente...";

			enqueue(engineName, async () => {
				const started = performance.now();
				const firstLoad = !loaded[engineName];

				status.textContent = firstLoad
					? "Chargement de " + ENGINES[engineName].label + "..."
					: "Compilation...";
				await nextFrame();

				const engine = await getEngine(engineName);
				const loadedAt = performance.now();

				status.textContent = "Compilation et exécution...";
				await nextFrame();

				const result = await engine.run(files);
				const finished = performance.now();
				return { result, firstLoad, started, loadedAt, finished };
			})
				.then(({ result, firstLoad, started, loadedAt, finished }) => {
					const seconds = (ms) =>
						(ms / 1000).toFixed(1).replace(".", ",") + " s";
					status.textContent =
						(firstLoad
							? "Chargement " + seconds(loadedAt - started) + ", "
							: "") +
						"compilation et exécution " +
						seconds(finished - loadedAt);

					outputLabel.hidden = false;
					output.hidden = false;
					output.classList.toggle(
						"java-run-output--error",
						!!result.compileError,
					);

					if (result.compileError) {
						outputLabel.textContent = "Erreur de compilation";
						output.textContent = hideInputClass(result.compileError);
						checkBox.hidden = true;
						return;
					}

					const programOutput = hideInputClass(result.output);
					outputLabel.textContent = "Sortie";
					output.textContent =
						programOutput === "" ? "(aucune sortie)" : programOutput;

					if (expected !== null) {
						const check = compare(expected, programOutput);
						renderCheck(checkBox, check);
						if (check.ok) {
							celebrate(checkBox);
						}
					}
				})
				.catch((error) => {
					status.textContent =
						"Échec : " + (error && error.message ? error.message : error);
					console.error(error);
				})
				.finally(() => {
					runButton.disabled = false;
				});
		});
	}

	function setupAll() {
		document.querySelectorAll(".java-run").forEach(setup);
	}

	if (window.document$ && typeof window.document$.subscribe === "function") {
		window.document$.subscribe(setupAll);
	} else {
		document.addEventListener("DOMContentLoaded", setupAll);
	}
})();
