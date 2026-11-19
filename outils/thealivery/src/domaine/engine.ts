// Le moteur : il exécute un programme sur une rue, carte par carte, avec un
// compteur de programme, et rend la trace complète de l'exécution. Il ne
// connaît ni le temps ni l'affichage : l'animateur rejoue la trace ensuite.

import type { CardSpec, CardType } from "./cards.ts";
import { hasTraps, solutionOf, type LevelSpec } from "./level.ts";
import {
	ahead,
	cellAt,
	count,
	isInside,
	turnLeft,
	turnRight,
	type Cell,
	type Cells,
	type Street,
	type TheaState,
} from "./street.ts";

/** Au-delà, Théa tourne en rond : le programme ne s'arrête jamais. */
export const MAX_STEPS = 100;

export type Program = readonly CardSpec[];

/** Ce qui s'est passé pendant une étape, pour l'animer. */
export type StepEvent =
	| "move"
	| "turn-left"
	| "turn-right"
	| "pick-up"
	| "deliver"
	| "jump"
	| "no-jump"
	| "fall-in-pond"
	| "fall-in-hole"
	| "bump-edge"
	| "nothing-to-pick"
	| "nobody-here"
	| "target-missing";

export interface Step {
	/** La carte exécutée, par sa position dans le programme. */
	readonly cardIndex: number;
	readonly event: StepEvent;
	/** Théa et les cases après la carte. */
	readonly thea: TheaState;
	readonly cells: Cells;
	/** Vrai si la carte suivante n'est pas celle du dessous. */
	readonly jumped: boolean;
}

/** Une carte qui arrête Théa. */
export type CardFailureReason =
	| "FELL_IN_POND"
	| "FELL_IN_HOLE"
	| "LEFT_TOWN"
	| "NOTHING_TO_PICK"
	| "NOBODY_HERE"
	| "TARGET_SET_ASIDE"
	| "LOOPS_FOREVER";

export type FailureReason =
	CardFailureReason | "ROUND_NOT_FINISHED" | "EXTRA_CARD";

export type Outcome =
	| { readonly kind: "success" }
	| {
			readonly kind: "failure";
			readonly reason: CardFailureReason;
			readonly cardIndex: number;
	  }
	| {
			readonly kind: "failure";
			readonly reason: "ROUND_NOT_FINISHED";
			readonly houses: number;
			readonly leaves: number;
	  }
	| { readonly kind: "failure"; readonly reason: "EXTRA_CARD" };

export interface Trace {
	readonly steps: readonly Step[];
	readonly outcome: Outcome;
}

/** Ce que fait une carte : son effet, ou la raison de son échec. */
interface Effect {
	readonly event: StepEvent;
	readonly thea: TheaState;
	readonly cell?: Cell;
	readonly next: number;
	readonly failure?: CardFailureReason;
}

interface Machine {
	readonly street: Street;
	readonly thea: TheaState;
	readonly cells: Cells;
	readonly pc: number;
	readonly card: CardSpec;
	readonly indexOf: (id: string | undefined) => number | undefined;
}

const FALLS: Readonly<Record<string, CardFailureReason | undefined>> = {
	pond: "FELL_IN_POND",
	hole: "FELL_IN_HOLE",
};

/** L'effet de chaque type de carte. Ajouter une carte, c'est ajouter une ligne ici. */
const EFFECTS: Readonly<Record<CardType, (m: Machine) => Effect>> = {
	move: ({ street, thea, cells, pc }) => {
		const position = ahead(thea.position, thea.direction);
		if (!isInside(street, position)) {
			return { event: "bump-edge", thea, next: pc, failure: "LEFT_TOWN" };
		}
		const moved = { ...thea, position };
		const cell = cellAt(cells, position);
		const failure = FALLS[cell];
		if (failure !== undefined) {
			const event = cell === "pond" ? "fall-in-pond" : "fall-in-hole";
			return { event, thea: moved, next: pc, failure };
		}
		return { event: "move", thea: moved, next: pc + 1 };
	},
	"turn-left": ({ thea, pc }) => ({
		event: "turn-left",
		thea: { ...thea, direction: turnLeft(thea.direction) },
		next: pc + 1,
	}),
	"turn-right": ({ thea, pc }) => ({
		event: "turn-right",
		thea: { ...thea, direction: turnRight(thea.direction) },
		next: pc + 1,
	}),
	"pick-up": ({ thea, cells, pc }) =>
		cellAt(cells, thea.position) === "leaves"
			? { event: "pick-up", thea, cell: "free", next: pc + 1 }
			: {
					event: "nothing-to-pick",
					thea,
					next: pc,
					failure: "NOTHING_TO_PICK",
				},
	deliver: ({ thea, cells, pc }) =>
		cellAt(cells, thea.position) === "house"
			? { event: "deliver", thea, cell: "delivered", next: pc + 1 }
			: { event: "nobody-here", thea, next: pc, failure: "NOBODY_HERE" },
	"go-to": ({ thea, pc, card, indexOf }) =>
		jump(thea, pc, indexOf(card.target)),
	"if-house": ({ thea, cells, pc, card, indexOf }) =>
		cellAt(cells, thea.position) === "house"
			? jump(thea, pc, indexOf(card.target))
			: { event: "no-jump", thea, next: pc + 1 },
};

