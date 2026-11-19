// Où trouver les images et les sons : à côté du script, dans
// docs/vendor/thealivery/. L'atlas n'est chargé qu'une fois par page.

const SCRIPT_URL =
	document.currentScript instanceof HTMLScriptElement
		? document.currentScript.src
		: location.href;

/** L'adresse d'un fichier de docs/vendor/thealivery/. */
export function vendorUrl(path: string): string {
	return new URL(`../vendor/thealivery/${path}`, SCRIPT_URL).href;
}

/** L'adresse d'un script voisin, dans docs/javascripts/. */
export function scriptUrl(name: string): string {
	return new URL(name, SCRIPT_URL).href;
}

export interface Atlas {
	readonly image: HTMLImageElement;
	readonly sprites: ReadonlyMap<
		string,
		readonly [number, number, number, number]
	>;
}

let atlas: Promise<Atlas> | null = null;

export function loadAtlas(): Promise<Atlas> {
	atlas ??= (async () => {
		const image = new Image();
		image.src = vendorUrl("atlas.png");
		const [response] = await Promise.all([
			fetch(vendorUrl("atlas.json")),
			image.decode(),
		]);
		const data = (await response.json()) as {
			sprites: Record<string, [number, number, number, number]>;
		};
		return { image, sprites: new Map(Object.entries(data.sprites)) };
	})();
	return atlas;
}
