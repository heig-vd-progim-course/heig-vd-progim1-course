import { describe, expect, it } from "vitest";
import { MAX_STEPS, run, runLevel } from "../src/domaine/engine.ts";
import { solutionOf, type LevelSpec } from "../src/domaine/level.ts";
import { validateLevel } from "../src/domaine/validation.ts";
import { LEVELS, program, street } from "./helpers.ts";

function level(index: number): LevelSpec {
	const raw = LEVELS[index];
	if (raw === undefined) {
		throw new Error(`Pas de niveau ${String(index)}`);
	}
	const result = validateLevel({ ...raw, instruction: "" });
	if (!result.ok) {
		throw new Error(JSON.stringify(result.errors));
	}
	return result.level;
}

describe("run, les cartes une à une", () => {
	it("avance, livre et réussit la première livraison", () => {
		const trace = run(
			street("T> . . M"),
			program("avancer", "avancer", "avancer", "livrer"),
		);
		expect(trace.outcome).toEqual({ kind: "success" });
		expect(trace.steps.map((s) => s.event)).toEqual([
			"move",
			"move",
			"move",
			"deliver",
		]);
		expect(trace.steps.at(-1)?.thea.position).toEqual({ row: 0, col: 3 });
		expect(trace.steps.at(-1)?.cells[0]?.[3]).toBe("delivered");
	});

	it("US-03 : chaque étape désigne une seule carte, dans l'ordre", () => {
		const trace = run(
			street("T> . . M"),
			program("avancer", "avancer", "avancer", "livrer"),
		);
		expect(trace.steps.map((s) => s.cardIndex)).toEqual([0, 1, 2, 3]);
		expect(trace.steps.every((s) => !s.jumped)).toBe(true);
	});

	it("tourne sur place, sans avancer", () => {
		const trace = run(
			street("T> .\n. ."),
			program("tourner-droite", "tourner-gauche"),
		);
		expect(trace.steps.map((s) => s.thea)).toEqual([
			{ position: { row: 0, col: 0 }, direction: "south", cups: 0 },
			{ position: { row: 0, col: 0 }, direction: "east", cups: 0 },
		]);
	});

	it("ramasse les feuilles, qui disparaissent", () => {
		const trace = run(street("T> f"), program("avancer", "ramasser"));
		expect(trace.outcome).toEqual({ kind: "success" });
		expect(trace.steps.at(-1)?.cells).toEqual([["free", "free"]]);
	});

	it("ne modifie jamais la rue de départ", () => {
		const s = street("T> f M");
		const before = structuredClone(s);
		run(s, program("avancer", "ramasser", "avancer", "livrer"));
		expect(s).toEqual(before);
	});

	it("garde un instantané des cases à chaque étape", () => {
		const trace = run(
			street("T> f M"),
			program("avancer", "ramasser", "avancer", "livrer"),
		);
		expect(trace.steps.map((s) => s.cells[0])).toEqual([
			["free", "leaves", "house"],
			["free", "free", "house"],
			["free", "free", "house"],
			["free", "free", "delivered"],
		]);
	});

	it("US-05 : chaque exécution repart du départ et donne la même trace", () => {
		const s = street("T> . M");
		const p = program("avancer", "avancer", "livrer");
		expect(run(s, p)).toEqual(run(s, p));
		expect(run(s, p).steps[0]?.thea.position).toEqual({ row: 0, col: 1 });
	});
});

describe("run, les cartes impossibles", () => {
	it("US-04 : tombe dans une mare, s'arrête et désigne la carte fautive", () => {
		const trace = run(
			street("T> ~ M"),
			program("avancer", "avancer", "livrer"),
		);
		expect(trace.outcome).toEqual({
			kind: "failure",
			reason: "FELL_IN_POND",
			cardIndex: 0,
		});
		expect(trace.steps).toHaveLength(1);
		expect(trace.steps[0]).toMatchObject({
			event: "fall-in-pond",
			thea: { position: { row: 0, col: 1 } },
		});
	});

	it("tombe dans un trou", () => {
		const trace = run(
			street("T> ~", () => "hole"),
			program("avancer"),
		);
		expect(trace.outcome).toEqual({
			kind: "failure",
			reason: "FELL_IN_HOLE",
			cardIndex: 0,
		});
		expect(trace.steps[0]?.event).toBe("fall-in-hole");
	});

	it("reste sur place au bord du quartier", () => {
		const trace = run(street(". T>"), program("avancer"));
		expect(trace.outcome).toEqual({
			kind: "failure",
			reason: "LEFT_TOWN",
			cardIndex: 0,
		});
		expect(trace.steps[0]).toMatchObject({
			event: "bump-edge",
			thea: { position: { row: 0, col: 1 } },
		});
	});

	it("n'a rien à ramasser", () => {
		const trace = run(street("T> M"), program("ramasser"));
		expect(trace.outcome).toEqual({
			kind: "failure",
			reason: "NOTHING_TO_PICK",
			cardIndex: 0,
		});
		expect(trace.steps[0]?.event).toBe("nothing-to-pick");
	});

	it("ne livre que là où une maison attend", () => {
		const trace = run(street("T> M"), program("livrer"));
		expect(trace.outcome).toEqual({
			kind: "failure",
			reason: "NOBODY_HERE",
			cardIndex: 0,
		});
		expect(trace.steps[0]?.event).toBe("nobody-here");
	});

	it("ne livre pas deux fois la même maison", () => {
		const trace = run(street("T> M"), program("avancer", "livrer", "livrer"));
		expect(trace.outcome).toEqual({
			kind: "failure",
			reason: "NOBODY_HERE",
			cardIndex: 2,
		});
	});
});

