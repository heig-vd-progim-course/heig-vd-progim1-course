// Les phrases en français : ce que dit Théa, et ce que voit l'enseignant quand
// un niveau est invalide. Le domaine rend des raisons ; elles sont mises en mots
// ici, et seulement ici.

import type { CardFailureReason, Outcome } from "../domaine/engine.ts";
import type { LevelError } from "../domaine/validation.ts";

const CARD_FAILURES: Readonly<Record<CardFailureReason, string>> = {
	FELL_IN_POND: "Plouf ! Je suis tombée dans une mare.",
	FELL_IN_HOLE: "Aïe ! Je suis tombée dans un trou.",
	LEFT_TOWN: "Je ne peux pas sortir du quartier.",
	NOTHING_TO_PICK: "Je n'ai rien à ramasser.",
	NOBODY_HERE: "Personne n'attend de thé ici.",
	TARGET_SET_ASIDE:
		"Je ne trouve pas la carte où aller : elle est mise de côté.",
	LOOPS_FOREVER: "Je tourne en rond ! Ma tournée ne finit jamais.",
};

/** Une description courte, entre parenthèses, pour l'enseignant. */
const CARD_FAILURES_SHORT: Readonly<Record<CardFailureReason, string>> = {
	FELL_IN_POND: "mare",
	FELL_IN_HOLE: "trou",
	LEFT_TOWN: "bord du quartier",
	NOTHING_TO_PICK: "rien à ramasser",
	NOBODY_HERE: "personne à livrer",
	TARGET_SET_ASIDE: "carte visée absente",
	LOOPS_FOREVER: "boucle infinie",
};

function remaining(houses: number, leaves: number): string {
	const parts: string[] = [];
	if (houses === 1) {
		parts.push("une maison à livrer");
	} else if (houses > 1) {
		parts.push(`${String(houses)} maisons à livrer`);
	}
	if (leaves > 0) {
		parts.push("des feuilles à ramasser");
	}
	return parts.join(" et ");
}

/**
 * Ce que dit Théa à la fin d'une exécution. Quand le niveau a plusieurs rues,
 * un échec dit dans quelle rue il a eu lieu.
 */
export function theaSays(
	outcome: Outcome,
	street = 0,
	streetCount = 1,
): string {
	if (outcome.kind === "success") {
		return "Tournée terminée !";
	}
	const prefix = streetCount > 1 ? `Rue ${String(street + 1)} : ` : "";
	switch (outcome.reason) {
		case "ROUND_NOT_FINISHED":
			return `${prefix}Ma tournée n'est pas finie : il reste ${remaining(outcome.houses, outcome.leaves)}.`;
		case "EXTRA_CARD":
			return "Ma tournée est faite, mais une carte est en trop : mettez-la de côté.";
		default:
			return prefix + CARD_FAILURES[outcome.reason];
	}
}

/** Le message qui remplace un niveau invalide, dans la page et dans la console. */
export function levelErrorMessage(error: LevelError, streetCount = 1): string {
	const where =
		"street" in error && streetCount > 1
			? `rue ${String(error.street + 1)}, `
			: "";
	return `Niveau invalide : ${where}${describe(error)}`;
}

function describe(error: LevelError): string {
	switch (error.code) {
		case "MISSING_ID":
			return "il manque data-id.";
		case "DUPLICATE_ID":
			return `data-id ${error.id} est déjà utilisé.`;
		case "NO_GRID":
			return "il manque la grille, dans un bloc text.";
		case "EMPTY_GRID":
			return "la grille est vide.";
		case "UNKNOWN_SYMBOL":
			return `symbole inconnu ${error.symbol}, ligne ${String(error.line)}.`;
		case "ROW_LENGTH":
			return `la ligne ${String(error.line)} a ${String(error.found)} cases au lieu de ${String(error.expected)}.`;
		case "THEA_COUNT":
			return "la grille doit contenir exactement une Théa.";
		case "NO_CARDS":
			return "il manque la liste des cartes.";
		case "UNKNOWN_CARD":
			return `carte inconnue ${error.word}.`;
		case "MISSING_TARGET":
			return `la carte ${String(error.card + 1)} (${error.word}) doit viser une carte, avec -> nom.`;
		case "UNEXPECTED_TARGET":
			return `la carte ${String(error.card + 1)} (${error.word}) n'est pas un saut : retirez -> nom.`;
		case "DUPLICATE_LABEL":
			return `l'étiquette {#${error.label}} est utilisée deux fois.`;
		case "UNKNOWN_LABEL":
			return `aucune carte ne porte l'étiquette {#${error.label}}.`;
		case "SOLUTION_FAILS":
			return solutionFails(error.outcome, error.card);
	}
}

function solutionFails(
	outcome: Extract<LevelError, { code: "SOLUTION_FAILS" }>["outcome"],
	card: number | null,
): string {
	switch (outcome.reason) {
		case "ROUND_NOT_FINISHED":
			return `la solution ne finit pas la tournée : il reste ${remaining(outcome.houses, outcome.leaves)}.`;
		case "EXTRA_CARD":
			return "la solution a une carte en trop.";
		default:
			return `la solution échoue à la carte ${String((card ?? 0) + 1)} (${CARD_FAILURES_SHORT[outcome.reason]}).`;
	}
}
