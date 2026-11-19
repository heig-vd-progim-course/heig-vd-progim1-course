// Le plateau : le décor de la rue, dessiné une fois, puis à chaque image Théa,
// les feuilles et les marques des maisons. Le dessin se fait à la taille du
// pack, agrandi d'un facteur entier : le pixel art reste net.

import type { Mood } from "../application/messages.ts";
import type { Cells, Direction, Street, TheaState } from "../domaine/street.ts";
import type { Atlas } from "./assets.ts";
import { CELL, TILE, cellCenter, type StreetLayout } from "./board-layout.ts";

/** Agrandissement du dessin interne ; l'affichage est réglé par le CSS. */
const SCALE = 3;
const STEP_MS = 340;
const COLUMN: Readonly<Record<Direction, number>> = {
	south: 0,
	north: 1,
	west: 2,
	east: 3,
};

const reducedMotion = (): boolean =>
	matchMedia("(prefers-reduced-motion: reduce)").matches;

interface Sprite {
	row: number;
	col: number;
	direction: Direction;
	scale: number;
	walking: boolean;
}

export class BoardView {
	readonly canvas: HTMLCanvasElement;
	private readonly atlas: Atlas;
	private readonly layouts: readonly StreetLayout[];
	private readonly streets: readonly Street[];
	private readonly backgrounds: HTMLCanvasElement[];
	private index = 0;
	private cells: Cells = [];
	private thea: Sprite = {
		row: 0,
		col: 0,
		direction: "east",
		scale: 1,
		walking: false,
	};
	private fx: "swim" | null = null;
	private mood: Mood | null = null;
	private tick = 0;
	private frame = 0;
	private visible = true;
	private readonly observer: IntersectionObserver;

	constructor(
		atlas: Atlas,
		layouts: readonly StreetLayout[],
		streets: readonly Street[],
	) {
		this.atlas = atlas;
		this.layouts = layouts;
		this.streets = streets;
		this.canvas = document.createElement("canvas");
		this.canvas.className = "tl-map";
		this.canvas.setAttribute("role", "img");
		this.backgrounds = layouts.map((layout) => this.paint(layout));
		this.observer = new IntersectionObserver((entries) => {
			this.visible = entries.some((entry) => entry.isIntersecting);
		});
		this.observer.observe(this.canvas);
		this.show(0);
		const loop = (): void => {
			// Page quittée (navigation instantanée) : le plateau s'arrête
			if (!this.canvas.isConnected && this.tick > 60) {
				this.destroy();
				return;
			}
			this.tick += 1;
			if (this.visible) {
				this.draw();
			}
			this.frame = requestAnimationFrame(loop);
		};
		this.frame = requestAnimationFrame(loop);
	}

	destroy(): void {
		cancelAnimationFrame(this.frame);
		this.observer.disconnect();
	}

	/** Le décor fixe d'une rue, peint une fois dans un canevas hors écran. */
	private paint(layout: StreetLayout): HTMLCanvasElement {
		const canvas = document.createElement("canvas");
		canvas.width = layout.width;
		canvas.height = layout.height;
		const ctx = canvas.getContext("2d");
		if (ctx !== null) {
			for (const op of layout.background) {
				this.sprite(ctx, op.sprite, op.x, op.y);
			}
		}
		return canvas;
	}

	private sprite(
		ctx: CanvasRenderingContext2D,
		name: string,
		x: number,
		y: number,
		crop?: readonly [number, number, number, number],
		size?: readonly [number, number],
	): void {
		const box = this.atlas.sprites.get(name);
		if (box === undefined) {
			return;
		}
		const [sx, sy, sw, sh] =
			crop === undefined
				? box
				: [box[0] + crop[0], box[1] + crop[1], crop[2], crop[3]];
		const [dw, dh] = size ?? [sw, sh];
		ctx.drawImage(this.atlas.image, sx, sy, sw, sh, x, y, dw, dh);
	}

