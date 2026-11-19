// La tournée de Théa : les cartes numérotées, la zone « Mise de côté », les
// flèches des sauts. On déplace une carte par sa poignée (souris, doigt) ou au
// clavier. Indépendant de parsons.js (voir l'ADR 0010).

import type { GameSession, Zone } from "../application/session.ts";
import { isJump, type CardSpec, type CardType } from "../domaine/cards.ts";
import { vendorUrl } from "./assets.ts";

interface CardLook {
	readonly icon: string;
	readonly width: number;
	readonly height: number;
	readonly text: (target: string) => string;
}

/** L'icône (taille d'affichage en pixels) et la phrase de chaque carte. */
const LOOKS: Readonly<Record<CardType, CardLook>> = {
	move: { icon: "avancer", width: 26, height: 26, text: () => "Avancer" },
	"turn-left": {
		icon: "tourner-gauche",
		width: 26,
		height: 26,
		text: () => "Tourner à gauche",
	},
	"turn-right": {
		icon: "tourner-droite",
		width: 26,
		height: 26,
		text: () => "Tourner à droite",
	},
	"pick-up": {
		icon: "ramasser",
		width: 36,
		height: 36,
		text: () => "Ramasser les feuilles",
	},
	deliver: {
		icon: "livrer",
		width: 36,
		height: 27,
		text: () => "Livrer le thé",
	},
	"go-to": {
		icon: "aller",
		width: 32,
		height: 32,
		text: (n) => `Aller à ${n}`,
	},
	"if-house": {
		icon: "si",
		width: 28,
		height: 26,
		text: (n) => `Si une maison attend ici, aller à ${n}`,
	},
};

const GRIP =
	'<svg viewBox="0 0 10 16" aria-hidden="true"><g fill="currentColor"><circle cx="3" cy="3" r="1.4"/><circle cx="7" cy="3" r="1.4"/><circle cx="3" cy="8" r="1.4"/><circle cx="7" cy="8" r="1.4"/><circle cx="3" cy="13" r="1.4"/><circle cx="7" cy="13" r="1.4"/></g></svg>';
const SVG = "http://www.w3.org/2000/svg";

function el<K extends keyof HTMLElementTagNameMap>(
	tag: K,
	className: string,
	text?: string,
): HTMLElementTagNameMap[K] {
	const node = document.createElement(tag);
	node.className = className;
	if (text !== undefined) {
		node.textContent = text;
	}
	return node;
}

interface Drag {
	id: string;
	startX: number;
	startY: number;
	dx: number;
	dy: number;
	moved: boolean;
	ghost: HTMLElement | null;
	mark: HTMLElement | null;
	target: { zone: Zone; index: number } | null;
}

export class CardsView {
	readonly element: HTMLElement;
	private readonly session: GameSession;
	private readonly program: HTMLOListElement;
	private readonly aside: HTMLOListElement | null;
	private readonly arrows: SVGSVGElement | null;
	private readonly count: HTMLElement;
	private readonly onMove: () => void;
	private readonly jumpIds: readonly string[];
	private disabled = false;
	private current: number | null = null;
	private failed: number | null = null;
	private activeJump: string | null = null;
	private drag: Drag | null = null;
	private readonly resize: ResizeObserver;

