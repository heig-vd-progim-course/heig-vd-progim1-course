import { describe, expect, it } from "vitest";
import { readMarkdownLevel } from "../src/adaptateurs/markdown-reader.ts";

describe("readMarkdownLevel", () => {
	it("lit un niveau écrit dans son bloc div.thealivery", () => {
		const source = [
			"Un texte avant.",
			'<div class="thealivery" data-id="s07-rue" markdown>',
			"",
			"Le même programme doit livrer",
			"les deux rues.",
			"",
			"```text",
			"T> .  .  M",
			"```",
			"",
			"```text",
			"T> .  .  .  .  M",
			"```",
			"",
			"1. avancer {#debut}",
			"2. si-maison -> fin",
			"3. aller -> debut",
			"4. livrer {#fin}",
			"",
			"</div>",
			"- une liste après le bloc",
		].join("\n");
		expect(readMarkdownLevel(source, "x")).toEqual({
			id: "s07-rue",
			instruction: "Le même programme doit livrer les deux rues.",
			grids: ["T> .  .  M", "T> .  .  .  .  M"],
			cards: [
				"avancer {#debut}",
				"si-maison -> fin",
				"aller -> debut",
				"livrer {#fin}",
			],
		});
	});

	it("lit tout le texte comme un niveau, sans bloc div", () => {
		expect(
			readMarkdownLevel(
				"Livrez.\n\n~~~\nT> M\n~~~\n\n- avancer\n* piège : livrer\n",
				"bac",
			),
		).toEqual({
			id: "bac",
			instruction: "Livrez.",
			grids: ["T> M"],
			cards: ["avancer", "piège : livrer"],
		});
	});

	it("rend un identifiant absent quand le bloc n'a pas de data-id", () => {
		expect(
			readMarkdownLevel(
				'<div class="thealivery" markdown>\n\n- avancer\n</div>',
				"x",
			).id,
		).toBeNull();
	});

	it("ignore une grille dont le bloc n'est pas fermé", () => {
		expect(readMarkdownLevel("```text\nT> M", "x").grids).toEqual([]);
	});
});
