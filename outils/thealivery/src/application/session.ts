// Une partie : l'ordre des cartes, les essais, l'aide et les étoiles. La
// session est une petite machine à états : elle refuse toute action qui n'a
// pas de sens dans l'état courant (déplacer une carte pendant l'exécution, par
// exemple). Elle ne connaît ni le DOM ni le canevas.

import { isHeader, type CardSpec } from "../domaine/cards.ts";
import { runLevel, type LevelRun, type Outcome } from "../domaine/engine.ts";
import { solutionOf, type LevelSpec } from "../domaine/level.ts";
import { cardCount, homeZones, zonesOf } from "../domaine/program.ts";

export type Zone = "program" | "aside";
export type SessionState = "preparation" | "running";

/** Où la progression est mémorisée : localStorage dans le navigateur. */
export interface ProgressStore {
	getStars(levelId: string): number;
	setStars(levelId: string, stars: number): void;
}

export interface Finish {
	readonly outcome: Outcome;
	readonly streetIndex: number;
	readonly attempts: number;
	/** Les étoiles gagnées, s'il y a réussite. */
	readonly stars: number | null;
	/** Vrai si l'aide vient de verrouiller une carte de plus. */
	readonly helped: boolean;
	/** La carte fautive, par sa position dans la tournée. */
	readonly failedCard: number | null;
}

/** Au-delà de ce nombre d'essais ratés, l'aide place une carte par échec. */
export const HELP_AFTER = 3;

export function starsFor(attempts: number, helped: boolean): number {
	if (attempts === 1) {
		return 3;
	}
	return attempts <= HELP_AFTER && !helped ? 2 : 1;
}

/**
 * Mélange les cartes (Fisher-Yates), en évitant de rendre l'ordre de la
 * solution : un niveau ne doit jamais commencer résolu.
 */
export function shuffleApart(
	cards: readonly CardSpec[],
	solution: readonly CardSpec[],
	random: () => number,
): CardSpec[] {
	const types = (list: readonly CardSpec[]): string =>
		list.map((c) => c.type).join();
	for (let attempt = 0; attempt < 20; attempt += 1) {
		const shuffled = [...cards];
		for (let i = shuffled.length - 1; i > 0; i -= 1) {
			const j = Math.floor(random() * (i + 1));
			[shuffled[i], shuffled[j]] = [
				shuffled[j] as CardSpec,
				shuffled[i] as CardSpec,
			];
		}
		if (shuffled.length < 2 || types(shuffled) !== types(solution)) {
			return shuffled;
		}
	}
	return [...cards].reverse();
}

export class GameSession {
	readonly level: LevelSpec;
	private readonly solution: readonly CardSpec[];
	private readonly random: () => number;
	private readonly store: ProgressStore | null;
	/** La zone de chaque carte : 0 pour le programme principal. */
	private readonly homes: ReadonlyMap<string, number>;
	/** L'en-tête de chaque zone, null pour le programme principal. */
	private readonly headers: readonly (CardSpec | null)[];
	private listeners: (() => void)[] = [];

	/** La tournée : programme principal, puis chaque routine avec son en-tête. */
	private _program: CardSpec[] = [];
	private _aside: CardSpec[] = [];
	private _state: SessionState = "preparation";
	private _attempts = 0;
	/** Les cartes placées et verrouillées par l'aide, en tête de leur zone. */
	private _locked = new Set<string>();
	private lastRun: LevelRun | null = null;

	constructor(
		level: LevelSpec,
		options: { random?: () => number; store?: ProgressStore } = {},
	) {
		this.level = level;
		this.solution = solutionOf(level);
		this.random = options.random ?? Math.random;
		this.store = options.store ?? null;
		this.homes = homeZones(level.cards);
		this.headers = zonesOf(level.cards).map((zone) => zone.header);
		this.assemble(
			this.headers.map((_header, z) =>
				shuffleApart(
					this.inZone(level.cards, z),
					this.inZone(this.solution, z),
					this.random,
				),
			),
		);
	}

	get program(): readonly CardSpec[] {
		return this._program;
	}
	get aside(): readonly CardSpec[] {
		return this._aside;
	}
	get state(): SessionState {
		return this._state;
	}
	get attempts(): number {
		return this._attempts;
	}
	get locked(): number {
		return this._locked.size;
	}
	get stars(): number {
		return this.store?.getStars(this.level.id) ?? 0;
	}

	/** Une carte qu'on ne déplace pas : placée par l'aide, ou un en-tête. */
	isLocked(id: string): boolean {
		return (
			this._locked.has(id) ||
			this._program.some((card) => card.id === id && isHeader(card))
		);
	}

	/** La zone d'une carte : 0 pour le programme principal, puis une par routine. */
	zoneOf(id: string): number {
		return this.homes.get(id) ?? 0;
	}

	subscribe(listener: () => void): () => void {
		this.listeners.push(listener);
		return () => {
			this.listeners = this.listeners.filter((l) => l !== listener);
		};
	}

	private changed(): void {
		this.listeners.forEach((listener) => {
			listener();
		});
	}