function jump(thea: TheaState, pc: number, target: number | undefined): Effect {
	if (target === undefined) {
		return {
			event: "target-missing",
			thea,
			next: pc,
			failure: "TARGET_SET_ASIDE",
		};
	}
	return { event: "jump", thea, next: target };
}

function withCell(
	cells: Cells,
	thea: TheaState,
	cell: Cell | undefined,
): Cells {
	if (cell === undefined) {
		return cells;
	}
	const { row, col } = thea.position;
	return cells.map((line, r) =>
		r === row ? line.map((c, k) => (k === col ? cell : c)) : line,
	);
}

/** Exécute un programme sur une rue, depuis le départ de Théa. */
export function run(street: Street, program: Program): Trace {
	const positions = new Map(program.map((card, i) => [card.id, i]));
	const indexOf = (id: string | undefined): number | undefined =>
		id === undefined ? undefined : positions.get(id);

	const steps: Step[] = [];
	let thea = street.start;
	let cells = street.cells;
	let pc = 0;

	while (pc < program.length) {
		const card = program[pc];
		if (card === undefined) {
			break;
		}
		if (steps.length >= MAX_STEPS) {
			return {
				steps,
				outcome: { kind: "failure", reason: "LOOPS_FOREVER", cardIndex: pc },
			};
		}
		const effect = EFFECTS[card.type]({
			street,
			thea,
			cells,
			pc,
			card,
			indexOf,
		});
		thea = effect.thea;
		cells = withCell(cells, thea, effect.cell);
		steps.push({
			cardIndex: pc,
			event: effect.event,
			thea,
			cells,
			jumped: effect.failure === undefined && effect.next !== pc + 1,
		});
		if (effect.failure !== undefined) {
			return {
				steps,
				outcome: { kind: "failure", reason: effect.failure, cardIndex: pc },
			};
		}
		pc = effect.next;
	}

	const houses = count(cells, "house");
	const leaves = count(cells, "leaves");
	if (houses > 0 || leaves > 0) {
		return {
			steps,
			outcome: {
				kind: "failure",
				reason: "ROUND_NOT_FINISHED",
				houses,
				leaves,
			},
		};
	}
	return { steps, outcome: { kind: "success" } };
}

export interface LevelRun {
	/** Une trace par rue exécutée : on s'arrête à la première rue ratée. */
	readonly traces: readonly Trace[];
	readonly outcome: Outcome;
	/** La rue qui décide du résultat : la rue ratée, ou la dernière. */
	readonly streetIndex: number;
}

/**
 * Joue un programme sur toutes les rues d'un niveau, puis applique la règle
 * des pièges : s'il y en a, le programme ne doit pas avoir plus de cartes que
 * la solution, même s'il réussit.
 */
export function runLevel(level: LevelSpec, program: Program): LevelRun {
	const traces: Trace[] = [];
	for (const [streetIndex, street] of level.streets.entries()) {
		const trace = run(street, program);
		traces.push(trace);
		if (trace.outcome.kind === "failure") {
			return { traces, outcome: trace.outcome, streetIndex };
		}
	}
	const streetIndex = level.streets.length - 1;
	if (hasTraps(level) && program.length > solutionOf(level).length) {
		return {
			traces,
			outcome: { kind: "failure", reason: "EXTRA_CARD" },
			streetIndex,
		};
	}
	return { traces, outcome: { kind: "success" }, streetIndex };
}
