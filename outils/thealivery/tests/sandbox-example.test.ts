import { describe, expect, it } from "vitest";
import { readMarkdownLevel } from "../src/adaptateurs/markdown-reader.ts";
import { validateLevel } from "../src/domaine/validation.ts";
import { EXAMPLE } from "../src/sandbox-example.ts";

describe("l'exemple du bac à sable", () => {
	const raw = readMarkdownLevel(EXAMPLE, "x");

	it("est un niveau valide, que sa solution réussit", () => {
		const result = validateLevel(raw);
		expect(result.ok).toBe(true);
	});

	it("montre une boucle, une condition et un piège sur plusieurs rues", () => {
		const result = validateLevel(raw);
		const types = result.ok ? result.level.cards.map((c) => c.type) : [];
		expect(types).toContain("go-to");
		expect(types).toContain("if-house");
		expect(result.ok && result.level.cards.some((c) => c.trap)).toBe(true);
		expect(raw.grids.length).toBeGreaterThan(1);
	});
});
