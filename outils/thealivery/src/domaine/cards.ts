// Les cartes : leurs types, et la fabrique qui lit une carte écrite dans un
// niveau (« avancer », « si-maison -> fin », « piège : tourner-gauche »,
// « remplir 3 », « routine demi-tour »). C'est le seul endroit qui connaît le
// vocabulaire des niveaux.

export type CardType =
	| "move"
	| "turn-left"
	| "turn-right"
	| "pick-up"
	| "deliver"
	| "go-to"
	| "if-house"
	| "call"
	| "routine"
	| "fill"
	| "add";

export interface CardSpec {
	/**
	 * L'étiquette `{#nom}` si la carte en a une, sinon `@` et sa position. Pour
	 * l'en-tête d'une routine, le nom de la routine.
	 */
	readonly id: string;
	readonly type: CardType;
	/** Une carte piège : le programme doit réussir sans elle. */
	readonly trap: boolean;
	/** Pour un saut : l'identifiant de la carte visée. */
	readonly target?: string;
	/** Pour « remplir » et « ajouter » : le nombre de tasses. */
	readonly amount?: number;
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
	appeler: "call",
	remplir: "fill",
	ajouter: "add",
};

const JUMPS: ReadonlySet<CardType> = new Set(["go-to", "if-house", "call"]);
const AMOUNTS: ReadonlySet<CardType> = new Set(["fill", "add"]);

/** Une carte qui désigne une autre carte : un saut, ou l'appel d'une routine. */
export function isJump(type: CardType): boolean {
	return JUMPS.has(type);
}

/** L'en-tête d'une routine : fixe, il ne s'exécute pas. */
export function isHeader(card: CardSpec): boolean {
	return card.type === "routine";
}

export type CardError =
	| { readonly code: "UNKNOWN_CARD"; readonly word: string }
	| { readonly code: "MISSING_TARGET"; readonly word: string }
	| { readonly code: "UNEXPECTED_TARGET"; readonly word: string }
	| { readonly code: "MISSING_AMOUNT"; readonly word: string }
	| { readonly code: "UNEXPECTED_AMOUNT"; readonly word: string }
	| { readonly code: "MISSING_NAME"; readonly word: string };

export type ParseCardResult =
	| { readonly ok: true; readonly card: CardSpec }
	| { readonly ok: false; readonly error: CardError };

const TRAP = /^piège\s*:\s*/u;
const LABEL = /\s*\{#([^\s{}]+)\}\s*$/u;
const TARGET = /\s*->\s*(\S+)\s*$/u;
const AMOUNT = /^(\S+)\s+(\d+)$/u;
const ROUTINE = /^routine(?:\s+(\S+))?$/u;

/**
 * Lit une carte. L'ordre des éléments est fixe : `piège :`, le mot, un nombre
 * pour « remplir » et « ajouter », `-> nom` pour un saut ou un appel, puis
 * `{#nom}` pour une carte visée par un saut. L'en-tête d'une routine s'écrit
 * `routine nom`.
 */
export function parseCard(text: string, index: number): ParseCardResult {
	let rest = text.trim();

	const trap = TRAP.test(rest);
	rest = rest.replace(TRAP, "");

	const label = LABEL.exec(rest)?.[1];
	rest = rest.replace(LABEL, "");

	const target = TARGET.exec(rest)?.[1];
	rest = rest.replace(TARGET, "").trim();

	const routine = ROUTINE.exec(rest);
	if (routine !== null) {
		const name = routine[1];
		if (name === undefined) {
			return { ok: false, error: { code: "MISSING_NAME", word: "routine" } };
		}
		if (target !== undefined) {
			return {
				ok: false,
				error: { code: "UNEXPECTED_TARGET", word: "routine" },
			};
		}
		return { ok: true, card: { id: name, type: "routine", trap } };
	}

	const counted = AMOUNT.exec(rest);
	const word = counted?.[1] ?? rest;
	const amount = counted?.[2] === undefined ? undefined : Number(counted[2]);

	const type = WORDS[word];
	if (type === undefined) {
		return { ok: false, error: { code: "UNKNOWN_CARD", word: rest } };
	}
	if (isJump(type) && target === undefined) {
		return { ok: false, error: { code: "MISSING_TARGET", word } };
	}
	if (!isJump(type) && target !== undefined) {
		return { ok: false, error: { code: "UNEXPECTED_TARGET", word } };
	}
	if (AMOUNTS.has(type) && amount === undefined) {
		return { ok: false, error: { code: "MISSING_AMOUNT", word } };
	}
	if (!AMOUNTS.has(type) && amount !== undefined) {
		return { ok: false, error: { code: "UNEXPECTED_AMOUNT", word } };
	}

	const id = label ?? `@${String(index)}`;
	return {
		ok: true,
		card: {
			id,
			type,
			trap,
			...(target === undefined ? {} : { target }),
			...(amount === undefined ? {} : { amount }),
		},
	};
}
