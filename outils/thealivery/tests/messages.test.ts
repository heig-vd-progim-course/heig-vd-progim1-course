import { describe, expect, it } from "vitest";
import { levelErrorMessage, theaSays } from "../src/application/messages.ts";
import type { CardFailureReason } from "../src/domaine/engine.ts";

describe("theaSays", () => {
	it("annonce la réussite", () => {
		expect(theaSays({ kind: "success" })).toBe("Tournée terminée !");
	});

	it.each([
		["FELL_IN_POND", "Plouf ! Je suis tombée dans une mare."],
		["FELL_IN_HOLE", "Aïe ! Je suis tombée dans un trou."],
		["LEFT_TOWN", "Je ne peux pas sortir du quartier."],
		["NOTHING_TO_PICK", "Je n'ai rien à ramasser."],
		["NOBODY_HERE", "Personne n'attend de thé ici."],
		[
			"TARGET_SET_ASIDE",
			"Je ne trouve pas la carte où aller : elle est mise de côté.",
		],
		["LOOPS_FOREVER", "Je tourne en rond ! Ma tournée ne finit jamais."],
	] as const)(
		"dit pourquoi elle s'arrête : %s",
		(reason: CardFailureReason, text) => {
			expect(theaSays({ kind: "failure", reason, cardIndex: 0 })).toBe(text);
		},
	);

	it.each([
		[1, 0, "il reste une maison à livrer."],
		[2, 0, "il reste 2 maisons à livrer."],
		[0, 3, "il reste des feuilles à ramasser."],
		[1, 1, "il reste une maison à livrer et des feuilles à ramasser."],
	])(
		"dit ce qui reste de la tournée : %i maison(s), %i feuille(s)",
		(houses, leaves, end) => {
			expect(
				theaSays({
					kind: "failure",
					reason: "ROUND_NOT_FINISHED",
					houses,
					leaves,
				}),
			).toBe(`Ma tournée n'est pas finie : ${end}`);
		},
	);

	it("demande de mettre de côté la carte en trop", () => {
		expect(theaSays({ kind: "failure", reason: "EXTRA_CARD" })).toBe(
			"Ma tournée est faite, mais une carte est en trop : mettez-la de côté.",
		);
	});

	it("nomme la rue quand le niveau en a plusieurs", () => {
		const outcome = {
			kind: "failure",
			reason: "NOBODY_HERE",
			cardIndex: 3,
		} as const;
		expect(theaSays(outcome, 1, 2)).toBe(
			"Rue 2 : Personne n'attend de thé ici.",
		);
		expect(theaSays(outcome, 0, 1)).toBe("Personne n'attend de thé ici.");
		expect(
			theaSays(
				{ kind: "failure", reason: "ROUND_NOT_FINISHED", houses: 1, leaves: 0 },
				0,
				2,
			),
		).toBe(
			"Rue 1 : Ma tournée n'est pas finie : il reste une maison à livrer.",
		);
	});
});

describe("levelErrorMessage", () => {
	it.each([
		[{ code: "MISSING_ID" }, "il manque data-id."],
		[{ code: "DUPLICATE_ID", id: "s01-x" }, "data-id s01-x est déjà utilisé."],
		[{ code: "NO_GRID" }, "il manque la grille, dans un bloc text."],
		[{ code: "EMPTY_GRID", street: 0 }, "la grille est vide."],
		[
			{ code: "UNKNOWN_SYMBOL", symbol: "x", line: 1, street: 0 },
			"symbole inconnu x, ligne 1.",
		],
		[
			{ code: "ROW_LENGTH", line: 2, found: 3, expected: 4, street: 0 },
			"la ligne 2 a 3 cases au lieu de 4.",
		],
		[
			{ code: "THEA_COUNT", found: 0, street: 0 },
			"la grille doit contenir exactement une Théa.",
		],
		[{ code: "NO_CARDS" }, "il manque la liste des cartes."],
		[
			{ code: "UNKNOWN_CARD", word: "sauter", card: 0 },
			"carte inconnue sauter.",
		],
		[
			{ code: "MISSING_TARGET", word: "aller", card: 2 },
			"la carte 3 (aller) doit viser une carte, avec -> nom.",
		],
		[
			{ code: "UNEXPECTED_TARGET", word: "avancer", card: 0 },
			"la carte 1 (avancer) n'est pas un saut : retirez -> nom.",
		],
		[
			{ code: "DUPLICATE_LABEL", label: "a" },
			"l'étiquette {#a} est utilisée deux fois.",
		],
		[
			{ code: "UNKNOWN_LABEL", label: "fin" },
			"aucune carte ne porte l'étiquette {#fin}.",
		],
		[
			{
				code: "SOLUTION_FAILS",
				street: 0,
				card: 2,
				outcome: { kind: "failure", reason: "FELL_IN_POND", cardIndex: 2 },
			},
			"la solution échoue à la carte 3 (mare).",
		],
		[
			{
				code: "SOLUTION_FAILS",
				street: 0,
				card: null,
				outcome: {
					kind: "failure",
					reason: "ROUND_NOT_FINISHED",
					houses: 2,
					leaves: 0,
				},
			},
			"la solution ne finit pas la tournée : il reste 2 maisons à livrer.",
		],
		[
			{
				code: "SOLUTION_FAILS",
				street: 0,
				card: null,
				outcome: { kind: "failure", reason: "EXTRA_CARD" },
			},
			"la solution a une carte en trop.",
		],
	] as const)("décrit %j", (error, text) => {
		expect(levelErrorMessage(error)).toBe(`Niveau invalide : ${text}`);
	});

	it("nomme la rue quand le niveau en a plusieurs", () => {
		expect(
			levelErrorMessage({ code: "THEA_COUNT", found: 2, street: 1 }, 2),
		).toBe(
			"Niveau invalide : rue 2, la grille doit contenir exactement une Théa.",
		);
		expect(levelErrorMessage({ code: "NO_CARDS" }, 2)).toBe(
			"Niveau invalide : il manque la liste des cartes.",
		);
	});
});
