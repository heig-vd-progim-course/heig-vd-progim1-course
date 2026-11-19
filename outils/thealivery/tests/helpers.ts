// Outils partagés par les tests : écrire une rue ou un programme comme dans un
// niveau, en une ligne.

import { parseCard, type CardSpec } from "../src/domaine/cards.ts";
import {
	parseStreet,
	type ObstacleChooser,
	type Street,
} from "../src/domaine/street.ts";

export function street(text: string, chooseObstacle?: ObstacleChooser): Street {
	const parsed = parseStreet(text, chooseObstacle);
	if (!parsed.ok) {
		throw new Error(`Grille invalide : ${JSON.stringify(parsed.errors)}`);
	}
	return parsed.street;
}

export function program(...lines: string[]): CardSpec[] {
	return lines.map((line, index) => {
		const parsed = parseCard(line, index);
		if (!parsed.ok) {
			throw new Error(`Carte invalide : ${line}`);
		}
		return parsed.card;
	});
}

/** Les six niveaux de la maquette v3, avec la solution écrite par l'enseignant. */
export const LEVELS = [
	{
		id: "s01-premiere-livraison",
		grids: ["T> . . M"],
		cards: ["avancer", "avancer", "avancer", "livrer"],
	},
	{
		id: "s01-coin-de-la-rue",
		grids: ["T> . .\n. . .\n. . M"],
		cards: [
			"avancer",
			"avancer",
			"tourner-droite",
			"avancer",
			"avancer",
			"livrer",
		],
	},
	{
		id: "s01-attention-aux-flaques",
		grids: ["T> . . .\n~ ~ . ~\n. . . M"],
		cards: [
			"avancer",
			"avancer",
			"tourner-droite",
			"avancer",
			"avancer",
			"tourner-gauche",
			"avancer",
			"livrer",
		],
	},
	{
		id: "s01-deux-maisons",
		grids: ["T> . M\n~ ~ .\nM . ."],
		cards: [
			"avancer",
			"avancer",
			"livrer",
			"tourner-droite",
			"avancer",
			"avancer",
			"tourner-droite",
			"avancer",
			"avancer",
			"livrer",
			"piège : tourner-gauche",
		],
	},
	{
		id: "s01-les-feuilles",
		grids: ["Tv ~ M\n. ~ .\nf . ."],
		cards: [
			"avancer",
			"avancer",
			"ramasser",
			"tourner-gauche",
			"avancer",
			"avancer",
			"tourner-gauche",
			"avancer",
			"avancer",
			"livrer",
			"piège : tourner-droite",
		],
	},
	{
		id: "s07-la-rue-qui-s-allonge",
		grids: ["T> . . M", "T> . . . . M"],
		cards: [
			"avancer {#debut}",
			"si-maison -> fin",
			"aller -> debut",
			"livrer {#fin}",
		],
	},
] as const;
