// Point d'entrée du paquet CodeMirror utilisé par `docs/javascripts/java-runner.js`.
//
// On n'exporte que ce dont l'éditeur a besoin : esbuild regroupe ces modules
// en un seul fichier, `docs/vendor/codemirror/codemirror.js`. Un seul fichier
// garantit une seule copie de `@codemirror/state`, ce que des imports séparés
// depuis un CDN ne garantissent pas.

export { EditorState } from "@codemirror/state";
export {
	EditorView,
	keymap,
	lineNumbers,
	highlightActiveLine,
	highlightActiveLineGutter,
	drawSelection,
} from "@codemirror/view";
export {
	defaultKeymap,
	history,
	historyKeymap,
	indentWithTab,
} from "@codemirror/commands";
export {
	syntaxHighlighting,
	indentOnInput,
	indentUnit,
	bracketMatching,
} from "@codemirror/language";
export { closeBrackets, closeBracketsKeymap } from "@codemirror/autocomplete";
export { java } from "@codemirror/lang-java";
// Classes CSS standard (`tok-keyword`, `tok-string`...), colorées dans
// `docs/stylesheets/java-runner.css` avec les couleurs du site
export { classHighlighter } from "@lezer/highlight";
