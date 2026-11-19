import { describe, expect, it } from "vitest";
import { hasTraps, solutionOf } from "../src/domaine/level.ts";
import { validateLevel, type RawLevel } from "../src/domaine/validation.ts";
import { LEVELS } from "./helpers.ts";

const FIRST: RawLevel = {
	id: "s01-premiere-livraison",
	instruction: "  Livrez le thé à la maison.  ",
	grids: ["T> . . M"],
	cards: ["avancer", "avancer", "avancer", "livrer"],
};

function errorsOf(raw: RawLevel, usedIds?: ReadonlySet<string>) {
	const result = validateLevel(raw, usedIds === undefined ? {} : { usedIds });
	if (result.ok) {
		throw new Error("Le niveau devait être invalide");
	}
	return result.errors;
}

describe("validateLevel, les niveaux valides", () => {
	it.each(LEVELS.map((raw) => [raw.id, raw] as const))(
		"%s est valide",
		(_id, raw) => {
			expect(validateLevel({ ...raw, instruction: "" }).ok).toBe(true);
		},
	);

	it("rend le niveau, sa consigne sans espaces superflus et ses cartes", () => {
		const result = validateLevel(FIRST);
		expect(result.ok && result.level.instruction).toBe(
			"Livrez le thé à la maison.",
		);
		expect(result.ok && result.level.cards.map((c) => c.type)).toEqual([
			"move",
			"move",
			"move",
			"deliver",
		]);
	});

	it("sépare la solution des pièges", () => {
		const raw = LEVELS[3];
		const result = validateLevel({ ...raw, instruction: "" });
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(hasTraps(result.level)).toBe(true);
			expect(solutionOf(result.level)).toHaveLength(10);
		}
	});

	it("passe à chaque rue la sorte de ses obstacles", () => {
		const calls: number[] = [];
		const result = validateLevel(
			{ ...FIRST, grids: ["T> . . M", "T> . . M\n~ . . ."] },
			{
				chooseObstacle: (streetIndex) => {
					calls.push(streetIndex);
					return "hole";
				},
			},
		);
		expect(calls).toEqual([1]);
		expect(result.ok && result.level.streets[1]?.cells[1]?.[0]).toBe("hole");
	});
});

describe("validateLevel, les erreurs de l'enseignant", () => {
	it("exige un data-id", () => {
		expect(errorsOf({ ...FIRST, id: null })).toEqual([{ code: "MISSING_ID" }]);
		expect(errorsOf({ ...FIRST, id: "  " })).toEqual([{ code: "MISSING_ID" }]);
	});

	it("refuse un data-id déjà utilisé sur la page", () => {
		expect(errorsOf(FIRST, new Set([FIRST.id ?? ""]))).toEqual([
			{ code: "DUPLICATE_ID", id: "s01-premiere-livraison" },
		]);
	});

	it("exige une grille", () => {
		expect(errorsOf({ ...FIRST, grids: [] })).toEqual([{ code: "NO_GRID" }]);
	});

	it("dit dans quelle rue est l'erreur de grille", () => {
		expect(errorsOf({ ...FIRST, grids: ["T> . . M", ". . M"] })).toEqual([
			{ code: "THEA_COUNT", found: 0, street: 1 },
		]);
	});

	it("exige des cartes", () => {
		expect(errorsOf({ ...FIRST, cards: [] })).toEqual([{ code: "NO_CARDS" }]);
	});

	it("dit quelle carte est fautive", () => {
		expect(errorsOf({ ...FIRST, cards: ["avancer", "sauter"] })).toEqual([
			{ code: "UNKNOWN_CARD", word: "sauter", card: 1 },
		]);
	});

	it("refuse une étiquette en double", () => {
		expect(
			errorsOf({
				...FIRST,
				cards: ["avancer {#a}", "avancer {#a}", "avancer", "livrer"],
			}),
		).toEqual([{ code: "DUPLICATE_LABEL", label: "a" }]);
	});

	it("refuse un saut vers une étiquette inconnue", () => {
		expect(errorsOf({ ...FIRST, cards: ["avancer", "aller -> fin"] })).toEqual([
			{ code: "UNKNOWN_LABEL", label: "fin" },
		]);
	});

	it("rend toutes les erreurs de forme à la fois", () => {
		expect(
			errorsOf({
				id: null,
				instruction: "",
				grids: [". x"],
				cards: ["sauter"],
			}),
		).toEqual([
			{ code: "MISSING_ID" },
			{ code: "UNKNOWN_SYMBOL", symbol: "x", line: 1, street: 0 },
			{ code: "THEA_COUNT", found: 0, street: 0 },
			{ code: "UNKNOWN_CARD", word: "sauter", card: 0 },
		]);
	});
});

describe("validateLevel, la solution de l'enseignant", () => {
	it("signale la carte où la solution échoue, pièges compris dans la numérotation", () => {
		expect(
			errorsOf({
				...FIRST,
				grids: ["T> ~ M"],
				cards: ["piège : ramasser", "avancer", "livrer"],
			}),
		).toEqual([
			{
				code: "SOLUTION_FAILS",
				street: 0,
				card: 1,
				outcome: { kind: "failure", reason: "FELL_IN_POND", cardIndex: 0 },
			},
		]);
	});

	it("signale la rue où la solution échoue", () => {
		expect(errorsOf({ ...FIRST, grids: ["T> . . M", "T> . . . M"] })).toEqual([
			{
				code: "SOLUTION_FAILS",
				street: 1,
				card: 3,
				outcome: { kind: "failure", reason: "NOBODY_HERE", cardIndex: 3 },
			},
		]);
	});

	it("n'a pas de carte fautive quand l'objectif n'est pas atteint", () => {
		expect(errorsOf({ ...FIRST, cards: ["avancer"] })).toEqual([
			{
				code: "SOLUTION_FAILS",
				street: 0,
				card: null,
				outcome: {
					kind: "failure",
					reason: "ROUND_NOT_FINISHED",
					houses: 1,
					leaves: 0,
				},
			},
		]);
	});

	it("signale une solution qui tourne en rond", () => {
		expect(
			errorsOf({ ...FIRST, cards: ["tourner-droite {#a}", "aller -> a"] }),
		).toMatchObject([
			{ code: "SOLUTION_FAILS", card: 0, outcome: { reason: "LOOPS_FOREVER" } },
		]);
	});
});