	constructor(session: GameSession, onMove: () => void) {
		this.session = session;
		this.onMove = onMove;
		const cards = session.level.cards;
		this.jumpIds = cards.filter((c) => isJump(c.type)).map((c) => c.id);
		const hasJumps = this.jumpIds.length > 0;
		const hasTraps = cards.some((c) => c.trap);

		this.element = el("div", "tl-zones");
		const zone = el("section", "tl-zone");
		const head = el("h3", "tl-zone-head");
		head.append(el("span", "", "Tournée de Théa"));
		this.count = el("span", "tl-count");
		head.append(this.count);
		this.program = el("ol", "tl-cards");
		this.program.dataset.zone = "program";
		this.program.dataset.empty = "Glissez des cartes ici.";
		this.program.setAttribute("aria-label", "Tournée de Théa");
		const wrap = el("div", hasJumps ? "tl-listwrap" : "tl-listwrap tl-nojumps");
		this.arrows = hasJumps ? document.createElementNS(SVG, "svg") : null;
		if (this.arrows !== null) {
			this.arrows.setAttribute("class", "tl-arrows");
			this.arrows.setAttribute("aria-hidden", "true");
			wrap.append(this.arrows);
		}
		wrap.append(this.program);
		zone.append(
			head,
			wrap,
			el(
				"p",
				"tl-help",
				"Glissez une carte par sa poignée. Au clavier : flèches haut et bas pour la déplacer.",
			),
		);
		this.element.append(zone);

		this.aside = null;
		if (hasTraps) {
			const asideZone = el("section", "tl-zone tl-aside");
			asideZone.append(el("h3", "tl-zone-head", "Mise de côté"));
			this.aside = el("ol", "tl-cards");
			this.aside.dataset.zone = "aside";
			this.aside.dataset.empty = "Glissez ici la carte en trop.";
			this.aside.setAttribute("aria-label", "Mise de côté");
			asideZone.append(
				this.aside,
				el(
					"p",
					"tl-help",
					"Au clavier : Suppr met la carte de côté, Entrée la remet dans la tournée.",
				),
			);
			this.element.append(asideZone);
		}

		this.element.addEventListener("keydown", (e) => {
			this.keydown(e);
		});
		this.element.addEventListener("pointerdown", (e) => {
			this.pointerdown(e);
		});
		this.element.addEventListener("pointermove", (e) => {
			this.pointermove(e);
		});
		this.element.addEventListener("pointerup", () => {
			this.pointerup();
		});
		this.element.addEventListener("pointercancel", () => {
			this.pointerup();
		});
		this.resize = new ResizeObserver(() => {
			this.drawArrows();
		});
		this.resize.observe(this.element);
		this.render();
	}

	destroy(): void {
		this.resize.disconnect();
		this.drag?.ghost?.remove();
	}

	setDisabled(disabled: boolean): void {
		this.disabled = disabled;
		this.element.classList.toggle("tl-disabled", disabled);
	}

	/** La carte en cours d'exécution, mise en évidence par le cadre wood3. */
	setCurrent(index: number | null, activeJump: string | null = null): void {
		this.current = index;
		this.activeJump = activeJump;
		this.render();
	}

	setFailed(index: number | null): void {
		this.failed = index;
		this.render();
	}

	private cardText(card: CardSpec): string {
		const look = LOOKS[card.type];
		if (card.target === undefined) {
			return look.text("");
		}
		const target = this.session.program.findIndex((c) => c.id === card.target);
		return look.text(target >= 0 ? String(target + 1) : "?");
	}

	private jumpColor(card: CardSpec): string {
		return `var(--tl-jump-${String((this.jumpIds.indexOf(card.id) % 2) + 1)})`;
	}

	private cardNode(
		card: CardSpec,
		index: number,
		inProgram: boolean,
	): HTMLLIElement {
		const look = LOOKS[card.type];
		const locked = this.session.isLocked(card.id);
		const li = el("li", "tl-card");
		li.classList.toggle("tl-locked", locked);
		li.classList.toggle("tl-current", inProgram && index === this.current);
		li.classList.toggle("tl-failed", inProgram && index === this.failed);
		li.tabIndex = 0;
		li.dataset.id = card.id;
		const text = this.cardText(card);
		li.setAttribute(
			"aria-label",
			`${inProgram ? `Carte ${String(index + 1)} : ` : ""}${text}${locked ? ", verrouillée par l'aide" : ""}`,
		);

		const grip = el("span", "tl-grip");
		if (locked) {
			const lock = el("img", "tl-lock");
			lock.src = vendorUrl("ui/lock.png");
			lock.alt = "";
			lock.width = 24;
			lock.height = 24;
			lock.title = "Placée et verrouillée par l'aide";
			grip.append(lock);
		} else {
			grip.innerHTML = GRIP;
			grip.title = "Glisser pour déplacer";
		}
		const number = el("span", "tl-n", inProgram ? String(index + 1) : "–");
		number.setAttribute("aria-hidden", "true");
		const icon = el("span", "tl-ico");
		icon.setAttribute("aria-hidden", "true");
		const img = el("img", "");
		img.src = vendorUrl(`ui/icon-${look.icon}.png`);
		img.alt = "";
		img.width = look.width;
		img.height = look.height;
		icon.append(img);

		const label = el("span", "tl-txt");
		if (card.target !== undefined) {
			const after = /\S+$/u.exec(text)?.[0] ?? "";
			const before = text.slice(0, text.length - after.length);
			const target = el("b", "", after);
			target.style.color = this.jumpColor(card);
			label.append(before, target);
		} else {
			label.textContent = text;
		}
		li.append(grip, number, icon, label);
		return li;
	}

