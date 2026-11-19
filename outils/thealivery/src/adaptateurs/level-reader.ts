// Lecture d'un niveau dans le HTML produit par Zensical : le bloc
// div.thealivery, son premier paragraphe, ses blocs de code et sa liste.

import type { RawLevel } from "../domaine/validation.ts";

export function readLevel(element: HTMLElement): RawLevel {
	const children = [...element.children];
	const paragraph = children.find((child) => child.tagName === "P");
	const list = children.find(
		(child) => child.tagName === "OL" || child.tagName === "UL",
	);
	return {
		id: element.dataset.id ?? null,
		instruction: paragraph?.textContent ?? "",
		grids: [...element.querySelectorAll("pre")].map(
			(pre) => (pre.querySelector("code") ?? pre).textContent,
		),
		cards:
			list === undefined ? [] : [...list.children].map((li) => li.textContent),
	};
}