	/** Les cartes d'une zone, en-têtes exclus, dans l'ordre de la liste. */
	private inZone(list: readonly CardSpec[], zone: number): CardSpec[] {
		return list.filter((c) => !isHeader(c) && this.zoneOf(c.id) === zone);
	}

	/** Recompose la tournée à partir des cartes de chaque zone. */
	private assemble(bodies: readonly (readonly CardSpec[])[]): void {
		this._program = bodies.flatMap((body, z) => {
			const header = this.headers[z] ?? null;
			return header === null ? [...body] : [header, ...body];
		});
	}

	/**
	 * Déplace une carte vers une zone, à une position dans la tournée. Une
	 * carte reste dans sa routine ou dans le programme principal ; une carte
	 * verrouillée ne bouge pas, et rien ne se glisse au-dessus des cartes
	 * verrouillées.
	 */
	move(id: string, zone: Zone, index: number): boolean {
		if (this._state !== "preparation" || this.isLocked(id)) {
			return false;
		}
		const fromProgram = this._program.findIndex((c) => c.id === id);
		const fromAside = this._aside.findIndex((c) => c.id === id);
		const source = fromProgram >= 0 ? this._program : this._aside;
		const from = fromProgram >= 0 ? fromProgram : fromAside;
		const card = source[from];
		if (card === undefined) {
			return false;
		}
		source.splice(from, 1);
		const target = zone === "program" ? this._program : this._aside;
		let to = source === target && index > from ? index - 1 : index;
		if (zone === "program") {
			const home = this.zoneOf(id);
			const bounds = zonesOf(this._program)[home];
			const start = bounds?.start ?? 0;
			const floor =
				start +
				this.inZone(this._program, home).filter((c) => this._locked.has(c.id))
					.length;
			to = Math.max(floor, Math.min(to, bounds?.end ?? target.length));
		} else {
			to = Math.max(0, Math.min(to, target.length));
		}
		target.splice(to, 0, card);
		this.changed();
		return true;
	}

	/** Mélanger/Recommencer : dans chaque zone, les cartes libres mélangées. */
	shuffle(): void {
		if (this._state !== "preparation") {
			return;
		}
		const all = [...this._program, ...this._aside];
		this.assemble(
			this.headers.map((_header, z) => {
				const cards = this.inZone(all, z);
				const locked = this.inZone(this._program, z).filter((c) =>
					this._locked.has(c.id),
				);
				const free = cards.filter((c) => !this._locked.has(c.id));
				const rest = this.inZone(this.solution, z).filter(
					(c) => !this._locked.has(c.id),
				);
				return [...locked, ...shuffleApart(free, rest, this.random)];
			}),
		);
		this._aside = [];
		this.changed();
	}

	/** Exécuter : calcule toute l'exécution d'un coup, que la vue animera. */
	start(): LevelRun | null {
		if (this._state !== "preparation" || cardCount(this._program) === 0) {
			return null;
		}
		this._state = "running";
		this.lastRun = runLevel(this.level, this._program);
		this.changed();
		return this.lastRun;
	}

	/** La tournée est modifiée pendant une pause : l'essai ne compte pas. */
	cancel(): void {
		if (this._state === "running") {
			this._state = "preparation";
			this.lastRun = null;
			this.changed();
		}
	}

	/** Fin de l'animation : l'essai est compté, l'aide et les étoiles suivent. */
	finish(): Finish | null {
		const run = this.lastRun;
		if (this._state !== "running" || run === null) {
			return null;
		}
		this._state = "preparation";
		this.lastRun = null;
		this._attempts += 1;
		const { outcome, streetIndex } = run;

		if (outcome.kind === "success") {
			const stars = starsFor(this._attempts, this._locked.size > 0);
			if (this.store !== null && stars > this.store.getStars(this.level.id)) {
				this.store.setStars(this.level.id, stars);
			}
			this.changed();
			return {
				outcome,
				streetIndex,
				attempts: this._attempts,
				stars,
				helped: false,
				failedCard: null,
			};
		}

		const failedCard = "cardIndex" in outcome ? outcome.cardIndex : null;
		const helped = this._attempts >= HELP_AFTER && this.help();
		this.changed();
		return {
			outcome,
			streetIndex,
			attempts: this._attempts,
			stars: null,
			helped,
			failedCard,
		};
	}

	/**
	 * Verrouille les k premières cartes de la solution, en-têtes exclus.
	 * Chacune va en tête de sa zone, dans l'ordre de la solution.
	 */
	private help(): boolean {
		const cards = this.solution.filter((c) => !isHeader(c));
		const k = Math.min(this._attempts - (HELP_AFTER - 1), cards.length);
		if (k <= this._locked.size) {
			return false;
		}
		const placed = new Set(cards.slice(0, k).map((c) => c.id));
		this._locked = placed;
		this.assemble(
			this.headers.map((_header, z) => [
				...this.inZone(this.solution, z).filter((c) => placed.has(c.id)),
				...this.inZone(this._program, z).filter((c) => !placed.has(c.id)),
			]),
		);
		this._aside = this._aside.filter((c) => !placed.has(c.id));
		return true;
	}
}
