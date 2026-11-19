// Un niveau jouable dans la page : le plateau, la bulle, la tournée et les
// boutons, reliés à une GameSession et à un Animator. C'est le seul endroit
// qui connaît à la fois les vues et l'application.

import { Animator } from "../application/animator.ts";
import {
	helpSays,
	moodOf,
	stepSays,
	theaSays,
	type Mood,
} from "../application/messages.ts";
import { GameSession } from "../application/session.ts";
import type { Step, StepEvent } from "../domaine/engine.ts";
import type { LevelSpec } from "../domaine/level.ts";
import type { Atlas } from "./assets.ts";
import { layoutStreet, widestCells } from "./board-layout.ts";
import { BoardView } from "./board-view.ts";
import { BubbleView } from "./bubble-view.ts";
import { CardsView } from "./cards-view.ts";
import { localProgress } from "./progress-store.ts";
import {
	onSoundChange,
	play,
	setSound,
	soundOn,
	type Sound,
} from "./sound-player.ts";

const SOUNDS: Partial<Record<StepEvent, Sound>> = {
	move: "move",
	"turn-left": "turn",
	"turn-right": "turn",
	"pick-up": "pick-up",
	deliver: "deliver",
	jump: "jump",
	"fall-in-pond": "pond",
	"fall-in-hole": "hole",
	"bump-edge": "bump",
	"nothing-to-pick": "bump",
	"nobody-here": "bump",
	"target-missing": "bump",
};

const STEP_MOODS: Partial<Record<StepEvent, Mood>> = {
	deliver: "happy",
	"pick-up": "happy",
	"fall-in-pond": "splash",
	"fall-in-hole": "fall",
	"bump-edge": "bump",
	"nothing-to-pick": "puzzled",
	"nobody-here": "lost",
	"target-missing": "puzzled",
};

const reducedMotion = (): boolean =>
	matchMedia("(prefers-reduced-motion: reduce)").matches;
const wait = (ms: number): Promise<void> =>
	new Promise((resolve) => setTimeout(resolve, reducedMotion() ? 0 : ms));

function button(label: string, className = "tl-btn"): HTMLButtonElement {
	const b = document.createElement("button");
	b.type = "button";
	b.className = className;
	b.textContent = label;
	return b;
}

export class GameView {
	readonly element: HTMLElement;
	private readonly session: GameSession;
	private readonly board: BoardView;
	private readonly bubble = new BubbleView();
	private readonly cards: CardsView;
	private readonly streetButtons: HTMLElement;
	private readonly runButton = button("Exécuter");
	private readonly stepButton = button("Pas à pas");
	private readonly resetButton = button("Mélanger/Recommencer");
	private readonly soundButton = button("", "tl-chip");
	private readonly attempts = document.createElement("span");
	private readonly stars = document.createElement("span");
	private readonly hint = document.createElement("p");
	private animator: Animator | null = null;
	private animating = false;
	private streetState: ("" | "done" | "fail")[];
	private readonly unsubscribeSound: () => void;

	constructor(level: LevelSpec, grids: readonly string[], atlas: Atlas) {
		this.session = new GameSession(level, { store: localProgress });
		const widest = widestCells(grids);
		const layouts = grids.map((grid) => layoutStreet(level.id, grid, widest));
		this.board = new BoardView(atlas, layouts, level.streets);
		this.streetState = level.streets.map(() => "");

		this.element = document.createElement("div");
		this.element.className = "tl-game";

		const head = document.createElement("div");
		head.className = "tl-head";
		const instruction = document.createElement("p");
		instruction.className = "tl-instruction";
		instruction.textContent = level.instruction;
		this.stars.className = "tl-stars";
		head.append(instruction, this.stars);

		const boardBox = document.createElement("section");
		boardBox.className = "tl-board";
		boardBox.setAttribute("aria-label", "Plateau");
		this.streetButtons = document.createElement("div");
		this.streetButtons.className = "tl-streets";
		if (level.streets.length > 1) {
			boardBox.append(this.streetButtons);
		}
		boardBox.append(this.board.canvas);

		this.cards = new CardsView(this.session, () => {
			this.reset(false);
		});

		const controls = document.createElement("div");
		controls.className = "tl-controls";
		this.attempts.className = "tl-attempts";
		this.attempts.setAttribute("aria-live", "polite");
		controls.append(
			this.runButton,
			this.stepButton,
			this.resetButton,
			this.soundButton,
			this.attempts,
		);
		this.hint.className = "tl-hint";
		this.hint.hidden = true;

		this.element.append(
			head,
			boardBox,
			this.bubble.element,
			this.cards.element,
			controls,
			this.hint,
		);

		this.runButton.addEventListener("click", () => {
			void this.play(false);
		});
		this.stepButton.addEventListener("click", () => {
			void this.play(true);
		});
		this.resetButton.addEventListener("click", () => {
			if (!this.animating) {
				this.session.shuffle();
				this.reset(true);
			}
		});
		this.soundButton.addEventListener("click", () => {
			setSound(!soundOn());
			play("deliver");
		});
		this.unsubscribeSound = onSoundChange(() => {
			this.renderSound();
		});
		this.renderSound();
		this.renderStars();
		this.renderStreets();
		this.updateButtons();
	}

	destroy(): void {
		this.animator?.stop();
		this.board.destroy();
		this.cards.destroy();
		this.unsubscribeSound();
	}

	private renderSound(): void {
		const on = soundOn();
		this.soundButton.setAttribute("aria-pressed", String(on));
		this.soundButton.textContent = on ? "Son activé" : "Son coupé";
	}

