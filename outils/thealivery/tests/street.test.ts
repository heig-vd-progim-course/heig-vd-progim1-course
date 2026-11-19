import { describe, expect, it } from "vitest";
import {
	ahead,
	cellAt,
	count,
	isInside,
	parseStreet,
	turnLeft,
	turnRight,
} from "../src/domaine/street.ts";
import { street } from "./helpers.ts";

describe("parseStreet", () => {
	it("lit Théa, sa direction et chaque sorte de case", () => {
		const s = street("T> . M\n~ f .");
		expect(s.rows).toBe(2);
		expect(s.cols).toBe(3);
		expect(s.start).toEqual({
			position: { row: 0, col: 0 },
			direction: "east",
		});
		expect(s.cells).toEqual([
			["free", "free", "house"],
			["pond", "leaves", "free"],
		]);
	});

	it.each([
		["T^", "north"],
		["T>", "east"],
		["Tv", "south"],
		["T<", "west"],
	] as const)("lit %s comme la direction %s", (symbol, direction) => {
		expect(street(`. ${symbol}`).start.direction).toBe(direction);
	});

	it("ignore les lignes vides et les espaces en trop", () => {
		const s = street("\n  T>   .  M  \n\n");
		expect(s.rows).toBe(1);
		expect(s.cols).toBe(3);
	});

	it("demande au rendu la sorte de chaque obstacle", () => {
		const s = street("T> ~ ~", ({ col }) => (col === 1 ? "hole" : "pond"));
		expect(s.cells[0]).toEqual(["free", "hole", "pond"]);
	});

	it("refuse une grille vide", () => {
		expect(parseStreet(" \n ")).toEqual({
			ok: false,
			errors: [{ code: "EMPTY_GRID" }],
		});
	});

	it("refuse une grille sans Théa", () => {
		expect(parseStreet(". . M")).toEqual({
			ok: false,
			errors: [{ code: "THEA_COUNT", found: 0 }],
		});
	});

	it("refuse une grille avec deux Théa", () => {
		expect(parseStreet("T> . T<")).toEqual({
			ok: false,
			errors: [{ code: "THEA_COUNT", found: 2 }],
		});
	});

	it("signale une ligne trop courte, avec son numéro", () => {
		expect(parseStreet("T> . . .\n. . .")).toEqual({
			ok: false,
			errors: [{ code: "ROW_LENGTH", line: 2, found: 3, expected: 4 }],
		});
	});

	it("signale un symbole inconnu, avec sa ligne", () => {
		expect(parseStreet("T> . x")).toEqual({
			ok: false,
			errors: [{ code: "UNKNOWN_SYMBOL", symbol: "x", line: 1 }],
		});
	});

	it("rend toutes les erreurs à la fois", () => {
		const parsed = parseStreet(". x\n. . .");
		expect(parsed.ok).toBe(false);
		expect(!parsed.ok && parsed.errors.map((e) => e.code)).toEqual([
			"UNKNOWN_SYMBOL",
			"ROW_LENGTH",
			"THEA_COUNT",
		]);
	});
});

describe("directions et positions", () => {
	it("tourne à droite dans le sens des aiguilles d'une montre", () => {
		expect(turnRight("north")).toBe("east");
		expect(turnRight("west")).toBe("north");
	});

	it("tourne à gauche dans l'autre sens", () => {
		expect(turnLeft("north")).toBe("west");
		expect(turnLeft("east")).toBe("north");
	});

	it("donne l'intersection suivante dans chaque direction", () => {
		const here = { row: 1, col: 1 };
		expect(ahead(here, "north")).toEqual({ row: 0, col: 1 });
		expect(ahead(here, "east")).toEqual({ row: 1, col: 2 });
		expect(ahead(here, "south")).toEqual({ row: 2, col: 1 });
		expect(ahead(here, "west")).toEqual({ row: 1, col: 0 });
	});

	it("sait si une position est dans le quartier", () => {
		const s = street("T> .\n. .");
		expect(isInside(s, { row: 1, col: 1 })).toBe(true);
		expect(isInside(s, { row: -1, col: 0 })).toBe(false);
		expect(isInside(s, { row: 0, col: -1 })).toBe(false);
		expect(isInside(s, { row: 2, col: 0 })).toBe(false);
		expect(isInside(s, { row: 0, col: 2 })).toBe(false);
	});

	it("lit une case, et voit hors du quartier une case libre", () => {
		const s = street("T> M");
		expect(cellAt(s.cells, { row: 0, col: 1 })).toBe("house");
		expect(cellAt(s.cells, { row: 5, col: 5 })).toBe("free");
	});

	it("compte les cases d'une sorte", () => {
		expect(count(street("T> M M\n. f M").cells, "house")).toBe(3);
	});
});