	render(focusId: string | null = null): void {
		const { program, aside } = this.session;
		this.program.replaceChildren(
			...program.map((c, i) => this.cardNode(c, i, true)),
		);
		this.aside?.replaceChildren(
			...aside.map((c, i) => this.cardNode(c, i, false)),
		);
		this.count.textContent = `${String(program.length)} carte${program.length > 1 ? "s" : ""}`;
		requestAnimationFrame(() => {
			this.drawArrows();
		});
		if (focusId !== null) {
			this.element
				.querySelector<HTMLElement>(
					`.tl-card[data-id="${CSS.escape(focusId)}"]`,
				)
				?.focus();
		}
	}

	private drawArrows(): void {
		const svg = this.arrows;
		if (svg === null || !this.program.isConnected) {
			return;
		}
		const base = svg.getBoundingClientRect();
		svg.replaceChildren();
		const program = this.session.program;
		let lane = 0;
		program.forEach((card, i) => {
			if (card.target === undefined) {
				return;
			}
			const from = this.program.children[i];
			const to =
				this.program.children[program.findIndex((c) => c.id === card.target)];
			if (from === undefined || to === undefined) {
				return;
			}
			const fr = from.getBoundingClientRect();
			const tr = to.getBoundingClientRect();
			const y1 = fr.top + fr.height / 2 - base.top;
			const y2 = tr.top + tr.height / 2 - base.top;
			const xr = base.width - 2;
			const xl = 8 + (lane % 2) * 13;
			lane += 1;
			const up = y2 > y1 ? 6 : -6;
			const color = this.jumpColor(card);
			const path = document.createElementNS(SVG, "path");
			path.setAttribute(
				"d",
				`M ${String(xr)} ${String(y1)} H ${String(xl + 6)} Q ${String(xl)} ${String(y1)} ${String(xl)} ${String(y1 + up)} ` +
					`V ${String(y2 - up)} Q ${String(xl)} ${String(y2)} ${String(xl + 6)} ${String(y2)} H ${String(xr - 6)}`,
			);
			path.setAttribute("fill", "none");
			path.setAttribute("stroke", color);
			path.setAttribute(
				"stroke-width",
				this.activeJump === card.id ? "5" : "3",
			);
			path.setAttribute("stroke-linecap", "round");
			path.setAttribute("stroke-linejoin", "round");
			const head = document.createElementNS(SVG, "path");
			head.setAttribute(
				"d",
				`M ${String(xr - 9)} ${String(y2 - 6)} L ${String(xr)} ${String(y2)} L ${String(xr - 9)} ${String(y2 + 6)} Z`,
			);
			head.setAttribute("fill", color);
			svg.append(path, head);
		});
	}

	private moveCard(id: string, zone: Zone, index: number): void {
		// Une tournée modifiée annule l'exécution en cours, même en pause
		this.onMove();
		if (this.session.move(id, zone, index)) {
			this.failed = null;
			this.current = null;
			this.render(id);
		}
	}

