// Exécute un programme Java déjà compilé par TeaVM, voir `java-runner.js`.
//
// Ce script tourne dans un Web Worker : un fil d'exécution séparé de la page.
// Si le programme ne s'arrête pas (une boucle infinie), la page reste
// utilisable et peut tuer le worker avec `terminate()`. Sur la page elle-même,
// une boucle infinie gèlerait l'onglet entier.
//
// Messages reçus : { bytes, args }, le module WebAssembly et les lignes de la
// zone Entrée, passées comme arguments au lanceur.
//
// Messages envoyés :
// - { type: "output", text } : un morceau de sortie, envoyé au fil de l'eau ;
// - { type: "done" } : le programme s'est terminé normalement ;
// - { type: "need-input" } : `IO.readln` n'a plus de ligne à lire ;
// - { type: "error", message } : une exception a arrêté le programme.

import { load } from "../vendor/teavm/compiler.wasm-runtime.js";

// Doit correspondre au message lancé par la classe `IO` de `java-runner.js`
const NEED_INPUT = "__PROGIM_NEED_INPUT__";

// La sortie est envoyée par paquets, pas caractère par caractère : un message
// par caractère saturerait la page
const FLUSH_SIZE = 4096;
const FLUSH_DELAY_MS = 100;

self.onmessage = async (event) => {
	const { bytes, args } = event.data;

	let buffer = "";
	let lastFlush = Date.now();

	function flush() {
		if (buffer !== "") {
			self.postMessage({ type: "output", text: buffer });
			buffer = "";
		}
		lastFlush = Date.now();
	}

	function put(code) {
		buffer += String.fromCharCode(code);
		if (
			buffer.length >= FLUSH_SIZE ||
			(code === 10 && Date.now() - lastFlush >= FLUSH_DELAY_MS)
		) {
			flush();
		}
	}

	try {
		const program = await load(bytes, {
			installImports(imports) {
				imports.teavmConsole.putcharStdout = put;
				imports.teavmConsole.putcharStderr = put;
			},
		});
		await program.exports.main(args);
		flush();
		self.postMessage({ type: "done" });
	} catch (error) {
		flush();
		const message = error && error.message ? error.message : String(error);
		if (message.includes(NEED_INPUT)) {
			self.postMessage({ type: "need-input" });
		} else {
			self.postMessage({ type: "error", message: message });
		}
	}
};
