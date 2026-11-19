import { describe, expect, it } from "vitest";
import { Animator, type AnimatorView } from "../src/application/animator.ts";
import { runLevel } from "../src/domaine/engine.ts";
import { solutionOf, type LevelSpec } from "../src/domaine/level.ts";
import { validateLevel } from "../src/domaine/validation.ts";
import { LEVELS, program } from "./helpers.ts";

function level(index: number): LevelSpec {
	const raw = LEVELS[index];
	const result =
		raw === undefined ? null : validateLevel({ ...raw, instruction: "" });
	if (result === null || !result.ok) {
		throw new Error("niveau invalide");
	}
	return result.level;
}

function recorder(): AnimatorView & { log: string[] } {
	const log: string[] = [];
	return {
		log,
		showStreet: (i) => {
			log.push(`rue ${String(i)}`);
			return Promise.resolve();
		},
		playStep: (step, street) => {
			log.push(`${String(street)}:${String(step.cardIndex)}`);
			return Promise.resolve();
		},
		streetDone: (i) => {
			log.push(`fin ${String(i)}`);
			return Promise.resolve();
		},
	};
}

describe("Animator", () => {
	it("joue toutes les étapes d'une rue, dans l'ordre", async () => {
		const spec = level(0);
		const view = recorder();
		const result = await new Animator(
			runLevel(spec, solutionOf(spec)),
			view,
		).play();
		expect(result).toBe("done");
		expect(view.log).toEqual(["rue 0", "0:0", "0:1", "0:2", "0:3"]);
	});

	it("enchaîne les rues d'un niveau, avec un message entre les deux", async () => {
		const spec = level(5);
		const view = recorder();
		await new Animator(runLevel(spec, solutionOf(spec)), view).play();
		expect(view.log.filter((l) => !l.includes(":"))).toEqual([
			"rue 0",
			"fin 0",
			"rue 1",
		]);
	});

	it("Pas à pas : une étape, puis une pause", async () => {
		const spec = level(0);
		const view = recorder();
		const animator = new Animator(runLevel(spec, solutionOf(spec)), view);
		expect(await animator.play(true)).toBe("paused");
		expect(view.log).toEqual(["rue 0", "0:0"]);
		expect(await animator.play(false)).toBe("done");
		expect(view.log).toHaveLength(5);
	});

	it("Pas à pas : la dernière étape d'une rue mène à la suivante", async () => {
		const spec = level(5);
		const view = recorder();
		const animator = new Animator(runLevel(spec, solutionOf(spec)), view);
		let result = await animator.play(true);
		while (result === "paused") {
			result = await animator.play(true);
		}
		expect(result).toBe("done");
		expect(view.log).toContain("fin 0");
		expect(view.log.at(-1)).toBe("1:3");
	});

	it("s'arrête à la rue ratée", async () => {
		const spec = level(5);
		const view = recorder();
		await new Animator(
			runLevel(spec, program("avancer", "avancer", "avancer", "livrer")),
			view,
		).play();
		expect(view.log.at(-1)).toBe("1:3");
		expect(view.log).toContain("fin 0");
	});

	it("s'interrompt sur demande", async () => {
		const spec = level(0);
		const view = recorder();
		const animator = new Animator(runLevel(spec, solutionOf(spec)), view);
		view.playStep = () => {
			animator.stop();
			return Promise.resolve();
		};
		expect(await animator.play()).toBe("stopped");
		expect(await animator.play()).toBe("stopped");
	});

	it("ignore un second play pendant qu'il joue", async () => {
		const spec = level(0);
		const animator = new Animator(runLevel(spec, solutionOf(spec)), recorder());
		const first = animator.play();
		expect(animator.playing).toBe(true);
		expect(await animator.play()).toBe("paused");
		expect(await first).toBe("done");
	});
});