	private renderStars(): void {
		const stars = this.session.stars;
		this.stars.textContent = "★".repeat(stars) + "☆".repeat(3 - stars);
		this.stars.setAttribute(
			"aria-label",
			stars > 0
				? `${String(stars)} étoile${stars > 1 ? "s" : ""} sur 3`
				: "Pas encore réussi",
		);
	}

	private renderStreets(): void {
		const current = this.board.canvas.dataset.street ?? "0";
		this.streetButtons.replaceChildren(
			...this.streetState.map((state, k) => {
				const b = button(
					`Rue ${String(k + 1)}${state === "done" ? " ✓" : state === "fail" ? " ✗" : ""}`,
					"tl-street",
				);
				b.setAttribute("aria-current", String(String(k) === current));
				b.addEventListener("click", () => {
					if (!this.animating) {
						this.showStreet(k);
					}
				});
				return b;
			}),
		);
	}

	private showStreet(index: number): void {
		this.board.canvas.dataset.street = String(index);
		this.board.show(index);
		this.renderStreets();
	}

	private updateButtons(): void {
		const empty = this.session.program.length === 0;
		this.runButton.disabled = this.animating || empty;
		this.stepButton.disabled = this.animating || empty;
		this.resetButton.disabled = this.animating;
		this.cards.setDisabled(this.animating);
	}

	/**
	 * Remet Théa à son départ, sur la première rue. Avec `bubble`, elle
	 * reprend aussi sa phrase du début (Mélanger/Recommencer).
	 */
	private reset(bubble: boolean): void {
		this.animator?.stop();
		this.animator = null;
		this.session.cancel();
		this.streetState = this.streetState.map(() => "");
		this.showStreet(0);
		this.cards.setCurrent(null);
		this.cards.setFailed(null);
		if (bubble) {
			this.bubble.reset();
		}
		this.updateButtons();
	}

	private async play(stepping: boolean): Promise<void> {
		if (this.animating) {
			return;
		}
		if (this.animator === null) {
			const run = this.session.start();
			if (run === null) {
				return;
			}
			this.streetState = this.streetState.map(() => "");
			this.cards.setFailed(null);
			this.bubble.say("C'est parti.", "neutral", "ready");
			this.animator = new Animator(run, {
				showStreet: async (index) => {
					this.showStreet(index);
					await wait(index === 0 ? 0 : 350);
				},
				playStep: (step) => this.playStep(step),
				streetDone: async (index) => {
					this.streetState[index] = "done";
					this.renderStreets();
					this.bubble.say(
						`Rue ${String(index + 1)} livrée. Rue suivante.`,
						"win",
						"happy",
					);
					await wait(500);
				},
			});
		}
		this.animating = true;
		this.updateButtons();
		const result = await this.animator.play(stepping);
		this.animating = false;
		if (result === "done") {
			this.animator = null;
			this.finish();
		}
		this.updateButtons();
	}

	private async playStep(step: Step): Promise<void> {
		const card = this.session.program[step.cardIndex];
		this.cards.setCurrent(
			step.cardIndex,
			step.jumped && card !== undefined ? card.id : null,
		);
		const sound = SOUNDS[step.event];
		if (sound !== undefined) {
			play(sound);
		}
		const { row, col } = step.thea.position;
		const direction = step.thea.direction;
		this.board.setMood(STEP_MOODS[step.event] ?? null);
		switch (step.event) {
			case "fall-in-pond":
				await this.board.move(row, col, direction);
				this.board.setFx("swim");
				break;
			case "fall-in-hole":
				await this.board.move(row, col, direction);
				await this.board.move(row, col, direction, 0.15);
				break;
			case "bump-edge": {
				const dr =
					direction === "south" ? 0.2 : direction === "north" ? -0.2 : 0;
				const dc = direction === "east" ? 0.2 : direction === "west" ? -0.2 : 0;
				await this.board.move(row + dr, col + dc, direction);
				await this.board.move(row, col, direction);
				break;
			}
			default:
				await this.board.move(row, col, direction);
				this.board.setCells(step.cells);
		}
		const message = stepSays(step, this.session.program);
		if (message !== null) {
			this.bubble.say(message, "neutral", STEP_MOODS[step.event] ?? null);
		}
		await wait(
			step.event === "deliver" || step.event === "pick-up" ? 350 : 110,
		);
		if (STEP_MOODS[step.event] === "happy") {
			this.board.setMood(null);
		}
	}

	private finish(): void {
		const result = this.session.finish();
		if (result === null) {
			return;
		}
		const { outcome, streetIndex } = result;
		const streets = this.session.level.streets.length;
		const mood = moodOf(outcome);
		this.cards.setCurrent(null);
		// Le cœur de la maison livrée suffit : pas d'émotion de plus sur le plateau
		this.board.setMood(outcome.kind === "success" ? null : mood);
		if (outcome.kind === "success") {
			this.streetState[streetIndex] = "done";
			const stars = result.stars ?? 1;
			this.bubble.say(`${theaSays(outcome)} ${"★".repeat(stars)}`, "win", mood);
			play("success");
			this.hint.hidden = true;
			this.renderStars();
		} else {
			this.streetState[streetIndex] = "fail";
			this.bubble.say(theaSays(outcome, streetIndex, streets), "fail", mood);
			play("fail");
			if (result.helped) {
				play("help");
				this.hint.hidden = false;
				const strong = document.createElement("strong");
				strong.textContent = "Relisez la section juste au-dessus. ";
				this.hint.replaceChildren(strong, helpSays(this.session.locked));
				this.cards.render();
			} else {
				this.cards.setFailed(result.failedCard);
			}
		}
		this.attempts.textContent = `Essai${result.attempts > 1 ? "s" : ""} : ${String(result.attempts)}`;
		this.renderStreets();
	}
}
