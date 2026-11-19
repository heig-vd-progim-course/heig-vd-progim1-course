// Lecture d'un niveau dans sa source Markdown, telle que l'enseignant l'écrit.
// Toutes les listes sont lues, routines comprises. Sert au bac à sable, et plus
// tard à vérifier tous les niveaux du site sans navigateur. Le format est
// celui de conception/jeu/05-architecture.md.

import type { RawLevel } from "../domaine/validation.ts";

const OPEN = /<div\s+[^>]*class="thealivery"[^>]*>/u;
const DATA_ID = /data-id="([^"]*)"/u;
const FENCE = /^(`{3,}|~{3,})\s*(\w*)\s*$/u;
const ITEM = /^\s*(?:\d+[.)]|[-*+])\s+(.*)$/u;

/**
 * Lit le premier niveau d'un texte Markdown. Sans balise div.thealivery, tout
 * le texte est lu comme un niveau, avec l'identifiant donné.
 */
export function readMarkdownLevel(
	source: string,
	fallbackId: string,
): RawLevel {
	let body = source;
	let id: string | null = fallbackId;
	const open = OPEN.exec(source);
	if (open !== null) {
		id = DATA_ID.exec(open[0])?.[1] ?? null;
		const start = open.index + open[0].length;
		const end = source.indexOf("</div>", start);
		body = source.slice(start, end < 0 ? undefined : end);
	}

	const grids: string[] = [];
	const cards: string[] = [];
	const paragraph: string[] = [];
	const paragraphs: string[] = [];
	let fence: { marker: string; lines: string[] } | null = null;

	const endParagraph = (): void => {
		if (paragraph.length > 0) {
			paragraphs.push(paragraph.join(" "));
		}
		paragraph.length = 0;
	};

	for (const line of body.split("\n")) {
		if (fence !== null) {
			if (line.trim().startsWith(fence.marker)) {
				grids.push(fence.lines.join("\n"));
				fence = null;
			} else {
				fence.lines.push(line);
			}
			continue;
		}
		const opening = FENCE.exec(line.trim());
		const item = ITEM.exec(line);
		if (opening !== null) {
			endParagraph();
			fence = { marker: opening[1] ?? "```", lines: [] };
		} else if (item !== null) {
			endParagraph();
			cards.push(item[1] ?? "");
		} else if (line.trim() === "") {
			endParagraph();
		} else {
			paragraph.push(line.trim());
		}
	}
	endParagraph();

	return { id, instruction: paragraphs[0] ?? "", grids, cards };
}
