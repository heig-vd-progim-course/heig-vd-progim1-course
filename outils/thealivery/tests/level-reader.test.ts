// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { readLevel } from "../src/adaptateurs/level-reader.ts";

// Extrait réel du HTML produit par Zensical pour un niveau à deux rues
const HTML = `<div class="thealivery" data-id="essai-06-la-rue-qui-s-allonge">
<p>Le même programme doit livrer les deux rues.</p>
<div class="language-text highlight"><pre><span></span><code><span id="__span-5-1"><a id="__codelineno-5-1" name="__codelineno-5-1" href="#__codelineno-5-1"></a>T&gt; .  .  M
</span></code></pre></div>
<div class="language-text highlight"><pre><span></span><code><span id="__span-6-1"><a id="__codelineno-6-1" name="__codelineno-6-1" href="#__codelineno-6-1"></a>T&gt; .  .  .  .  M
</span></code></pre></div>
<ol>
<li>avancer {#debut}</li>
<li>si-maison -&gt; fin</li>
<li>aller -&gt; debut</li>
<li>livrer {#fin}</li>
</ol>
</div>`;

describe("readLevel", () => {
	it("lit le HTML de Zensical", () => {
		document.body.innerHTML = HTML;
		const element = document.querySelector<HTMLElement>("div.thealivery");
		expect(element).not.toBeNull();
		if (element !== null) {
			expect(readLevel(element)).toEqual({
				id: "essai-06-la-rue-qui-s-allonge",
				instruction: "Le même programme doit livrer les deux rues.",
				grids: ["T> .  .  M\n", "T> .  .  .  .  M\n"],
				cards: [
					"avancer {#debut}",
					"si-maison -> fin",
					"aller -> debut",
					"livrer {#fin}",
				],
			});
		}
	});

	it("rend des listes vides pour un bloc vide", () => {
		document.body.innerHTML = '<div class="thealivery"></div>';
		const element = document.querySelector<HTMLElement>("div.thealivery");
		expect(element === null ? null : readLevel(element)).toEqual({
			id: null,
			instruction: "",
			grids: [],
			cards: [],
		});
	});
});
