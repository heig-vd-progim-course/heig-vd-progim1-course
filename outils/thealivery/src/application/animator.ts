// L'animateur rejoue une exécution déjà calculée, étape par étape. Il ne
// décide de rien : il appelle la vue pour chaque étape, et sait s'arrêter
// après une seule (Pas à pas) ou être interrompu.

import type { LevelRun, Step } from "../domaine/engine.ts";

export interface AnimatorView {
	/** Affiche une rue, Théa à son départ. */
	showStreet(index: number): Promise<void>;
	/** Anime une étape : déplacement, chute, message. */
	playStep(step: Step, street: number): Promise<void>;
	/** Une rue réussie, et il en reste d'autres. */
	streetDone(index: number): Promise<void>;
}

export type PlayResult = "paused" | "done" | "stopped";

export class Animator {
	private street = 0;
	private next = 0;
	private shown = -1;
	private stopped = false;
	private busy = false;
	private readonly run: LevelRun;
	private readonly view: AnimatorView;

	constructor(run: LevelRun, view: AnimatorView) {
		this.run = run;
		this.view = view;
	}

	get playing(): boolean {
		return this.busy;
	}

	private isStopped(): boolean {
		return this.stopped;
	}

	/** Interrompt l'animation au plus tôt, sans rien jouer de plus. */
	stop(): void {
		this.stopped = true;
	}

	/**
	 * Joue jusqu'à la fin, ou une seule étape si `stepping`. Rend « done »
	 * quand toute la trace a été jouée.
	 */
	async play(stepping = false): Promise<PlayResult> {
		if (this.busy) {
			return "paused";
		}
		this.busy = true;
		try {
			return await this.loop(stepping);
		} finally {
			this.busy = false;
		}
	}

	private async loop(stepping: boolean): Promise<PlayResult> {
		const { traces } = this.run;
		while (this.street < traces.length) {
			const trace = traces[this.street];
			if (trace === undefined || this.stopped) {
				break;
			}
			if (this.shown !== this.street) {
				this.shown = this.street;
				await this.view.showStreet(this.street);
			}
			const step = trace.steps[this.next];
			if (step !== undefined) {
				await this.view.playStep(step, this.street);
				this.next += 1;
				if (this.isStopped()) {
					return "stopped";
				}
				const more =
					this.next < trace.steps.length || this.street < traces.length - 1;
				if (stepping && more) {
					await this.endOfStreet(trace.steps.length);
					return "paused";
				}
				continue;
			}
			if (
				this.street === traces.length - 1 ||
				trace.outcome.kind === "failure"
			) {
				break;
			}
			await this.endOfStreet(trace.steps.length);
		}
		return this.stopped ? "stopped" : "done";
	}

	/** Passe à la rue suivante quand la rue courante est jouée et réussie. */
	private async endOfStreet(length: number): Promise<void> {
		const trace = this.run.traces[this.street];
		const last = this.street === this.run.traces.length - 1;
		if (this.next >= length && trace?.outcome.kind === "success" && !last) {
			await this.view.streetDone(this.street);
			this.street += 1;
			this.next = 0;
		}
	}
}
