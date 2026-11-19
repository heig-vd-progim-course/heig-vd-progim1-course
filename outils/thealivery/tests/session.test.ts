import { describe, expect, it } from "vitest";
import {
	GameSession,
	shuffleApart,
	starsFor,
	type ProgressStore,
} from "../src/application/session.ts";
import type { LevelSpec } from "../src/domaine/level.ts";
import { validateLevel } from "../src/domaine/validation.ts";
import { LEVELS } from "./helpers.ts";

function level(index: number): LevelSpec {
	const raw = LEVELS[index];
	if (raw === undefined) {
		throw new Error("niveau absent");
	}
	const result = validateLevel({ ...raw, instruction: "" });
	if (!result.ok) {
		throw new Error(JSON.stringify(result.errors));
	}
	return result.level;
}

function memoryStore(): ProgressStore & { saved: Map<string, number> } {
	const saved = new Map<string, number>();
	return {
		saved,
		getStars: (id) => saved.get(id) ?? 0,
		setStars: (id, stars) => saved.set(id, stars),
	};
}

/** Remet la tournée dans l'ordre de la solution, pièges de côté. */
function solve(session: GameSession): void {
	session.level.cards.forEach((card, k) => {
		if (card.trap) {
			session.move(card.id, "aside", 0);
		} else {
			session.move(card.id, "program", k);
		}
	});
}

/** Une tournée qui échoue : Théa livre là où personne n'attend. */
function fail(session: GameSession): void {
	const deliver = session.program.find(
		(c) => c.type === "deliver" && !session.isLocked(c.id),
	);
	if (deliver !== undefined) {
		session.move(deliver.id, "program", session.locked);
	}
}

describe("starsFor", () => {
	it("donne 3 étoiles du premier coup, 2 en trois essais sans aide, sinon 1", () => {
		expect(starsFor(1, false)).toBe(3);
		expect(starsFor(3, false)).toBe(2);
		expect(starsFor(3, true)).toBe(1);
		expect(starsFor(4, false)).toBe(1);
	});
});

describe("shuffleApart", () => {
	it("ne rend jamais l'ordre de la solution", () => {
		const cards = level(1).cards;
		for (let seed = 0; seed < 50; seed += 1) {
			let x = seed;
			const random = (): number => (x = (x * 9301 + 49297) % 233280) / 233280;
			const types = shuffleApart(cards, cards, random)
				.map((c) => c.type)
				.join();
			expect(types).not.toBe(cards.map((c) => c.type).join());
		}
	});

	it("rend l'ordre inverse si le hasard s'obstine", () => {
		const cards = level(0).cards;
		expect(shuffleApart(cards, cards, () => 0.999).map((c) => c.id)).toEqual(
			[...cards].reverse().map((c) => c.id),
		);
	});

	it("garde une liste d'une seule carte", () => {
		const one = level(0).cards.slice(0, 1);
		expect(shuffleApart(one, one, Math.random)).toEqual(one);
	});
});

