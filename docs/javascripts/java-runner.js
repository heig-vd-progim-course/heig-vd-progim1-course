// Code Java exécutable dans le navigateur, à l'essai.
//
// Utilisation dans le Markdown
// ----------------------------
//
// Un bloc exécutable est un `<div class="java-run" markdown>` qui contient un
// bloc de code ```java avec une classe `Main` et sa méthode `main`. Le script
// remplace le bloc par un éditeur, un bouton _Exécuter_ et une zone de sortie.
//
// Deux blocs ```text facultatifs :
//
// - `title="Entrée"` : ce que la personne tape au clavier, une ligne par
//   réponse. Il préremplit la zone _Entrée_, qui apparaît dès que le code
//   contient `IO.readln` ;
// - tout autre titre, `"Sortie attendue"` par exemple : le bloc devient un
//   exercice. La sortie obtenue lui est comparée ligne par ligne, sans tenir
//   compte des espaces en fin de ligne.
//
// Fonctionnement, et pourquoi
// ---------------------------
//
// 1. Compilation : `javac` 25 et TeaVM, compilés en WebAssembly, traduisent le
//    programme en un module WebAssembly. Les fichiers sont dans
//    `docs/vendor/teavm/`, voir le README.txt de ce dossier.
//
// 2. Saisie : on compile, à côté de `Main.java`, une classe `IO` maison. Une
//    classe du même paquet masque `java.lang.IO` : le code de la personne
//    n'est pas modifié, les erreurs de compilation restent exactes. Cette
//    classe lit les lignes de la zone _Entrée_ et les réaffiche après la
//    question, comme un terminal : `Votre prénom : Camille`.
//
//    Les lignes sont passées comme arguments à un petit lanceur, qui les
//    donne à `IO` puis appelle `Main.main`. Changer les réponses ne demande
//    donc pas de recompiler.
//
// 3. Exécution : dans un Web Worker (`java-runner-worker.js`), un fil séparé
//    de la page. Une boucle infinie gèlerait sinon l'onglet entier. Le
//    worker est tué après TIME_LIMIT_MS, au-delà de OUTPUT_LIMIT caractères
//    de sortie, ou par le bouton _Arrêter_.
//
// Le moteur est chargé au premier clic sur _Exécuter_ : les pages sans bloc
// exécutable ne téléchargent rien.

