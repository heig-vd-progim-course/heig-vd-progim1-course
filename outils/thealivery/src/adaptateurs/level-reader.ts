// Lecture d'un niveau dans le HTML produit par Zensical : le bloc
// div.thealivery, son premier paragraphe, ses blocs de code et ses listes. Les
// listes qui suivent la première sont les routines : leurs cartes sont mises
// bout à bout, et chaque en-tête « routine nom » marque le début d'une routine.

import type { RawLevel } from "../domaine/validation.ts";

export function readLevel(element: HTMLElement): RawLevel {
	const children = [...element.children];
	const paragraph = children.find((child) => child.tagName === "P");
	const lists = children.filter(
		(child) => child.tagName === "OL" || child.tagName === "UL",
	);
	return {
		id: element.dataset.id ?? null,
		instruction: paragraph?.textContent ?? "",
		grids: [...element.querySelectorAll("pre")].map(
			(pre) => (pre.querySelector("code") ?? pre).textContent,
		),
		cards: lists.flatMap((list) =>
			[...list.children].map((li) => li.textContent),
		),
	};
}
