// Un niveau validé : ses rues, ses cartes dans l'ordre écrit par l'enseignant.

import type { CardSpec } from "./cards.ts";
import type { Street } from "./street.ts";

export interface LevelSpec {
	readonly id: string;
	readonly instruction: string;
	/** Le même programme doit réussir sur chacune des rues. */
	readonly streets: readonly Street[];
	/** Dans un ordre qui réussit, pièges compris. */
	readonly cards: readonly CardSpec[];
}

/** La solution de l'enseignant : ses cartes dans l'ordre, sans les pièges. */
export function solutionOf(level: LevelSpec): readonly CardSpec[] {
	return level.cards.filter((card) => !card.trap);
}

export function hasTraps(level: LevelSpec): boolean {
	return level.cards.some((card) => card.trap);
}
