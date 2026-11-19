// La validation d'un niveau écrit par l'enseignant. Un niveau invalide n'est
// jamais montré : il est remplacé par la liste de ses erreurs.

import { isHeader, parseCard, type CardError, type CardSpec } from "./cards.ts";
import { runLevel, type Outcome } from "./engine.ts";
import { solutionOf, type LevelSpec } from "./level.ts";
import { homeZones } from "./program.ts";
import {
	parseStreet,
	type GridError,
	type ObstacleKind,
	type Position,
	type Street,
} from "./street.ts";

/** Un niveau tel que le lecteur l'a trouvé dans la page, pas encore vérifié. */
export interface RawLevel {
	readonly id: string | null;
	readonly instruction: string;
	readonly grids: readonly string[];
	readonly cards: readonly string[];
}

export type LevelError =
	| { readonly code: "MISSING_ID" }
	| { readonly code: "DUPLICATE_ID"; readonly id: string }
	| { readonly code: "NO_GRID" }
	| (GridError & { readonly street: number })
	| { readonly code: "NO_CARDS" }
	| (CardError & { readonly card: number })
	| { readonly code: "DUPLICATE_LABEL"; readonly label: string }
	| { readonly code: "UNKNOWN_LABEL"; readonly label: string }
	| { readonly code: "ROUTINE_FIRST" }
	| { readonly code: "EMPTY_ROUTINE"; readonly name: string }
	| { readonly code: "ROUTINE_TRAP"; readonly name: string }
	| { readonly code: "CALL_NOT_ROUTINE"; readonly label: string }
	| { readonly code: "JUMP_TO_ROUTINE"; readonly label: string }
	| { readonly code: "JUMP_OTHER_ZONE"; readonly label: string }
	| {
			readonly code: "SOLUTION_FAILS";
			readonly street: number;
			/** La carte fautive, par sa position dans la liste écrite, pièges compris. */
			readonly card: number | null;
			readonly outcome: Exclude<Outcome, { readonly kind: "success" }>;
	  };

export type ValidationResult =
	| { readonly ok: true; readonly level: LevelSpec }
	| { readonly ok: false; readonly errors: readonly LevelError[] };

export interface ValidationOptions {
	/** Les identifiants déjà pris par les niveaux précédents de la page. */
	readonly usedIds?: ReadonlySet<string>;
	/** La sorte de chaque obstacle, décidée par le rendu de la rue. */
	readonly chooseObstacle?: (
		street: number,
		position: Position,
	) => ObstacleKind;
}

/**
 * Vérifie un niveau dans l'ordre : son identifiant, ses grilles, ses cartes,
 * ses sauts, puis seulement s'il n'y a aucune autre erreur, que la solution
 * de l'enseignant réussit sur chaque rue.
 */
export function validateLevel(
	raw: RawLevel,
	options: ValidationOptions = {},
): ValidationResult {
	const errors: LevelError[] = [];

	const id = raw.id?.trim() ?? "";
	if (id === "") {
		errors.push({ code: "MISSING_ID" });
	} else if (options.usedIds?.has(id) === true) {
		errors.push({ code: "DUPLICATE_ID", id });
	}

	const streets = parseStreets(raw.grids, options, errors);
	const cards = parseCards(raw.cards, errors);
	checkLabels(cards, errors);
	checkRoutines(cards, errors);

	if (errors.length > 0) {
		return { ok: false, errors };
	}

	const level: LevelSpec = {
		id,
		instruction: raw.instruction.trim(),
		streets,
		cards,
	};
	const solution = solutionOf(level);
	const result = runLevel(level, solution);
	if (result.outcome.kind === "failure") {
		const failed =
			"cardIndex" in result.outcome
				? solution[result.outcome.cardIndex]
				: undefined;
		return {
			ok: false,
			errors: [
				{
					code: "SOLUTION_FAILS",
					street: result.streetIndex,
					card: failed === undefined ? null : cards.indexOf(failed),
					outcome: result.outcome,
				},
			],
		};
	}
	return { ok: true, level };
}

function parseStreets(
	grids: readonly string[],
	options: ValidationOptions,
	errors: LevelError[],
): Street[] {
	if (grids.length === 0) {
		errors.push({ code: "NO_GRID" });
	}
	const streets: Street[] = [];
	for (const [index, grid] of grids.entries()) {
		const choose = options.chooseObstacle;
		const parsed = parseStreet(
			grid,
			choose === undefined ? undefined : (position) => choose(index, position),
		);
		if (parsed.ok) {
			streets.push(parsed.street);
		} else {
			errors.push(
				...parsed.errors.map((error) => ({ ...error, street: index })),
			);
		}
	}
	return streets;
}

function parseCards(
	lines: readonly string[],
	errors: LevelError[],
): CardSpec[] {
	if (lines.length === 0) {
		errors.push({ code: "NO_CARDS" });
	}
	const cards: CardSpec[] = [];
	for (const [index, line] of lines.entries()) {
		const parsed = parseCard(line, index);
		if (parsed.ok) {
			cards.push(parsed.card);
		} else {
			errors.push({ ...parsed.error, card: index });
		}
	}
	return cards;
}

function checkLabels(cards: readonly CardSpec[], errors: LevelError[]): void {
	const seen = new Set<string>();
	for (const card of cards) {
		if (seen.has(card.id)) {
			errors.push({ code: "DUPLICATE_LABEL", label: card.id });
		}
		seen.add(card.id);
	}
	for (const card of cards) {
		if (card.target !== undefined && !seen.has(card.target)) {
			errors.push({ code: "UNKNOWN_LABEL", label: card.target });
		}
	}
}

/**
 * Les routines : le programme principal vient d'abord, une routine a au moins
 * une carte, « appeler » vise une routine, et un saut reste dans sa zone.
 */
function checkRoutines(cards: readonly CardSpec[], errors: LevelError[]): void {
	if (cards[0] !== undefined && isHeader(cards[0])) {
		errors.push({ code: "ROUTINE_FIRST" });
	}
	cards.forEach((card, i) => {
		if (!isHeader(card)) {
			return;
		}
		if (card.trap) {
			errors.push({ code: "ROUTINE_TRAP", name: card.id });
		}
		const next = cards[i + 1];
		if (next === undefined || isHeader(next)) {
			errors.push({ code: "EMPTY_ROUTINE", name: card.id });
		}
	});
	const homes = homeZones(cards);
	for (const card of cards) {
		const target = cards.find((c) => c.id === card.target);
		if (target === undefined) {
			continue;
		}
		if (card.type === "call" && !isHeader(target)) {
			errors.push({ code: "CALL_NOT_ROUTINE", label: target.id });
		} else if (card.type !== "call" && isHeader(target)) {
			errors.push({ code: "JUMP_TO_ROUTINE", label: target.id });
		} else if (
			card.type !== "call" &&
			homes.get(card.id) !== homes.get(target.id)
		) {
			errors.push({ code: "JUMP_OTHER_ZONE", label: target.id });
		}
	}
}
