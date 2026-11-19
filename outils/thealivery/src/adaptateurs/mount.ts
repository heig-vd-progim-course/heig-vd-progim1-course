// Monter un niveau dans la page : le valider, puis afficher le jeu, ou le
// message d'erreur à la place si le niveau est invalide.

import { levelErrorMessage } from "../application/messages.ts";
import { validateLevel, type RawLevel } from "../domaine/validation.ts";
import { loadAtlas } from "./assets.ts";
import { obstacleChooser } from "./board-layout.ts";
import { GameView } from "./game-view.ts";

export interface Mounted {
	destroy(): void;
}

/** Remplace le contenu de `container` par le niveau, ou par ses erreurs. */
export async function mountLevel(
	container: HTMLElement,
	raw: RawLevel,
	usedIds: ReadonlySet<string> = new Set(),
): Promise<Mounted> {
	const id = raw.id ?? "";
	const result = validateLevel(raw, {
		usedIds,
		chooseObstacle: (street, position) =>
			obstacleChooser(id, raw.grids[street] ?? "")(position),
	});
	if (!result.ok) {
		const streets = raw.grids.length;
		const messages = result.errors.map((error) =>
			levelErrorMessage(error, streets),
		);
		const box = document.createElement("div");
		box.className = "tl-invalid";
		box.setAttribute("role", "alert");
		const list = document.createElement("ul");
		list.append(
			...messages.map((message) => {
				const li = document.createElement("li");
				li.textContent = message;
				return li;
			}),
		);
		box.append(list);
		container.replaceChildren(box);
		console.error(
			`Thealivery, niveau ${id || "sans data-id"} :\n${messages.join("\n")}`,
		);
		return { destroy: () => undefined };
	}
	const atlas = await loadAtlas();
	const game = new GameView(result.level, raw.grids, atlas);
	container.replaceChildren(game.element);
	return game;
}
