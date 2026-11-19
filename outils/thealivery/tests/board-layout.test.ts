import { describe, expect, it } from "vitest";
import {
	CELL,
	MARGIN,
	TILE,
	cellCenter,
	gridRows,
	layoutStreet,
	obstacleChooser,
	widestCells,
} from "../src/adaptateurs/board-layout.ts";

describe("layoutStreet", () => {
	it("donne à chaque case 3 x 3 tuiles, avec une case de marge", () => {
		const layout = layoutStreet("s01", "T> . . M");
		expect(layout.width).toBe((2 * 4 - 1 + 2 * MARGIN) * CELL * TILE);
		expect(layout.height).toBe((1 + 2 * MARGIN) * CELL * TILE);
	});

	it("élargit une rue à la largeur commune du niveau", () => {
		const grids = ["T> . . M", "T> . . . . M"];
		expect(widestCells(grids)).toBe(13);
		expect(layoutStreet("s07", grids[0] ?? "", widestCells(grids)).width).toBe(
			13 * CELL * TILE,
		);
	});

	it("rend la même mise en page pour le même niveau, quels que soient les espaces", () => {
		expect(layoutStreet("s01", "T>  .  M")).toEqual(
			layoutStreet("s01", "T> . M"),
		);
	});

	it("change de décor avec l'identifiant du niveau", () => {
		expect(layoutStreet("a", "T> . M").background).not.toEqual(
			layoutStreet("b", "T> . M").background,
		);
	});

	it("dessine une maison sur chaque M et un obstacle sur chaque ~", () => {
		const layout = layoutStreet("s03", "T> ~ M");
		const objects = layout.background.filter(
			(op) =>
				op.sprite.startsWith("house-") ||
				op.sprite === "pond" ||
				op.sprite === "hole",
		);
		expect(objects).toHaveLength(2);
		expect(layout.obstacles.size).toBe(1);
	});

	it("tire les obstacles comme le domaine les voit", () => {
		const grid = "T> ~ ~\n~ . ~";
		const layout = layoutStreet("s03", grid);
		const choose = obstacleChooser("s03", grid);
		for (const [key, kind] of layout.obstacles) {
			const [row = 0, col = 0] = key.split(",").map(Number);
			expect(choose({ row, col })).toBe(kind);
		}
		expect(choose({ row: 1, col: 1 })).toBe("pond");
	});
});

describe("outils de la grille", () => {
	it("lit les cases en ignorant les lignes vides", () => {
		expect(gridRows("\n T>  . \n\n M f \n")).toEqual([
			["T>", "."],
			["M", "f"],
		]);
	});

	it("place le centre d'une intersection en pixels", () => {
		expect(cellCenter({ row: 0, col: 0 })).toEqual({ x: 72, y: 72 });
		expect(cellCenter({ row: 1, col: 2 })).toEqual({ x: 264, y: 168 });
	});
});