describe("GameSession", () => {
	it("commence mélangée, sans rien de côté, en préparation", () => {
		const session = new GameSession(level(3));
		expect(session.program).toHaveLength(11);
		expect(session.aside).toHaveLength(0);
		expect(session.state).toBe("preparation");
	});

	it("réussit du premier coup : 3 étoiles mémorisées", () => {
		const store = memoryStore();
		const session = new GameSession(level(3), { store });
		solve(session);
		expect(session.start()?.outcome).toEqual({ kind: "success" });
		expect(session.state).toBe("running");
		expect(session.finish()).toMatchObject({
			stars: 3,
			attempts: 1,
			helped: false,
		});
		expect(store.saved.get("s01-deux-maisons")).toBe(3);
		expect(session.stars).toBe(3);
	});

	it("garde la meilleure note", () => {
		const store = memoryStore();
		store.setStars("s01-premiere-livraison", 3);
		const session = new GameSession(level(0), { store });
		fail(session);
		session.start();
		session.finish();
		solve(session);
		session.start();
		expect(session.finish()?.stars).toBe(2);
		expect(store.saved.get("s01-premiere-livraison")).toBe(3);
	});

	it("désigne la carte fautive d'un échec", () => {
		const session = new GameSession(level(1));
		fail(session);
		session.start();
		expect(session.finish()).toMatchObject({
			failedCard: 0,
			stars: null,
			helped: false,
		});
	});

	it("US-10 : après le troisième échec, une carte est placée et verrouillée", () => {
		const session = new GameSession(level(1));
		for (let n = 0; n < 2; n += 1) {
			fail(session);
			session.start();
			expect(session.finish()?.helped).toBe(false);
		}
		fail(session);
		session.start();
		expect(session.finish()).toMatchObject({ helped: true, attempts: 3 });
		expect(session.locked).toBe(1);
		const first = session.program[0];
		expect(first?.id).toBe("@0");
		expect(session.isLocked("@0")).toBe(true);
		expect(session.move("@0", "program", 3)).toBe(false);
	});

	it("ajoute une carte verrouillée à chaque nouvel échec", () => {
		const session = new GameSession(level(1));
		for (let n = 0; n < 4; n += 1) {
			fail(session);
			session.start();
			session.finish();
		}
		expect(session.locked).toBe(2);
		expect(session.program.slice(0, 2).map((c) => c.id)).toEqual(["@0", "@1"]);
	});

	it("ne glisse rien au-dessus des cartes verrouillées", () => {
		const session = new GameSession(level(1));
		for (let n = 0; n < 3; n += 1) {
			fail(session);
			session.start();
			session.finish();
		}
		const free = session.program[3];
		expect(
			free === undefined ? false : session.move(free.id, "program", 0),
		).toBe(true);
		expect(session.program[1]?.id).toBe(free?.id);
	});

	it("1 étoile après l'aide", () => {
		const session = new GameSession(level(1));
		for (let n = 0; n < 3; n += 1) {
			fail(session);
			session.start();
			session.finish();
		}
		solve(session);
		session.start();
		expect(session.finish()?.stars).toBe(1);
	});

	it("met une carte de côté et l'en sort", () => {
		const session = new GameSession(level(3));
		expect(session.move("@10", "aside", 0)).toBe(true);
		expect(session.aside.map((c) => c.id)).toEqual(["@10"]);
		expect(session.move("@10", "program", 99)).toBe(true);
		expect(session.program.at(-1)?.id).toBe("@10");
		expect(session.move("inconnue", "program", 0)).toBe(false);
	});

	it("déplace une carte vers le bas de la même liste", () => {
		const session = new GameSession(level(0), { random: () => 0.999 });
		const ids = session.program.map((c) => c.id);
		session.move(ids[0] ?? "", "program", 2);
		expect(session.program.map((c) => c.id)).toEqual([
			ids[1],
			ids[0],
			ids[2],
			ids[3],
		]);
	});

	it("Mélanger/Recommencer : tout revient dans la tournée, les cartes verrouillées en tête", () => {
		const session = new GameSession(level(3));
		session.move("@10", "aside", 0);
		session.shuffle();
		expect(session.aside).toHaveLength(0);
		expect(session.program).toHaveLength(11);
	});

	it("refuse les actions impossibles pendant l'exécution", () => {
		const session = new GameSession(level(0));
		session.start();
		expect(session.move("@0", "aside", 0)).toBe(false);
		expect(session.start()).toBeNull();
		const before = session.program.map((c) => c.id);
		session.shuffle();
		expect(session.program.map((c) => c.id)).toEqual(before);
	});

	it("une exécution annulée ne compte pas comme un essai", () => {
		const session = new GameSession(level(0));
		session.start();
		session.cancel();
		expect(session.state).toBe("preparation");
		expect(session.attempts).toBe(0);
		expect(session.finish()).toBeNull();
		session.cancel();
		expect(session.state).toBe("preparation");
	});

	it("n'exécute pas une tournée vide", () => {
		const session = new GameSession(level(3));
		for (const card of [...session.program]) {
			session.move(card.id, "aside", 0);
		}
		expect(session.start()).toBeNull();
	});

	it("prévient ses abonnés à chaque changement", () => {
		const session = new GameSession(level(0));
		let calls = 0;
		const unsubscribe = session.subscribe(() => (calls += 1));
		session.shuffle();
		session.start();
		session.finish();
		unsubscribe();
		session.shuffle();
		expect(calls).toBe(3);
	});
});
