// La bulle de Théa : son portrait, son émotion du moment, et ce qu'elle dit.
// La région est annoncée par les lecteurs d'écran à chaque changement.

import type { Mood } from "../application/messages.ts";
import { vendorUrl } from "./assets.ts";

export type Tone = "neutral" | "win" | "fail";

export const READY_TEXT =
	"Je suis prête. Remettez ma tournée dans l'ordre, puis Exécuter.";

export class BubbleView {
	readonly element: HTMLElement;
	private readonly mood: HTMLImageElement;
	private readonly face: HTMLElement;
	private readonly text: HTMLElement;

	constructor() {
		this.element = document.createElement("div");
		this.element.className = "tl-bubble";
		this.element.setAttribute("aria-live", "polite");
		this.face = document.createElement("div");
		this.face.className = "tl-face";
		this.face.setAttribute("aria-hidden", "true");
		const portrait = document.createElement("img");
		portrait.src = vendorUrl("ui/faceset.png");
		portrait.alt = "";
		portrait.className = "tl-portrait";
		this.mood = document.createElement("img");
		this.mood.className = "tl-mood";
		this.mood.alt = "";
		this.face.append(portrait, this.mood);
		this.text = document.createElement("div");
		this.text.className = "tl-say";
		this.element.append(this.face, this.text);
		this.reset();
	}

	say(text: string, tone: Tone = "neutral", mood: Mood | null = null): void {
		this.element.dataset.tone = tone;
		this.text.textContent = text;
		this.mood.hidden = mood === null;
		if (mood !== null) {
			this.mood.src = vendorUrl(`ui/mood-${mood}.png`);
		}
		// Un sursaut du portrait quand Théa échoue
		this.face.classList.remove("tl-shake");
		if (tone === "fail") {
			this.face.getBoundingClientRect(); // relance l'animation
			this.face.classList.add("tl-shake");
		}
	}

	reset(): void {
		this.say(READY_TEXT, "neutral", "ready");
	}
}
