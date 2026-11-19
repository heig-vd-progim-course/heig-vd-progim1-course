// Les cartes : leurs types, et la fabrique qui lit une carte écrite dans un
// niveau (« avancer », « si-maison -> fin », « piège : tourner-gauche »).
// C'est le seul endroit qui connaît le vocabulaire des niveaux.

export type CardType =
	| "move"
	| "turn-left"
	| "turn-right"
	| "pick-up"
	| "deliver"
	| "go-to"
	| "if-house";

export interface CardSpec {
	/** L'étiquette `{#nom}` si la carte en a une, sinon `@` et sa position. */
	readonly id: string;
	readonly type: CardType;
	/** Une carte piège : le programme doit réussir sans elle. */
	readonly trap: boolean;
	/** Pour un saut : l'identifiant de la carte visée. */
	readonly target?: string;
}

/** Le mot du Markdown pour chaque type de carte. */
export const WORDS: Readonly<Record<string, CardType>> = {
	avancer: "move",
	"tourner-gauche": "turn-left",
	"tourner-droite": "turn-right",
	ramasser: "pick-up",
	livrer: "deliver",
	aller: "go-to",
	"si-maison": "if-house",
};

const JUMPS: ReadonlySet<CardType> = new Set(["go-to", "if-house"]);

export function isJump(type: CardType): boolean {
	return JUMPS.has(type);
}

export type CardError =
	| { readonly code: "UNKNOWN_CARD"; readonly word: string }
	| { readonly code: "MISSING_TARGET"; readonly word: string }
	| { readonly code: "UNEXPECTED_TARGET"; readonly word: string };

export type ParseCardResult =
	| { readonly ok: true; readonly card: CardSpec }
	| { readonly ok: false; readonly error: CardError };

const TRAP = /^piège\s*:\s*/u;
const LABEL = /\s*\{#([^\s{}]+)\}\s*$/u;
const TARGET = /\s*->\s*(\S+)\s*$/u;

/**
 * Lit une carte. L'ordre des éléments est fixe : `piège :`, le mot, `-> nom`
 * pour un saut, puis `{#nom}` pour une carte visée par un saut.
 */
export function parseCard(text: string, index: number): ParseCardResult {
	let rest = text.trim();

	const trap = TRAP.test(rest);
	rest = rest.replace(TRAP, "");

	const label = LABEL.exec(rest)?.[1];
	rest = rest.replace(LABEL, "");

	const target = TARGET.exec(rest)?.[1];
	rest = rest.replace(TARGET, "").trim();

	const type = WORDS[rest];
	if (type === undefined) {
		return { ok: false, error: { code: "UNKNOWN_CARD", word: rest } };
	}
	if (isJump(type) && target === undefined) {
		return { ok: false, error: { code: "MISSING_TARGET", word: rest } };
	}
	if (!isJump(type) && target !== undefined) {
		return { ok: false, error: { code: "UNEXPECTED_TARGET", word: rest } };
	}

	const id = label ?? `@${String(index)}`;
	return {
		ok: true,
		card:
			target === undefined ? { id, type, trap } : { id, type, trap, target },
	};
}
