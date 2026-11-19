// Point d'entrée de docs/javascripts/thealivery.js : trouve les niveaux de la
// page (div.thealivery) et les démarre. Charge le bac à sable seulement sur
// la page qui en contient un.

import { readLevel } from "./adaptateurs/level-reader.ts";
import { scriptUrl } from "./adaptateurs/assets.ts";
import { mountLevel } from "./adaptateurs/mount.ts";

function setupLevels(): void {
	const usedIds = new Set<string>();
	document
		.querySelectorAll<HTMLElement>("div.thealivery")
		.forEach((element) => {
			if (element.dataset.thealiveryReady !== undefined) {
				return;
			}
			element.dataset.thealiveryReady = "";
			const raw = readLevel(element);
			mountLevel(element, raw, new Set(usedIds)).catch((error: unknown) => {
				console.error("Thealivery :", error);
			});
			if (raw.id !== null) {
				usedIds.add(raw.id.trim());
			}
		});
	if (
		document.querySelector(".thealivery-sandbox") !== null &&
		!("TheaSandbox" in window)
	) {
		const script = document.createElement("script");
		script.src = scriptUrl("thealivery-sandbox.js");
		document.head.append(script);
	}
}

declare global {
	interface Window {
		document$?: { subscribe(callback: () => void): void };
	}
}

// Avec la navigation instantanée, `document$` émet à chaque changement de page
if (window.document$ !== undefined) {
	window.document$.subscribe(setupLevels);
} else if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", setupLevels);
} else {
	setupLevels();
}