(function () {
	"use strict";

	const TIME_LIMIT_MS = 5000;
	const OUTPUT_LIMIT = 100000;

	const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

	// `document.currentScript` n'existe qu'au chargement du script
	const scriptUrl = document.currentScript
		? document.currentScript.src
		: window.location.href;
	const teavmBase = new URL("../vendor/teavm/", scriptUrl).href;
	const workerUrl = new URL("java-runner-worker.js", scriptUrl).href;

	// --- Sources Java ajoutées au programme ----------------------------------

	// Message de fin d'entrée, reconnu par `java-runner-worker.js`
	const NEED_INPUT = "__PROGIM_NEED_INPUT__";
	const LAUNCHER = "__ProgimLauncher";

	// Mêmes méthodes que `java.lang.IO` du JDK 25
	const IO_SOURCE = `final class IO {
    private static String[] input = new String[0];
    private static int next = 0;

    private IO() {
    }

    static void setInput(String[] lines) {
        input = lines;
        next = 0;
    }

    public static void print(Object obj) {
        System.out.print(obj);
    }

    public static void println(Object obj) {
        System.out.println(obj);
    }

    public static void println() {
        System.out.println();
    }

    public static String readln(String prompt) {
        System.out.print(prompt);
        return readln();
    }

    public static String readln() {
        if (next >= input.length) {
            throw new IllegalStateException("${NEED_INPUT}");
        }
        String line = input[next];
        next = next + 1;
        System.out.println(line);
        return line;
    }
}
`;

	// `catch (Exception e)` accepte aussi un `main` déclaré `throws Exception`
	const LAUNCHER_SOURCE = `final class ${LAUNCHER} {
    public static void main(String[] args) {
        IO.setInput(args);
        try {
            Main.main(new String[0]);
        } catch (RuntimeException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
`;

	// --- Outils ----------------------------------------------------------------

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

	function seconds(ms) {
		return (ms / 1000).toFixed(1).replace(".", ",") + " s";
	}

	async function fetchBytes(url) {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error("Impossible de charger " + url);
		}
		return new Int8Array(await response.arrayBuffer());
	}

	function usesReadln(source) {
		return /\bIO\s*\.\s*readln\b/.test(source);
	}

	// --- Compilation -----------------------------------------------------------

	let compilerPromise = null;

	function getCompiler() {
		if (!compilerPromise) {
			compilerPromise = loadCompiler();
			// Un échec de chargement doit pouvoir être retenté
			compilerPromise.catch(() => {
				compilerPromise = null;
			});
		}
		return compilerPromise;
	}

	async function loadCompiler() {
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
				severity: d.severity,
				fileName: d.fileName ? String(d.fileName).split("/").pop() : "",
				lineNumber: d.lineNumber,
				columnNumber: d.columnNumber,
				message: d.message,
			});
		});

		return { compiler, diagnostics };
	}

	// Même présentation que `javac` : fichier, ligne, message, puis la ligne
	// fautive et un ^ sous la colonne
	function formatDiagnostics(diagnostics, source) {
		const errors = diagnostics.filter((d) => d.severity === "error");
		if (errors.length === 0) {
			return "";
		}

		// Une erreur dans le lanceur : `Main` ou sa méthode `main` manque
		if (errors.some((d) => d.fileName === LAUNCHER + ".java")) {
			return (
				"Le programme doit contenir une classe Main avec sa méthode\n" +
				"public static void main(String[] args)."
			);
		}

		const lines = source.split("\n");
		const text = errors
			.map((d) => {
				let result = d.fileName || "Main.java";
				if (d.lineNumber > 0) {
					result += ":" + d.lineNumber;
				}
				result += ": error: " + d.message;
				const line = d.fileName === "Main.java" && lines[d.lineNumber - 1];
				if (line !== undefined && line !== false) {
					result += "\n" + line;
					if (d.columnNumber > 0) {
						result += "\n" + " ".repeat(d.columnNumber - 1) + "^";
					}
				}
				return result;
			})
			.join("\n");
		return (
			text +
			"\n" +
			(errors.length === 1 ? "1 error" : errors.length + " errors")
		);
	}

	// Une compilation à la fois : le compilateur n'a qu'un jeu de fichiers
	let compileQueue = Promise.resolve();

	function compile(source) {
		const task = () => compileNow(source);
		const result = compileQueue.then(task, task);
		compileQueue = result.catch(() => {});
		return result;
	}

	async function compileNow(source) {
		const { compiler, diagnostics } = await getCompiler();

		diagnostics.length = 0;
		compiler.clearSourceFiles();
		compiler.clearOutputFiles();
		compiler.addSourceFile("Main.java", source);
		compiler.addSourceFile("IO.java", IO_SOURCE);
		compiler.addSourceFile(LAUNCHER + ".java", LAUNCHER_SOURCE);

		let compiled;
		try {
			compiled = compiler.compile();
		} catch (error) {
			// Le compilateur est dans un état inconnu : on le recharge
			compilerPromise = null;
			return {
				compileError:
					"Le compilateur a planté (" +
					error.message +
					").\n" +
					"C'est un défaut connu du compilateur utilisé dans le navigateur,\n" +
					"par exemple avec une division par zéro écrite en toutes lettres.\n" +
					"Votre programme est peut-être correct : essayez-le dans IntelliJ.",
			};
		}

		if (!compiled) {
			return {
				compileError:
					formatDiagnostics(diagnostics, source) || "Erreur de compilation.",
			};
		}

		const generated = await compiler.generateWebAssembly({
			outputName: "app",
			mainClass: LAUNCHER,
		});
		if (!generated) {
			return {
				compileError:
					"Ce programme compile, mais ne peut pas s'exécuter dans le\n" +
					"navigateur. Essayez-le dans IntelliJ.\n\n" +
					formatDiagnostics(diagnostics, source),
			};
		}

		const outputFiles = Array.from(compiler.listWebAssemblyOutputFiles());
		const wasmName = outputFiles.find(
			(name) => name.endsWith(".wasm") && !name.includes("deobfuscator"),
		);
		return { bytes: compiler.getWebAssemblyOutputFile(wasmName) };
	}

	// --- Exécution dans un worker ----------------------------------------------

	// Lance le programme. `onOutput` reçoit la sortie au fil de l'eau. Rend une
	// fonction `stop` et une promesse du résultat :
	// { status: "done" | "error" | "need-input" | "timeout" | "too-much-output"
	//   | "stopped", message? }
	function execute(bytes, inputLines, onOutput) {
		let finish;
		const result = new Promise((resolve) => {
			finish = resolve;
		});

		const worker = new Worker(workerUrl, { type: "module" });
		let outputLength = 0;
		let finished = false;

		function end(value) {
			if (!finished) {
				finished = true;
				clearTimeout(timer);
				worker.terminate();
				finish(value);
			}
		}

		const timer = setTimeout(() => end({ status: "timeout" }), TIME_LIMIT_MS);

		worker.onmessage = (event) => {
			const data = event.data;
			if (data.type === "output") {
				outputLength += data.text.length;
				onOutput(data.text);
				if (outputLength > OUTPUT_LIMIT) {
					end({ status: "too-much-output" });
				}
			} else {
				end({ status: data.type, message: data.message });
			}
		};
		worker.onerror = (event) => {
			end({
				status: "error",
				message:
					"le navigateur n'a pas pu lancer le programme (" +
					(event.message || "erreur inconnue") +
					")",
			});
		};

		worker.postMessage({ bytes: bytes, args: inputLines });

		return { stop: () => end({ status: "stopped" }), result: result };
	}

	// --- Comparaison de la sortie ----------------------------------------------

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

	// --- Interface -------------------------------------------------------------

	function extractCode(block) {
		const code =
			block.querySelector("td.code code") || block.querySelector("pre code");
		const clone = code.cloneNode(true);
		clone.querySelectorAll("a[id^='__codelineno']").forEach((a) => a.remove());
		return clone.textContent.replace(/\n+$/, "") + "\n";
	}

	function createButton(text, className) {
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

	// Le message affiché quand le programme ne s'est pas terminé normalement
	const ENDINGS = {
		timeout:
			"Arrêté : le programme tournait depuis plus de " +
			TIME_LIMIT_MS / 1000 +
			" secondes. Une boucle infinie ?",
		"too-much-output":
			"Arrêté : le programme a affiché trop de texte. Une boucle infinie ?",
		stopped: "Arrêté.",
		error: "Arrêté par une erreur à l'exécution.",
		"need-input":
			"Le programme attend une réponse de plus : ajoutez une ligne dans la zone Entrée.",
	};

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
		let expectedBlock = null;
		let inputBlock = null;
		root.querySelectorAll(".language-text").forEach((block) => {
			const title = block.querySelector(".filename");
			if (title && /^entr[ée]e/i.test(title.textContent.trim())) {
				inputBlock = inputBlock || block;
			} else {
				expectedBlock = expectedBlock || block;
			}
		});
		const expected = expectedBlock ? extractCode(expectedBlock) : null;
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

		const runButton = createButton(
			"Exécuter",
			"md-button--primary java-run-button",
		);
		const stopButton = createButton("Arrêter", "java-run-stop");
		stopButton.hidden = true;
		const resetButton = createButton("Réinitialiser", "java-run-reset");

		const status = document.createElement("span");
		status.className = "java-run-status";
		status.setAttribute("role", "status");

		toolbar.append(label, runButton, stopButton, resetButton, status);

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
			// Son contenu est repris dans la zone Entrée
			inputBlock.remove();
		}
		if (expectedBlock) {
			root.classList.add("java-run--exercise");
			// La sortie attendue reste affichée, entre l'entrée et la sortie
			inputLabel.after(expectedBlock);
		}

		resizeEditor(editor);
		updateInputVisibility();
		editor.addEventListener("input", () => {
			resizeEditor(editor);
			updateInputVisibility();
		});

		resetButton.addEventListener("click", () => {
			editor.value = original;
			inputArea.value = originalInput;
			resizeEditor(editor);
			updateInputVisibility();
		});

		let stopCurrent = null;
		stopButton.addEventListener("click", () => {
			if (stopCurrent) {
				stopCurrent();
			}
		});

		function setRunning(running) {
			runButton.hidden = running;
			stopButton.hidden = !running;
		}

		function showOutput(title, text, isError) {
			outputLabel.hidden = false;
			output.hidden = false;
			outputLabel.textContent = title;
			output.textContent = text;
			output.classList.toggle("java-run-output--error", isError);
		}

		runButton.addEventListener("click", async () => {
			const source = editor.value;
			const inputText = inputArea.value.replace(/\r\n/g, "\n");
			const inputLines =
				inputText === "" ? [] : inputText.replace(/\n$/, "").split("\n");

			setRunning(true);
			checkBox.hidden = true;
			const started = performance.now();

			try {
				status.textContent = compilerPromise
					? "Compilation..."
					: "Chargement du compilateur (environ 7 Mo la première fois)...";
				await nextFrame();

				const compiled = await compile(source);
				if (compiled.compileError) {
					status.textContent = "";
					showOutput("Erreur de compilation", compiled.compileError, true);
					return;
				}

				status.textContent = "Exécution...";
				showOutput("Sortie", "", false);
				let text = "";
				const run = execute(compiled.bytes, inputLines, (chunk) => {
					text += chunk;
					output.textContent = text;
				});
				stopCurrent = run.stop;
				const result = await run.result;
				stopCurrent = null;

				if (result.status === "error") {
					text +=
						(text === "" || text.endsWith("\n") ? "" : "\n") +
						"Erreur à l'exécution : " +
						result.message;
				}
				output.textContent = text === "" ? "(aucune sortie)" : text;
				output.classList.toggle(
					"java-run-output--error",
					result.status !== "done",
				);

				status.textContent =
					ENDINGS[result.status] ||
					"Terminé en " + seconds(performance.now() - started) + ".";

				if (
					expected !== null &&
					(result.status === "done" || result.status === "error")
				) {
					const check = compare(expected, text);
					renderCheck(checkBox, check);
					if (check.ok) {
						celebrate(checkBox);
					}
				}
			} catch (error) {
				status.textContent =
					"Échec : " + (error && error.message ? error.message : error);
				console.error(error);
			} finally {
				stopCurrent = null;
				setRunning(false);
			}
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