	/** Affiche une rue, Théa à son départ. */
	show(index: number): void {
		const street = this.streets[index];
		if (street === undefined) {
			return;
		}
		this.index = index;
		this.cells = street.cells;
		this.fx = null;
		this.mood = null;
		this.setThea(street.start);
		const { position } = street.start;
		this.canvas.setAttribute(
			"aria-label",
			`Rue ${String(index + 1)} : grille de ${String(street.rows)} sur ${String(street.cols)}, ` +
				`Théa ligne ${String(position.row + 1)}, colonne ${String(position.col + 1)}.`,
		);
		this.draw();
	}

	setThea(state: TheaState): void {
		this.thea = {
			row: state.position.row,
			col: state.position.col,
			direction: state.direction,
			scale: 1,
			walking: false,
		};
	}

	setCells(cells: Cells): void {
		this.cells = cells;
	}

	setFx(fx: "swim" | null): void {
		this.fx = fx;
	}

	/** Une émotion au-dessus de la tête de Théa. */
	setMood(mood: Mood | null): void {
		this.mood = mood;
	}

	/** Déplace Théa, en marchant, vers une position (fractionnaire pour un sursaut). */
	move(
		row: number,
		col: number,
		direction: Direction,
		scale = 1,
	): Promise<void> {
		const from = { ...this.thea };
		this.thea.direction = direction;
		const duration = reducedMotion() ? 0 : STEP_MS;
		const t0 = performance.now();
		return new Promise((resolve) => {
			const step = (now: number): void => {
				const k = duration === 0 ? 1 : Math.min(1, (now - t0) / duration);
				this.thea.row = from.row + (row - from.row) * k;
				this.thea.col = from.col + (col - from.col) * k;
				this.thea.scale = from.scale + (scale - from.scale) * k;
				this.thea.walking = k < 1 && (row !== from.row || col !== from.col);
				if (k < 1) {
					requestAnimationFrame(step);
				} else {
					this.thea.walking = false;
					resolve();
				}
			};
			requestAnimationFrame(step);
		});
	}

	private draw(): void {
		const background = this.backgrounds[this.index];
		const ctx = this.canvas.getContext("2d");
		if (background === undefined || ctx === null) {
			return;
		}
		if (this.canvas.width !== background.width * SCALE) {
			this.canvas.width = background.width * SCALE;
			this.canvas.height = background.height * SCALE;
			this.canvas.style.aspectRatio = `${String(background.width)} / ${String(background.height)}`;
			this.canvas.style.setProperty(
				"--tl-map-width",
				`${String(background.width * 2)}px`,
			);
		}
		ctx.imageSmoothingEnabled = false;
		ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0);
		ctx.drawImage(background, 0, 0);

		const half = (CELL * TILE) / 2;
		const bob = Math.round(Math.sin(this.tick / 9) * 1.5);
		this.cells.forEach((line, row) => {
			line.forEach((cell, col) => {
				const { x, y } = cellCenter({ row, col });
				if (cell === "leaves") {
					this.sprite(ctx, "leaf", x - 8, y - 8);
				} else if (cell === "house" || cell === "delivered") {
					const mark = cell === "house" ? "bang" : "heart";
					this.sprite(ctx, mark, x - 7, y - half - 11 + bob);
				}
			});
		});

		// Théa : dans une mare, seulement sa tête et les ondulations
		const t = this.thea;
		const { x, y } = cellCenter({ row: t.row, col: t.col });
		const col = COLUMN[t.direction];
		const frame = t.walking ? Math.floor(this.tick / 6) % 4 : 0;
		if (this.fx === "swim") {
			this.sprite(ctx, "ripples", x - 8, y - 4, [
				(Math.floor(this.tick / 8) % 4) * 16,
				0,
				16,
				16,
			]);
			this.sprite(ctx, "thea", x - 8, y - 7, [0, 0, 16, 9]);
		} else {
			const k = t.scale;
			ctx.globalAlpha = Math.max(0, Math.min(1, k * 1.3));
			this.sprite(
				ctx,
				"thea",
				x - 8 * k,
				y - 8 * k,
				[col * 16, frame * 16, 16, 16],
				[16 * k, 16 * k],
			);
			ctx.globalAlpha = 1;
		}
		if (this.mood !== null) {
			this.sprite(ctx, `mood-${this.mood}`, x - 7, y - 24 + bob);
		}
	}
}
