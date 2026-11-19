// La mise en page d'une rue : quelles tuiles dessiner, et où. Ce module ne
// dessine rien, il calcule une liste d'ordres de dessin ; la vue du plateau les
// exécute sur un canevas. Les règles sont celles de
// conception/jeu/niveaux/generer.py, tirage au hasard compris.

import type { ObstacleKind, Position } from "../domaine/street.ts";
import { seededRandom } from "./random.ts";

/** Taille d'une tuile, tuiles par case, cases de marge autour de la grille. */
export const TILE = 16;
export const CELL = 3;
export const MARGIN = 1;

export interface DrawOp {
	readonly sprite: string;
	/** En pixels, coin haut-gauche. */
	readonly x: number;
	readonly y: number;
}

export interface StreetLayout {
	readonly width: number;
	readonly height: number;
	/** Le décor fixe : sol, routes, décor, maisons, obstacles. */
	readonly background: readonly DrawOp[];
	readonly obstacles: ReadonlyMap<string, ObstacleKind>;
}

/** Les sprites de l'atlas et leur taille, en tuiles. */
const DECOR: readonly { name: string; w: number; h: number }[] = [
	{ name: "decor-0", w: 2, h: 2 },
	{ name: "decor-1", w: 2, h: 2 },
	{ name: "decor-2", w: 2, h: 2 },
	{ name: "decor-3", w: 2, h: 2 },
	{ name: "decor-4", w: 1, h: 1 },
	{ name: "decor-5", w: 1, h: 1 },
	{ name: "decor-6", w: 1, h: 1 },
	{ name: "decor-7", w: 1, h: 1 },
	{ name: "decor-8", w: 1, h: 1 },
];
const GRASS_DETAILS = [0, 1, 2, 3].map((i) => `grass-detail-${String(i)}`);
const HOUSES = ["house-0", "house-1", "house-2"];
const OBSTACLES: readonly ObstacleKind[] = ["pond", "hole"];
/**
 * Les maisons sont remontées de deux tuiles : elles bordent la rue, leur porte
 * ouvre sur l'intersection, où une dalle marque l'endroit où livrer.
 */
export const HOUSE_SHIFT = 2;

/** Tuile de route selon que ses voisines (haut, droite, bas, gauche) sont en terre. */
const PATH: Readonly<Record<string, string>> = {
	"1111": "12,8",
	"0111": "12,7",
	"1101": "12,9",
	"1011": "13,8",
	"1110": "11,8",
	"0110": "11,7",
	"0011": "13,7",
	"1100": "11,9",
	"1001": "13,9",
	"1010": "14,8",
	"0101": "12,10",
	"0010": "14,7",
	"1000": "14,9",
	"0100": "11,10",
	"0001": "13,10",
	"0000": "14,10",
};
/** Coin d'herbe dans la terre, et la diagonale qui le révèle. */
const INNER: readonly { tile: string; dy: number; dx: number }[] = [
	{ tile: "16,8", dy: 1, dx: 1 },
	{ tile: "17,8", dy: 1, dx: -1 },
	{ tile: "16,9", dy: -1, dx: 1 },
	{ tile: "17,9", dy: -1, dx: -1 },
];

/** Les cases d'une grille, espaces normalisés. */
export function gridRows(text: string): string[][] {
	return text
		.split("\n")
		.map((line) => line.trim())
		.filter((line) => line !== "")
		.map((line) => line.split(/\s+/));
}

function seedOf(levelId: string, rows: readonly (readonly string[])[]): string {
	return `${levelId}\n${rows.map((row) => row.join(" ")).join("\n")}`;
}

const key = (r: number, c: number): string => `${String(r)},${String(c)}`;

function drawObjects(levelId: string, rows: readonly (readonly string[])[]) {
	const rnd = seededRandom(`${seedOf(levelId, rows)}:objets`);
	const obstacles = new Map<string, ObstacleKind>();
	const houses = new Map<string, string>();
	rows.forEach((row, r) => {
		row.forEach((symbol, c) => {
			if (symbol === "~") {
				obstacles.set(key(r, c), rnd.choice(OBSTACLES));
			}
		});
	});
	rows.forEach((row, r) => {
		row.forEach((symbol, c) => {
			if (/^M[1-9]?$/u.test(symbol)) {
				houses.set(key(r, c), rnd.choice(HOUSES));
			}
		});
	});
	return { obstacles, houses };
}

/** La sorte de chaque obstacle, telle que le plateau la dessine. */
export function obstacleChooser(levelId: string, gridText: string) {
	const { obstacles } = drawObjects(levelId, gridRows(gridText));
	return (position: Position): ObstacleKind =>
		obstacles.get(key(position.row, position.col)) ?? "pond";
}

/** La largeur commune des rues d'un niveau, en cases. */
export function widestCells(grids: readonly string[]): number {
	return Math.max(
		...grids.map((g) => 2 * (gridRows(g)[0]?.length ?? 0) - 1 + 2 * MARGIN),
	);
}

/** Le centre d'une intersection, en pixels. */
export function cellCenter(position: Position): { x: number; y: number } {
	const size = CELL * TILE;
	return {
		x: (2 * position.col + MARGIN) * size + size / 2,
		y: (2 * position.row + MARGIN) * size + size / 2,
	};
}

