import { describe, expect, it } from "vitest";
import {
	levelErrorMessage,
	moodOf,
	stepSays,
	theaSays,
} from "../src/application/messages.ts";
import { GameSession } from "../src/application/session.ts";
import { parseCard } from "../src/domaine/cards.ts";
import { MAX_STEPS, run, runLevel } from "../src/domaine/engine.ts";
import { usesCups, type LevelSpec } from "../src/domaine/level.ts";
import {
	cardCount,
	cardNumbers,
	homeZones,
	zonesOf,
} from "../src/domaine/program.ts";
import { orderAt } from "../src/domaine/street.ts";
import { validateLevel, type RawLevel } from "../src/domaine/validation.ts";
import { program, street } from "./helpers.ts";

/** Les deux exemples de conception/jeu/04-conception-du-jeu.md. */
const DEMI_TOUR: RawLevel = {
	id: "s05-demi-tour",
	instruction: "Livrez les deux maisons.",
	grids: ["M  .  T> .  M"],
	cards: [
		"avancer",
		"avancer",
		"livrer",
		"appeler -> demi-tour",
		"avancer",
		"avancer",
		"avancer",
		"avancer",
		"livrer",
		"routine demi-tour",
		"tourner-gauche",
		"tourner-gauche",
	],
};

const DEUX_COMMANDES: RawLevel = {
	id: "s03-deux-commandes",
	instruction: "Remplissez la charrette, puis livrez les deux commandes.",
	grids: ["T> .  M2 .  M1"],
	cards: [
		"remplir 3",
		"avancer",
		"avancer",
		"livrer",
		"avancer",
		"avancer",
		"livrer",
		"piège : ajouter 1",
	],
};

function valid(raw: RawLevel): LevelSpec {
	const result = validateLevel(raw);
	if (!result.ok) {
		throw new Error(JSON.stringify(result.errors));
	}
	return result.level;
}

function errors(raw: RawLevel): unknown[] {
	const result = validateLevel(raw);
	return result.ok ? [] : [...result.errors];
}

describe("parseCard, les nouvelles cartes", () => {
	it("lit remplir et ajouter avec leur nombre de tasses", () => {
		expect(parseCard("remplir 3", 0)).toEqual({
			ok: true,
			card: { id: "@0", type: "fill", trap: false, amount: 3 },
		});
		expect(parseCard("piège : ajouter 1", 2)).toEqual({
			ok: true,
			card: { id: "@2", type: "add", trap: true, amount: 1 },
		});
	});

	it("lit l'en-tête d'une routine, dont le nom devient l'identifiant", () => {
		expect(parseCard("routine demi-tour", 4)).toEqual({
			ok: true,
			card: { id: "demi-tour", type: "routine", trap: false },
		});
	});

	it("lit un appel, qui vise une routine", () => {
		expect(parseCard("appeler -> demi-tour", 0)).toEqual({
			ok: true,
			card: { id: "@0", type: "call", trap: false, target: "demi-tour" },
		});
	});

	it.each([
		["remplir", { code: "MISSING_AMOUNT", word: "remplir" }],
		["avancer 2", { code: "UNEXPECTED_AMOUNT", word: "avancer" }],
		["routine", { code: "MISSING_NAME", word: "routine" }],
		["routine a -> b", { code: "UNEXPECTED_TARGET", word: "routine" }],
		["appeler", { code: "MISSING_TARGET", word: "appeler" }],
	])("refuse %s", (text, error) => {
		expect(parseCard(text, 0)).toEqual({ ok: false, error });
	});
});

describe("les zones d'un programme", () => {
	const cards = program(
		"avancer",
		"appeler -> a",
		"routine a",
		"tourner-gauche",
		"routine b",
		"livrer",
	);

	it("découpe le programme principal puis chaque routine", () => {
		expect(zonesOf(cards)).toEqual([
			{ header: null, start: 0, end: 2 },
			{ header: cards[2], start: 3, end: 4 },
			{ header: cards[4], start: 5, end: 6 },
		]);
	});

	it("donne la zone de chaque carte, en-têtes compris", () => {
		expect([...homeZones(cards).values()]).toEqual([0, 0, 1, 1, 2, 2]);
	});

	it("numérote les cartes d'une zone à l'autre, sans les en-têtes", () => {
		expect(cardNumbers(cards)).toEqual([1, 2, null, 3, null, 4]);
		expect(cardCount(cards)).toBe(4);
	});
});

