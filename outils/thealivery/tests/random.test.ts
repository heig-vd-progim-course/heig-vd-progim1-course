import { describe, expect, it } from "vitest";
import { hash, seededRandom } from "../src/adaptateurs/random.ts";

describe("seededRandom", () => {
	it("donne les mêmes tirages que SeededRandom de generer.py", () => {
		// Valeurs obtenues en exécutant la classe Python avec la graine « abc »
		const rnd = seededRandom("abc");
		expect(rnd.random()).toBeCloseTo(0.516641998896, 12);
		expect(rnd.random()).toBeCloseTo(0.659622129286, 12);
		expect(rnd.random()).toBeCloseTo(0.001879659714, 12);
		expect(rnd.randrange(0, 10)).toBe(8);
		expect(rnd.choice(["a", "b", "c"])).toBe("c");
	});

	it("hache le texte en UTF-8, accents compris", () => {
		expect(seededRandom("Théa").random()).toBeCloseTo(0.128542689141, 12);
		expect(hash("a")).not.toBe(hash("b"));
	});

	it("rend toujours la même suite pour la même graine", () => {
		const a = seededRandom("niveau");
		const b = seededRandom("niveau");
		expect([a.random(), a.random()]).toEqual([b.random(), b.random()]);
	});

	it("refuse de choisir dans une liste vide", () => {
		expect(() => seededRandom("x").choice([])).toThrow();
	});
});
