// Point d'entrée de docs/javascripts/thealivery-sandbox.js : le bac à sable.
// Un éditeur CodeMirror pour écrire un niveau en Markdown, et le jeu qui se
// met à jour à chaque modification. Chargé par thealivery.js, seulement sur
// la page qui contient un div.thealivery-sandbox.

import {
	defaultKeymap,
	history,
	historyKeymap,
	indentWithTab,
} from "@codemirror/commands";
import { markdown } from "@codemirror/lang-markdown";
import { syntaxHighlighting } from "@codemirror/language";
import { EditorState } from "@codemirror/state";
import {
	EditorView,
	drawSelection,
	highlightActiveLine,
	keymap,
	lineNumbers,
} from "@codemirror/view";
import { classHighlighter } from "@lezer/highlight";
import { readMarkdownLevel } from "./adaptateurs/markdown-reader.ts";
import { mountLevel, type Mounted } from "./adaptateurs/mount.ts";
import { EXAMPLE } from "./sandbox-example.ts";

const DRAFT = "thealivery:bac-a-sable";

function loadDraft(): string {
	try {
		return localStorage.getItem(DRAFT) ?? EXAMPLE;
	} catch {
		return EXAMPLE;
	}
}

function saveDraft(text: string): void {
	try {
		localStorage.setItem(DRAFT, text);
	} catch {
		// Pas de stockage : le brouillon n'est pas gardé
	}
}

function setup(root: HTMLElement): void {
	if (root.dataset.ready !== undefined) {
		return;
	}
	root.dataset.ready = "";

	const editorBox = document.createElement("div");
	editorBox.className = "tl-sandbox-editor";
	const tools = document.createElement("div");
	tools.className = "tl-sandbox-tools";
	const restore = document.createElement("button");
	restore.type = "button";
	restore.className = "tl-chip";
	restore.textContent = "Revenir à l'exemple";
	tools.append(restore);
	const preview = document.createElement("div");
	preview.className = "tl-preview";
	root.replaceChildren(tools, editorBox, preview);

	let mounted: Mounted | null = null;
	let timer = 0;
	let version = 0;
	const refresh = (text: string): void => {
		saveDraft(text);
		const current = (version += 1);
		const raw = readMarkdownLevel(text, "bac-a-sable");
		mounted?.destroy();
		mounted = null;
		mountLevel(preview, raw)
			.then((game) => {
				if (current === version) {
					mounted = game;
				} else {
					game.destroy();
				}
			})
			.catch((error: unknown) => {
				console.error("Thealivery, bac à sable :", error);
			});
	};

	const view = new EditorView({
		parent: editorBox,
		state: EditorState.create({
			doc: loadDraft(),
			extensions: [
				lineNumbers(),
				history(),
				drawSelection(),
				highlightActiveLine(),
				keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
				markdown(),
				syntaxHighlighting(classHighlighter),
				EditorView.lineWrapping,
				EditorView.contentAttributes.of({ "aria-label": "Niveau en Markdown" }),
				EditorView.updateListener.of((update) => {
					if (update.docChanged) {
						clearTimeout(timer);
						timer = window.setTimeout(() => {
							refresh(update.state.doc.toString());
						}, 500);
					}
				}),
			],
		}),
	});
	restore.addEventListener("click", () => {
		view.dispatch({
			changes: { from: 0, to: view.state.doc.length, insert: EXAMPLE },
		});
	});
	refresh(view.state.doc.toString());
}

function setupAll(): void {
	document.querySelectorAll<HTMLElement>(".thealivery-sandbox").forEach(setup);
}

declare global {
	interface Window {
		TheaSandbox?: { setupAll: () => void };
	}
}

window.TheaSandbox = { setupAll };
if (window.document$ !== undefined) {
	window.document$.subscribe(setupAll);
} else {
	setupAll();
}