describe("run, l'objectif", () => {
	it("compte les maisons et les feuilles qui restent", () => {
		const trace = run(street("T> M M f"), program("avancer", "livrer"));
		expect(trace.outcome).toEqual({
			kind: "failure",
			reason: "ROUND_NOT_FINISHED",
			houses: 1,
			leaves: 1,
		});
	});

	it("un programme vide ne finit pas la tournée", () => {
		expect(run(street("T> M"), []).outcome).toMatchObject({
			reason: "ROUND_NOT_FINISHED",
		});
	});

	it("une rue sans maison ni feuilles est réussie dès qu'aucune carte n'échoue", () => {
		expect(run(street("T> ."), program("avancer")).outcome).toEqual({
			kind: "success",
		});
	});
});

describe("run, les sauts", () => {
	const loop = program(
		"avancer {#debut}",
		"si-maison -> fin",
		"aller -> debut",
		"livrer {#fin}",
	);

	it("suit le compteur de programme à travers les sauts", () => {
		const trace = run(street("T> . . M"), loop);
		expect(trace.outcome).toEqual({ kind: "success" });
		expect(trace.steps.map((s) => s.cardIndex)).toEqual([
			0, 1, 2, 0, 1, 2, 0, 1, 3,
		]);
		expect(trace.steps.map((s) => s.jumped)).toEqual([
			false,
			false,
			true,
			false,
			false,
			true,
			false,
			true,
			false,
		]);
		expect(trace.steps.map((s) => s.event)).toContain("no-jump");
	});

	it("le même programme livre une rue plus longue", () => {
		expect(run(street("T> . . . . M"), loop).outcome).toEqual({
			kind: "success",
		});
	});

	it("arrête Théa quand elle tourne en rond", () => {
		const trace = run(street("T> M"), program("aller -> ici {#ici}"));
		expect(trace.outcome).toEqual({
			kind: "failure",
			reason: "LOOPS_FOREVER",
			cardIndex: 0,
		});
		expect(trace.steps).toHaveLength(MAX_STEPS);
	});

	it("échoue quand la carte visée a été mise de côté", () => {
		const trace = run(street("T> M"), program("avancer", "si-maison -> fin"));
		expect(trace.outcome).toEqual({
			kind: "failure",
			reason: "TARGET_SET_ASIDE",
			cardIndex: 1,
		});
		expect(trace.steps.at(-1)).toMatchObject({
			event: "target-missing",
			jumped: false,
		});
	});

	it("ne cherche la carte visée que si le saut a lieu", () => {
		const trace = run(
			street("T> . M"),
			program("si-maison -> fin", "avancer", "avancer", "livrer"),
		);
		expect(trace.outcome).toEqual({ kind: "success" });
	});

	it("échoue aussi sur aller sans carte visée", () => {
		expect(
			run(street("T> M"), program("aller -> nulle-part")).outcome,
		).toMatchObject({
			reason: "TARGET_SET_ASIDE",
		});
	});
});

describe("runLevel", () => {
	it.each(LEVELS.map((raw, index) => [raw.id, index] as const))(
		"la solution de %s réussit",
		(_id, index) => {
			const spec = level(index);
			const result = runLevel(spec, solutionOf(spec));
			expect(result.outcome).toEqual({ kind: "success" });
			expect(result.traces).toHaveLength(spec.streets.length);
			expect(result.streetIndex).toBe(spec.streets.length - 1);
		},
	);

	it("s'arrête à la première rue ratée", () => {
		const spec = level(5);
		const result = runLevel(
			spec,
			program("avancer", "avancer", "avancer", "livrer"),
		);
		expect(result.streetIndex).toBe(1);
		expect(result.traces).toHaveLength(2);
		expect(result.traces[0]?.outcome).toEqual({ kind: "success" });
		expect(result.outcome).toEqual({
			kind: "failure",
			reason: "NOBODY_HERE",
			cardIndex: 3,
		});
	});

	it("refuse la carte en trop d'un niveau à pièges, même si Théa réussit", () => {
		const spec = level(3);
		const withTrap = [...solutionOf(spec), ...spec.cards.filter((c) => c.trap)];
		expect(runLevel(spec, withTrap).outcome).toEqual({
			kind: "failure",
			reason: "EXTRA_CARD",
		});
	});

	it("accepte une carte de plus dans un niveau sans piège", () => {
		const spec = level(0);
		const p = [...solutionOf(spec), ...program("tourner-gauche")];
		expect(runLevel(spec, p).outcome).toEqual({ kind: "success" });
	});

	it("juge à l'exécution, pas à l'ordre de l'enseignant", () => {
		const spec: LevelSpec = {
			id: "deux-chemins",
			instruction: "",
			streets: [street("T> M\n. .")],
			cards: program("avancer", "livrer", "tourner-droite", "tourner-gauche"),
		};
		const other = program(
			"tourner-droite",
			"tourner-gauche",
			"avancer",
			"livrer",
		);
		expect(runLevel(spec, other).outcome).toEqual({ kind: "success" });
	});
});
