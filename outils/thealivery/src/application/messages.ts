// Les phrases en français : ce que dit Théa, et ce que voit l'enseignant quand
// un niveau est invalide. Le domaine rend des raisons ; elles sont mises en mots
// ici, et seulement ici.

import type { CardSpec } from "../domaine/cards.ts";
import { cardNumbers } from "../domaine/program.ts";
import type {
	CardFailureReason,
	FailureReason,
	Outcome,
	Step,
} from "../domaine/engine.ts";
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
	CART_EMPTY: "Il me manque des tasses pour cette commande.",
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
	CART_EMPTY: "tasses manquantes",
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
		case "MISSING_AMOUNT":
			return `la carte ${String(error.card + 1)} (${error.word}) doit donner un nombre de tasses, par exemple ${error.word} 3.`;
		case "UNEXPECTED_AMOUNT":
			return `la carte ${String(error.card + 1)} (${error.word}) ne prend pas de nombre.`;
		case "MISSING_NAME":
			return `la carte ${String(error.card + 1)} doit nommer sa routine, par exemple routine demi-tour.`;
		case "ROUTINE_FIRST":
			return "la liste commence par une routine : écrivez d'abord le programme principal.";
		case "EMPTY_ROUTINE":
			return `la routine ${error.name} n'a aucune carte.`;
		case "ROUTINE_TRAP":
			return `la routine ${error.name} ne peut pas être un piège.`;
		case "CALL_NOT_ROUTINE":
			return `appeler -> ${error.label} doit viser une routine.`;
		case "JUMP_TO_ROUTINE":
			return `un saut ne peut pas viser la routine ${error.label} : utilisez appeler -> ${error.label}.`;
		case "JUMP_OTHER_ZONE":
			return `le saut vers {#${error.label}} sort de sa liste : un saut reste dans le programme principal, ou dans sa routine.`;
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

function cups(n: number): string {
	return `${String(n)} tasse${n > 1 ? "s" : ""}`;
}

/**
 * Ce que dit Théa pendant une étape réussie, ou rien. Avec `withCups`, elle
 * dit aussi combien de tasses il lui reste après une livraison.
 */
export function stepSays(
	step: Step,
	program: readonly CardSpec[],
	withCups = false,
): string | null {
	const card = program[step.cardIndex];
	const numbers = cardNumbers(program);
	const numberAt = (index: number): string => String(numbers[index] ?? "?");
	const target =
		card?.target === undefined
			? -1
			: program.findIndex((c) => c.id === card.target);
	const left = step.thea.cups;
	switch (step.event) {
		case "deliver":
			return withCups
				? `Votre thé ! Il me reste ${cups(left)}.`
				: "Votre thé !";
		case "pick-up":
			return "Des feuilles de thé, parfait.";
		case "jump":
			return card?.type === "if-house"
				? `Une maison attend ici : je saute à la carte ${numberAt(target)}.`
				: `Je reprends à la carte ${numberAt(target)}.`;
		case "no-jump":
			return "Pas de maison ici, je continue.";
		case "call":
			return `J'appelle la routine ${card?.target ?? ""}.`;
		case "return": {
			const back = step.returnTo ?? -1;
			const next = program[back];
			return next === undefined || next.type === "routine"
				? `Fin de la routine ${card?.id ?? ""} : ma tournée est finie.`
				: `Fin de la routine ${card?.id ?? ""} : je reprends à la carte ${numberAt(back)}.`;
		}
		case "fill":
			return `Ma charrette contient ${cups(left)}.`;
		case "add":
			return `${card?.amount === 1 ? "Une tasse" : cups(card?.amount ?? 0)} de plus : j'en ai ${String(left)}.`;
		default:
			return null;
	}
}

/** Les émotions de Théa, une par sprite d'émotion du pack. */
export type Mood =
	| "ready"
	| "happy"
	| "love"
	| "splash"
	| "fall"
	| "bump"
	| "puzzled"
	| "lost"
	| "dizzy"
	| "sad"
	| "dots";

const FAILURE_MOODS: Readonly<Record<FailureReason, Mood>> = {
	FELL_IN_POND: "splash",
	FELL_IN_HOLE: "fall",
	LEFT_TOWN: "bump",
	NOTHING_TO_PICK: "puzzled",
	NOBODY_HERE: "lost",
	TARGET_SET_ASIDE: "puzzled",
	LOOPS_FOREVER: "dizzy",
	CART_EMPTY: "sad",
	ROUND_NOT_FINISHED: "sad",
	EXTRA_CARD: "dots",
};

/** L'émotion de Théa à la fin d'une exécution. */
export function moodOf(outcome: Outcome): Mood {
	return outcome.kind === "success" ? "love" : FAILURE_MOODS[outcome.reason];
}

/** Le message de l'aide, après le troisième essai raté. */
export function helpSays(locked: number): string {
	return locked === 1
		? "J'ai placé la première carte pour vous."
		: `J'ai placé les ${String(locked)} premières cartes pour vous.`;
}
