// Un générateur au hasard reproductible : la même graine donne toujours les
// mêmes tirages. Il est identique, tirage pour tirage, à la classe
// SeededRandom de conception/jeu/niveaux/generer.py, la référence du rendu.

export interface Random {
	/** Un nombre dans [0, 1). */
	random(): number;
	choice<T>(items: readonly T[]): T;
	/** Un entier dans [start, stop). */
	randrange(start: number, stop: number): number;
}

/** FNV-1a sur les octets UTF-8 du texte. */
export function hash(text: string): number {
	let h = 0x811c9dc5;
	for (const byte of new TextEncoder().encode(text)) {
		h = Math.imul(h ^ byte, 0x01000193) >>> 0;
	}
	return h;
}

/** mulberry32, initialisé par le hachage de la graine. */
export function seededRandom(seed: string): Random {
	let state = hash(seed);
	const random = (): number => {
		state = (state + 0x6d2b79f5) >>> 0;
		let t = state;
		t = Math.imul(t ^ (t >>> 15), t | 1) >>> 0;
		t = (t ^ ((t + (Math.imul(t ^ (t >>> 7), t | 61) >>> 0)) >>> 0)) >>> 0;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
	return {
		random,
		choice<T>(items: readonly T[]): T {
			const item = items[Math.floor(random() * items.length)];
			if (item === undefined) {
				throw new Error("choice sur une liste vide");
			}
			return item;
		},
		randrange(start: number, stop: number): number {
			return start + Math.floor(random() * (stop - start));
		},
	};
}