describe("run, les routines", () => {
	it("appelle la routine, puis reprend juste après l'appel", () => {
		const level = valid(DEMI_TOUR);
		const trace = run(level.streets[0] ?? street("T>"), level.cards);
		expect(trace.outcome).toEqual({ kind: "success" });
		const events = trace.steps.map((s) => `${String(s.cardIndex)}:${s.event}`);
		expect(events.slice(2, 8)).toEqual([
			"2:deliver",
			"3:call",
			"10:turn-left",
			"11:turn-left",
			"9:return",
			"4:move",
		]);
		expect(trace.steps[3]?.jumped).toBe(true);
		expect(trace.steps[6]).toMatchObject({ returnTo: 4, jumped: true });
	});

	it("s'arrête au premier en-tête : une routine jamais appelée ne s'exécute pas", () => {
		const trace = run(
			street("T> M"),
			program("avancer", "livrer", "routine a", "avancer"),
		);
		expect(trace.outcome).toEqual({ kind: "success" });
		expect(trace.steps).toHaveLength(2);
	});

	it("finit la tournée quand l'appel est la dernière carte du programme", () => {
		const trace = run(
			street("T> M"),
			program("appeler -> a", "routine a", "avancer", "livrer"),
		);
		expect(trace.outcome).toEqual({ kind: "success" });
		expect(trace.steps.at(-1)).toMatchObject({ event: "return", returnTo: 1 });
	});

	it("garde une pile : une routine peut en appeler une autre", () => {
		const trace = run(
			street("T> . M"),
			program(
				"appeler -> a",
				"livrer",
				"routine a",
				"appeler -> b",
				"avancer",
				"routine b",
				"avancer",
			),
		);
		expect(trace.outcome).toEqual({ kind: "success" });
		expect(trace.steps.map((s) => s.event)).toEqual([
			"call",
			"call",
			"move",
			"return",
			"move",
			"return",
			"deliver",
		]);
	});

	it("arrête une routine qui s'appelle sans fin, sur son en-tête", () => {
		const trace = run(
			street("T> M"),
			program("appeler -> a", "routine a", "appeler -> a"),
		);
		expect(trace.steps).toHaveLength(MAX_STEPS);
		expect(trace.outcome).toEqual({
			kind: "failure",
			reason: "LOOPS_FOREVER",
			cardIndex: 1,
		});
	});
});

describe("run, les tasses", () => {
	it("remplit, livre chaque commande et compte les tasses", () => {
		const level = valid(DEUX_COMMANDES);
		const result = runLevel(
			level,
			level.cards.filter((c) => !c.trap),
		);
		expect(result.outcome).toEqual({ kind: "success" });
		const cups = result.traces[0]?.steps.map((s) => s.thea.cups);
		expect(cups).toEqual([3, 3, 3, 1, 1, 1, 0]);
	});

	it("lit la commande de chaque maison", () => {
		const s = street("T> M2 M");
		expect(s.cells[0]).toEqual(["free", "house", "house"]);
		expect(orderAt(s, { row: 0, col: 1 })).toBe(2);
		expect(orderAt(s, { row: 0, col: 2 })).toBe(0);
	});

	it("ajoute des tasses à celles qui sont déjà là", () => {
		const trace = run(street("T> M3"), program("remplir 1", "ajouter 2"));
		expect(trace.steps.map((s) => s.thea.cups)).toEqual([1, 3]);
	});

	it("échoue s'il manque des tasses pour la commande", () => {
		const trace = run(
			street("T> M2"),
			program("remplir 1", "avancer", "livrer"),
		);
		expect(trace.outcome).toEqual({
			kind: "failure",
			reason: "CART_EMPTY",
			cardIndex: 2,
		});
		expect(trace.steps.at(-1)?.event).toBe("cart-empty");
	});

	it("livre sans tasse une maison qui ne commande rien", () => {
		const trace = run(street("T> M"), program("avancer", "livrer"));
		expect(trace.outcome).toEqual({ kind: "success" });
	});

	it("reconnaît un niveau à tasses", () => {
		expect(usesCups(valid(DEUX_COMMANDES))).toBe(true);
		expect(usesCups(valid(DEMI_TOUR))).toBe(false);
	});

	it("refuse la carte piège : ajouter remet une tasse de trop", () => {
		const level = valid(DEUX_COMMANDES);
		expect(runLevel(level, level.cards).outcome).toEqual({
			kind: "failure",
			reason: "EXTRA_CARD",
		});
	});
});

