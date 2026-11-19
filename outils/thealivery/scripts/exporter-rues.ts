// Exporte la mise en page des six rues de référence, pour que
// atlas/comparer-rendu.py la compare au rendu de generer.py.
import { layoutStreet, widestCells } from "../src/adaptateurs/board-layout.ts";

const LEVELS: [string, string[]][] = [
	["01-premiere-livraison", ["T> . . M"]],
	["02-coin-de-la-rue", ["T> . .\n. . .\n. . M"]],
	["03-attention-aux-flaques", ["T> . . .\n~ ~ . ~\n. . . M"]],
	["04-deux-maisons", ["T> . M\n~ ~ .\nM . ."]],
	["05-les-feuilles", ["Tv ~ M\n. ~ .\nf . ."]],
	["06-la-rue-qui-s-allonge", ["T> . . M", "T> . . . . M"]],
];

const out = LEVELS.flatMap(([id, grids]) =>
	grids.map((grid) => ({
		id,
		grid,
		layout: layoutStreet(id, grid, widestCells(grids)),
	})),
);
console.log(
	JSON.stringify(
		out.map(({ id, grid, layout }) => ({
			id,
			grid,
			width: layout.width,
			height: layout.height,
			background: layout.background,
			obstacles: Object.fromEntries(layout.obstacles),
		})),
	),
);
