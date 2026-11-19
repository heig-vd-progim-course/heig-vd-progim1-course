// Les zones d'un programme. La tournée est une seule liste : le programme
// principal, puis chaque routine, qui commence par son en-tête
// (« routine demi-tour »). Le moteur, la session et les vues partagent ce
// découpage.

import { isHeader, type CardSpec } from "./cards.ts";

export interface Zone {
	/** L'en-tête de la routine, ou null pour le programme principal. */
	readonly header: CardSpec | null;
	/** La position de la première carte de la zone, après son en-tête. */
	readonly start: number;
	/** La position qui suit la dernière carte de la zone. */
	readonly end: number;
}

/** Découpe une liste de cartes en zones : le programme principal d'abord. */
export function zonesOf(program: readonly CardSpec[]): Zone[] {
	const zones: Zone[] = [];
	let header: CardSpec | null = null;
	let start = 0;
	program.forEach((card, i) => {
		if (isHeader(card)) {
			zones.push({ header, start, end: i });
			header = card;
			start = i + 1;
		}
	});
	zones.push({ header, start, end: program.length });
	return zones;
}

/** La zone de chaque carte, par son identifiant : 0 pour le programme principal. */
export function homeZones(program: readonly CardSpec[]): Map<string, number> {
	const homes = new Map<string, number>();
	zonesOf(program).forEach((zone, z) => {
		if (zone.header !== null) {
			homes.set(zone.header.id, z);
		}
		program.slice(zone.start, zone.end).forEach((card) => {
			homes.set(card.id, z);
		});
	});
	return homes;
}

/**
 * Le numéro affiché de chaque carte : les en-têtes n'en ont pas, et les
 * numéros continuent d'une zone à l'autre, comme des adresses.
 */
export function cardNumbers(program: readonly CardSpec[]): (number | null)[] {
	let n = 0;
	return program.map((card) => {
		if (isHeader(card)) {
			return null;
		}
		n += 1;
		return n;
	});
}

/** Le nombre de cartes à exécuter, en-têtes exclus. */
export function cardCount(program: readonly CardSpec[]): number {
	return program.filter((card) => !isHeader(card)).length;
}