describe("validateLevel, les routines", () => {
	it("accepte les deux exemples de la conception", () => {
		expect(validateLevel(DEMI_TOUR).ok).toBe(true);
		expect(validateLevel(DEUX_COMMANDES).ok).toBe(true);
	});

	it.each([
		[
			"une liste qui commence par une routine",
			["routine a", "avancer"],
			{ code: "ROUTINE_FIRST" },
		],
		[
			"une routine vide",
			["avancer", "routine a", "routine b", "avancer"],
			{ code: "EMPTY_ROUTINE", name: "a" },
		],
		[
			"une routine piège",
			["avancer", "piège : routine a", "avancer"],
			{ code: "ROUTINE_TRAP", name: "a" },
		],
		[
			"un appel qui ne vise pas une routine",
			["avancer {#x}", "appeler -> x"],
			{ code: "CALL_NOT_ROUTINE", label: "x" },
		],
		[
			"un saut vers une routine",
			["aller -> a", "routine a", "avancer"],
			{ code: "JUMP_TO_ROUTINE", label: "a" },
		],
		[
			"un saut qui sort de sa zone",
			["avancer {#x}", "routine a", "aller -> x"],
			{ code: "JUMP_OTHER_ZONE", label: "x" },
		],
	])("refuse %s", (_name, cards, error) => {
		expect(errors({ ...DEMI_TOUR, cards })).toContainEqual(error);
	});

	it("refuse un appel vers une routine qui n'existe pas", () => {
		expect(errors({ ...DEMI_TOUR, cards: ["appeler -> a"] })).toContainEqual({
			code: "UNKNOWN_LABEL",
			label: "a",
		});
	});

	it("signale une solution qui manque de tasses", () => {
		expect(
			errors({
				...DEUX_COMMANDES,
				cards: [
					"remplir 2",
					"avancer",
					"avancer",
					"livrer",
					"avancer",
					"avancer",
					"livrer",
				],
			}),
		).toEqual([expect.objectContaining({ code: "SOLUTION_FAILS", card: 6 })]);
	});
});

describe("les messages des routines et des tasses", () => {
	const level = valid(DEMI_TOUR);
	const trace = run(level.streets[0] ?? street("T>"), level.cards);

	it("annonce l'appel et la fin de la routine, avec le numéro de la carte", () => {
		expect(trace.steps[3] && stepSays(trace.steps[3], level.cards)).toBe(
			"J'appelle la routine demi-tour.",
		);
		expect(trace.steps[6] && stepSays(trace.steps[6], level.cards)).toBe(
			"Fin de la routine demi-tour : je reprends à la carte 5.",
		);
	});

	it("dit quand la routine finit la tournée", () => {
		const cards = program("appeler -> a", "routine a", "avancer", "livrer");
		const last = run(street("T> M"), cards).steps.at(-1);
		expect(last && stepSays(last, cards)).toBe(
			"Fin de la routine a : ma tournée est finie.",
		);
	});

	it("compte les tasses", () => {
		const cards = program(
			"remplir 2",
			"ajouter 1",
			"ajouter 2",
			"avancer",
			"livrer",
		);
		const steps = run(street("T> M3"), cards).steps;
		expect(steps.map((s) => stepSays(s, cards, true))).toEqual([
			"Ma charrette contient 2 tasses.",
			"Une tasse de plus : j'en ai 3.",
			"2 tasses de plus : j'en ai 5.",
			null,
			"Votre thé ! Il me reste 2 tasses.",
		]);
	});

	it("dit ce qui manque, l'air triste", () => {
		const outcome = {
			kind: "failure",
			reason: "CART_EMPTY",
			cardIndex: 2,
		} as const;
		expect(theaSays(outcome)).toBe(
			"Il me manque des tasses pour cette commande.",
		);
		expect(moodOf(outcome)).toBe("sad");
	});

	it.each([
		[
			{ code: "MISSING_AMOUNT", word: "remplir", card: 0 },
			"la carte 1 (remplir) doit donner un nombre de tasses, par exemple remplir 3.",
		],
		[
			{ code: "UNEXPECTED_AMOUNT", word: "avancer", card: 1 },
			"la carte 2 (avancer) ne prend pas de nombre.",
		],
		[
			{ code: "MISSING_NAME", word: "routine", card: 2 },
			"la carte 3 doit nommer sa routine, par exemple routine demi-tour.",
		],
		[
			{ code: "ROUTINE_FIRST" },
			"la liste commence par une routine : écrivez d'abord le programme principal.",
		],
		[{ code: "EMPTY_ROUTINE", name: "a" }, "la routine a n'a aucune carte."],
		[
			{ code: "ROUTINE_TRAP", name: "a" },
			"la routine a ne peut pas être un piège.",
		],
		[
			{ code: "CALL_NOT_ROUTINE", label: "x" },
			"appeler -> x doit viser une routine.",
		],
		[
			{ code: "JUMP_TO_ROUTINE", label: "a" },
			"un saut ne peut pas viser la routine a : utilisez appeler -> a.",
		],
		[
			{ code: "JUMP_OTHER_ZONE", label: "x" },
			"le saut vers {#x} sort de sa liste : un saut reste dans le programme principal, ou dans sa routine.",
		],
	] as const)("décrit l'erreur %o", (error, text) => {
		expect(levelErrorMessage(error)).toBe(`Niveau invalide : ${text}`);
	});
});

