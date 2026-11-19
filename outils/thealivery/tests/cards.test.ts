import { describe, expect, it } from "vitest";
import { isJump, parseCard, WORDS } from "../src/domaine/cards.ts";

describe("parseCard", () => {
	it.each(
		Object.entries(WORDS).filter(
			([, type]) => !isJump(type) && type !== "fill" && type !== "add",
		),
	)("lit le mot %s", (word, type) => {
		expect(parseCard(word, 0)).toEqual({
			ok: true,
			card: { id: "@0", type, trap: false },
		});
	});

	it("donne à une carte sans étiquette un identifiant tiré de sa position", () => {
		expect(parseCard("avancer", 3)).toMatchObject({ card: { id: "@3" } });
	});

	it("lit une étiquette {#nom}, qui devient l'identifiant", () => {
		expect(parseCard("avancer {#debut}", 0)).toEqual({
			ok: true,
			card: { id: "debut", type: "move", trap: false },
		});
	});

	it("lit un saut -> nom", () => {
		expect(parseCard("si-maison -> fin", 1)).toEqual({
			ok: true,
			card: { id: "@1", type: "if-house", trap: false, target: "fin" },
		});
		expect(parseCard("aller->debut", 2)).toMatchObject({
			card: { type: "go-to", target: "debut" },
		});
	});

	it("lit un saut qui porte aussi une étiquette", () => {
		expect(parseCard("aller -> debut {#retour}", 2)).toEqual({
			ok: true,
			card: { id: "retour", type: "go-to", trap: false, target: "debut" },
		});
	});

	it("lit une carte piège, avec ou sans espace avant les deux-points", () => {
		expect(parseCard("piège : tourner-gauche", 0)).toMatchObject({
			card: { type: "turn-left", trap: true },
		});
		expect(parseCard("piège: ramasser", 0)).toMatchObject({
			card: { type: "pick-up", trap: true },
		});
	});

	it("ignore les espaces autour de la carte", () => {
		expect(parseCard("  livrer  ", 0)).toMatchObject({
			ok: true,
			card: { type: "deliver" },
		});
	});

	it("refuse un mot inconnu", () => {
		expect(parseCard("sauter", 0)).toEqual({
			ok: false,
			error: { code: "UNKNOWN_CARD", word: "sauter" },
		});
	});

	it("refuse un saut sans carte visée", () => {
		expect(parseCard("aller", 0)).toEqual({
			ok: false,
			error: { code: "MISSING_TARGET", word: "aller" },
		});
	});

	it("refuse une carte visée sur une carte qui n'est pas un saut", () => {
		expect(parseCard("avancer -> fin", 0)).toEqual({
			ok: false,
			error: { code: "UNEXPECTED_TARGET", word: "avancer" },
		});
	});
});

describe("isJump", () => {
	it("reconnaît les deux cartes de saut", () => {
		expect(isJump("go-to")).toBe(true);
		expect(isJump("if-house")).toBe(true);
		expect(isJump("move")).toBe(false);
	});
});