	private keydown(e: KeyboardEvent): void {
		const li = (e.target as HTMLElement).closest<HTMLElement>(".tl-card");
		const id = li?.dataset.id;
		if (id === undefined || this.disabled) {
			return;
		}
		const inProgram = this.session.program.findIndex((c) => c.id === id);
		if (inProgram >= 0 && (e.key === "ArrowUp" || e.key === "ArrowDown")) {
			e.preventDefault();
			if (e.key === "ArrowUp" && inProgram === 0) {
				return;
			}
			this.moveCard(id, "program", inProgram + (e.key === "ArrowUp" ? -1 : 2));
		} else if (
			inProgram >= 0 &&
			(e.key === "Delete" || e.key === "Backspace") &&
			this.aside !== null
		) {
			e.preventDefault();
			this.moveCard(id, "aside", this.session.aside.length);
		} else if (inProgram < 0 && e.key === "Enter") {
			e.preventDefault();
			this.moveCard(id, "program", this.session.program.length);
		}
	}

	private pointerdown(e: PointerEvent): void {
		const grip = (e.target as HTMLElement).closest<HTMLElement>(".tl-grip");
		const li = grip?.closest<HTMLElement>(".tl-card");
		const id = li?.dataset.id;
		if (
			grip == null ||
			li == null ||
			id === undefined ||
			this.disabled ||
			this.session.isLocked(id)
		) {
			return;
		}
		const box = li.getBoundingClientRect();
		this.drag = {
			id,
			startX: e.clientX,
			startY: e.clientY,
			dx: e.clientX - box.left,
			dy: e.clientY - box.top,
			moved: false,
			ghost: null,
			mark: null,
			target: null,
		};
		grip.setPointerCapture(e.pointerId);
		e.preventDefault();
	}

	private pointermove(e: PointerEvent): void {
		const drag = this.drag;
		if (drag === null) {
			return;
		}
		if (
			!drag.moved &&
			Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY) < 6
		) {
			return;
		}
		const li = this.element.querySelector<HTMLElement>(
			`.tl-card[data-id="${CSS.escape(drag.id)}"]`,
		);
		if (li === null) {
			return;
		}
		if (!drag.moved) {
			drag.moved = true;
			drag.ghost = li.cloneNode(true) as HTMLElement;
			drag.ghost.classList.add("tl-ghost");
			drag.ghost.style.width = `${String(li.getBoundingClientRect().width)}px`;
			this.element.append(drag.ghost);
			li.classList.add("tl-dragging");
		}
		if (drag.ghost !== null) {
			drag.ghost.style.left = `${String(e.clientX - drag.dx)}px`;
			drag.ghost.style.top = `${String(e.clientY - drag.dy)}px`;
		}
		drag.mark?.remove();
		drag.mark = null;
		drag.target = null;
		for (const list of [this.program, this.aside]) {
			if (list === null) {
				continue;
			}
			const box = list.getBoundingClientRect();
			if (
				e.clientY < box.top - 30 ||
				e.clientY > box.bottom + 30 ||
				e.clientX < box.left - 60 ||
				e.clientX > box.right + 30
			) {
				continue;
			}
			const all = [...list.querySelectorAll<HTMLElement>(".tl-card")];
			const items = all.filter(
				(item) => !item.classList.contains("tl-dragging"),
			);
			const before = items.find((item) => {
				const r = item.getBoundingClientRect();
				return e.clientY < r.top + r.height / 2;
			});
			drag.target = {
				zone: list.dataset.zone === "aside" ? "aside" : "program",
				index: before === undefined ? all.length : all.indexOf(before),
			};
			drag.mark = el("li", "tl-mark");
			drag.mark.setAttribute("aria-hidden", "true");
			if (before === undefined) {
				list.append(drag.mark);
			} else {
				before.before(drag.mark);
			}
			break;
		}
	}

	private pointerup(): void {
		const drag = this.drag;
		if (drag === null) {
			return;
		}
		this.drag = null;
		drag.ghost?.remove();
		drag.mark?.remove();
		this.element.querySelectorAll(".tl-dragging").forEach((node) => {
			node.classList.remove("tl-dragging");
		});
		if (drag.moved && drag.target !== null) {
			this.moveCard(drag.id, drag.target.zone, drag.target.index);
		}
	}
}
