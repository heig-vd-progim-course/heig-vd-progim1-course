// La progression, dans le localStorage du navigateur. Le stockage peut être
// absent ou refusé (navigation privée, cookies bloqués) : le jeu continue
// alors sans mémoire, sans erreur.

import type { ProgressStore } from "../application/session.ts";

const PREFIX = "thealivery:";

function read(key: string): string | null {
	try {
		return localStorage.getItem(PREFIX + key);
	} catch {
		return null;
	}
}

function write(key: string, value: string): void {
	try {
		localStorage.setItem(PREFIX + key, value);
	} catch {
		// Pas de stockage : rien n'est mémorisé
	}
}

export const localProgress: ProgressStore = {
	getStars(levelId) {
		const stars = Number(read(`stars:${levelId}`));
		return Number.isInteger(stars) && stars >= 0 && stars <= 3 ? stars : 0;
	},
	setStars(levelId, stars) {
		write(`stars:${levelId}`, String(stars));
	},
};

export const soundPreference = {
	get(): boolean {
		return read("son") === "oui";
	},
	set(on: boolean): void {
		write("son", on ? "oui" : "non");
	},
};
