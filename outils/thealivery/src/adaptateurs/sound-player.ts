// Les bruitages du pack Ninja Adventure. Désactivés par défaut : une salle
// entière joue en même temps. Le choix vaut pour tout le site.

import { soundPreference } from "./progress-store.ts";
import { vendorUrl } from "./assets.ts";

export type Sound =
	| "move"
	| "turn"
	| "pick-up"
	| "deliver"
	| "jump"
	| "pond"
	| "hole"
	| "bump"
	| "fail"
	| "help"
	| "success";

const cache = new Map<Sound, HTMLAudioElement>();
const listeners = new Set<(on: boolean) => void>();

export function soundOn(): boolean {
	return soundPreference.get();
}

export function setSound(on: boolean): void {
	soundPreference.set(on);
	listeners.forEach((listener) => {
		listener(on);
	});
}

/** Prévient chaque niveau de la page quand le son est activé ou coupé. */
export function onSoundChange(listener: (on: boolean) => void): () => void {
	listeners.add(listener);
	return () => listeners.delete(listener);
}

export function play(sound: Sound): void {
	if (!soundOn()) {
		return;
	}
	let audio = cache.get(sound);
	if (audio === undefined) {
		audio = new Audio(vendorUrl(`sons/${sound}.mp3`));
		audio.volume = 0.5;
		cache.set(sound, audio);
	}
	audio.currentTime = 0;
	audio.play().catch(() => {
		// Lecture refusée par le navigateur : on continue sans son
	});
}