describe("GameSession, les routines", () => {
	const level = valid(DEMI_TOUR);
	const ids = (session: GameSession): string[] =>
		session.program.map((c) => c.id);

	it("garde chaque carte dans sa zone, en-tête en tête de routine", () => {
		const session = new GameSession(level, { random: () => 0.3 });
		const program = ids(session);
		expect(program.indexOf("demi-tour")).toBe(9);
		expect(program.slice(10).sort()).toEqual(["@10", "@11"]);
		expect(session.zoneOf("@10")).toBe(1);
		expect(session.zoneOf("@0")).toBe(0);
	});

	it("ne sort pas une carte de sa routine, et ne déplace pas l'en-tête", () => {
		const session = new GameSession(level);
		expect(session.isLocked("demi-tour")).toBe(true);
		expect(session.move("demi-tour", "program", 0)).toBe(false);
		expect(session.move("@10", "program", 0)).toBe(true);
		expect(ids(session).indexOf("@10")).toBe(10);
		expect(session.move("@0", "program", 12)).toBe(true);
		expect(ids(session).indexOf("@0")).toBe(8);
	});

	it("remet une carte mise de côté dans sa propre zone", () => {
		const session = new GameSession(level);
		session.move("@11", "aside", 0);
		expect(session.aside.map((c) => c.id)).toEqual(["@11"]);
		session.move("@11", "program", 99);
		expect(ids(session).at(-1)).toBe("@11");
		session.move("@11", "aside", 0);
		session.shuffle();
		expect(session.aside).toEqual([]);
		expect(session.zoneOf("@11")).toBe(1);
		expect(ids(session).indexOf("demi-tour")).toBe(9);
	});

	it("réussit dans l'ordre de la solution", () => {
		const session = new GameSession(level);
		level.cards.forEach((card, k) => session.move(card.id, "program", k));
		expect(ids(session)).toEqual(level.cards.map((c) => c.id));
		session.start();
		expect(session.finish()?.outcome).toEqual({ kind: "success" });
	});

	it("place l'aide dans chaque zone, en tête, en suivant la solution", () => {
		const routine = valid({
			...DEMI_TOUR,
			grids: ["T> .  M"],
			cards: ["appeler -> r", "routine r", "avancer", "avancer", "livrer"],
		});
		const session = new GameSession(routine);
		for (let n = 0; n < 4; n += 1) {
			// Livrer trop tôt : la carte va en tête de sa routine
			session.move("@4", "program", 0);
			session.start();
			expect(session.finish()?.outcome.kind).toBe("failure");
		}
		expect(session.locked).toBe(2);
		expect(ids(session).slice(0, 3)).toEqual(["@0", "r", "@2"]);
		expect(session.isLocked("@2")).toBe(true);
		expect(session.isLocked("@3")).toBe(false);
	});

	it("n'exécute pas une tournée sans carte", () => {
		const empty = valid({
			...DEMI_TOUR,
			grids: ["T> M"],
			cards: ["avancer", "livrer"],
		});
		const session = new GameSession(empty);
		session.move("@1", "aside", 0);
		session.move("@0", "aside", 0);
		expect(session.start()).toBeNull();
	});
});