export function layoutStreet(
	levelId: string,
	gridText: string,
	minCellsW = 0,
): StreetLayout {
	const rows = gridRows(gridText);
	const R = rows.length;
	const C = rows[0]?.length ?? 0;
	// Deux tirages séparés : changer le décor ne déplace pas les objets
	const rnd = seededRandom(seedOf(levelId, rows));
	const { obstacles, houses } = drawObjects(levelId, rows);

	const cellsW = Math.max(2 * C - 1 + 2 * MARGIN, minCellsW);
	const cellsH = 2 * R - 1 + 2 * MARGIN;
	const W = cellsW * CELL;
	const H = cellsH * CELL;

	// Masque de terre, en tuiles. Une intersection qui porte un obstacle reste
	// en herbe ; une rue entre deux obstacles ne mène nulle part.
	const dirt = Array.from({ length: H }, () =>
		new Array<boolean>(W).fill(false),
	);
	for (let gr = 0; gr < 2 * R - 1; gr += 1) {
		for (let gc = 0; gc < 2 * C - 1; gc += 1) {
			if (gr % 2 === 1 && gc % 2 === 1) {
				continue;
			}
			if (gr % 2 === 0 && gc % 2 === 0 && obstacles.has(key(gr / 2, gc / 2))) {
				continue;
			}
			if (gr % 2 !== gc % 2) {
				const ends =
					gr % 2 === 0
						? [key(gr / 2, (gc - 1) / 2), key(gr / 2, (gc + 1) / 2)]
						: [key((gr - 1) / 2, gc / 2), key((gr + 1) / 2, gc / 2)];
				if (ends.every((e) => obstacles.has(e))) {
					continue;
				}
			}
			for (let ty = 0; ty < CELL; ty += 1) {
				for (let tx = 0; tx < CELL; tx += 1) {
					const line = dirt[(gr + MARGIN) * CELL + ty];
					if (line !== undefined) {
						line[(gc + MARGIN) * CELL + tx] = true;
					}
				}
			}
		}
	}
	const at = (y: number, x: number): boolean => dirt[y]?.[x] ?? false;
	const bit = (b: boolean): string => (b ? "1" : "0");

	const ops: DrawOp[] = [];
	const put = (sprite: string, tx: number, ty: number): void => {
		ops.push({ sprite, x: tx * TILE, y: ty * TILE });
	};

	// Sol : herbe, quelques détails, puis la terre avec ses bords
	for (let y = 0; y < H; y += 1) {
		for (let x = 0; x < W; x += 1) {
			put("grass", x, y);
			if (!at(y, x) && rnd.random() < 0.12) {
				put(rnd.choice(GRASS_DETAILS), x, y);
			}
		}
	}
	for (let y = 0; y < H; y += 1) {
		for (let x = 0; x < W; x += 1) {
			if (!at(y, x)) {
				continue;
			}
			const k =
				bit(at(y - 1, x)) +
				bit(at(y, x + 1)) +
				bit(at(y + 1, x)) +
				bit(at(y, x - 1));
			let tile = PATH[k] ?? "14,10";
			if (k === "1111") {
				for (const corner of INNER) {
					if (!at(y + corner.dy, x + corner.dx)) {
						tile = corner.tile;
					}
				}
			}
			put(`floor:${tile}`, x, y);
		}
	}

	// Décor dans les pâtés et dans la marge, jamais sur la terre ni sous un obstacle
	const taken = new Set<string>();
	for (const position of obstacles.keys()) {
		const [r = 0, c = 0] = position.split(",").map(Number);
		const x0 = (2 * c + MARGIN) * CELL;
		const y0 = (2 * r + MARGIN) * CELL;
		for (let i = 0; i < CELL; i += 1) {
			for (let j = 0; j < CELL; j += 1) {
				taken.add(key(x0 + i, y0 + j));
			}
		}
	}
	// Et la place au-dessus des maisons, qui débordent de leur case
	for (const position of houses.keys()) {
		const [r = 0, c = 0] = position.split(",").map(Number);
		const x0 = (2 * c + MARGIN) * CELL;
		const y0 = (2 * r + MARGIN) * CELL - HOUSE_SHIFT;
		for (let i = 0; i < CELL; i += 1) {
			for (let j = 0; j < HOUSE_SHIFT; j += 1) {
				taken.add(key(x0 + i, y0 + j));
			}
		}
	}
	for (let n = 0; n < Math.floor((W * H) / 6); n += 1) {
		const d = rnd.choice(DECOR);
		const x = rnd.randrange(0, W - d.w + 1);
		const y = rnd.randrange(0, H - d.h + 1);
		const spots: string[] = [];
		let free = true;
		for (let j = 0; j < d.h; j += 1) {
			for (let i = 0; i < d.w; i += 1) {
				spots.push(key(x + i, y + j));
				if (at(y + j, x + i)) {
					free = false;
				}
			}
		}
		if (free && !spots.some((s) => taken.has(s))) {
			put(d.name, x, y);
			spots.forEach((s) => taken.add(s));
		}
	}

	// Maisons, avec leur dalle, et obstacles sur les intersections
	rows.forEach((row, r) => {
		row.forEach((_symbol, c) => {
			const tx = (2 * c + MARGIN) * CELL;
			const ty = (2 * r + MARGIN) * CELL;
			const house = houses.get(key(r, c));
			const obstacle = obstacles.get(key(r, c));
			if (house !== undefined) {
				put(house, tx, ty - HOUSE_SHIFT);
				put("doorstep", tx + 1, ty + 1);
			} else if (obstacle !== undefined) {
				put(obstacle, tx, ty);
			}
		});
	});

	return { width: W * TILE, height: H * TILE, background: ops, obstacles };
}
