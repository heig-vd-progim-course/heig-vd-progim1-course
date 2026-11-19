// Une rue : la grille des intersections, ce qui s'y trouve, et le départ de Théa.
// Tout est immuable : le moteur ne modifie jamais une rue, il en copie les cases.

export type Direction = "north" | "east" | "south" | "west";

export interface Position {
	readonly row: number;
	readonly col: number;
}

export interface TheaState {
	readonly position: Position;
	readonly direction: Direction;
}

/** Une mare, où Théa nage, ou un trou, où elle tombe. */
export type ObstacleKind = "pond" | "hole";

export type Cell = "free" | ObstacleKind | "house" | "delivered" | "leaves";

export type Cells = readonly (readonly Cell[])[];

export interface Street {
	readonly rows: number;
	readonly cols: number;
	readonly cells: Cells;
	readonly start: TheaState;
}

/** Choisit la sorte d'un obstacle `~`. C'est le rendu qui en décide. */
export type ObstacleChooser = (position: Position) => ObstacleKind;

export type GridError =
	| { readonly code: "EMPTY_GRID" }
	| {
			readonly code: "UNKNOWN_SYMBOL";
			readonly symbol: string;
			readonly line: number;
	  }
	| {
			readonly code: "ROW_LENGTH";
			readonly line: number;
			readonly found: number;
			readonly expected: number;
	  }
	| { readonly code: "THEA_COUNT"; readonly found: number };

export type ParseStreetResult =
	| { readonly ok: true; readonly street: Street }
	| { readonly ok: false; readonly errors: readonly GridError[] };

const THEA: Readonly<Record<string, Direction>> = {
	"T^": "north",
	"T>": "east",
	Tv: "south",
	"T<": "west",
};

const SYMBOLS: Readonly<Record<string, Cell | undefined>> = {
	".": "free",
	M: "house",
	f: "leaves",
};

const OFFSETS: Readonly<Record<Direction, Position>> = {
	north: { row: -1, col: 0 },
	east: { row: 0, col: 1 },
	south: { row: 1, col: 0 },
	west: { row: 0, col: -1 },
};

const CLOCKWISE: readonly Direction[] = ["north", "east", "south", "west"];

export function turnRight(direction: Direction): Direction {
	return CLOCKWISE[(CLOCKWISE.indexOf(direction) + 1) % 4] ?? direction;
}

export function turnLeft(direction: Direction): Direction {
	return CLOCKWISE[(CLOCKWISE.indexOf(direction) + 3) % 4] ?? direction;
}

/** L'intersection suivante, dans la direction donnée. */
export function ahead(position: Position, direction: Direction): Position {
	const offset = OFFSETS[direction];
	return { row: position.row + offset.row, col: position.col + offset.col };
}

export function isInside(street: Street, position: Position): boolean {
	return (
		position.row >= 0 &&
		position.col >= 0 &&
		position.row < street.rows &&
		position.col < street.cols
	);
}

export function cellAt(cells: Cells, position: Position): Cell {
	return cells[position.row]?.[position.col] ?? "free";
}

/** Combien de cases d'une sorte donnée restent dans la grille. */
export function count(cells: Cells, cell: Cell): number {
	return cells.flat().filter((c) => c === cell).length;
}

/**
 * Lit une grille écrite dans le format des niveaux : une ligne par rangée,
 * des cases séparées par des espaces. Rend toutes les erreurs trouvées, pour
 * que l'enseignant les corrige en une fois.
 */
export function parseStreet(
	text: string,
	chooseObstacle: ObstacleChooser = () => "pond",
): ParseStreetResult {
	const lines = text
		.split("\n")
		.map((line) => line.trim())
		.filter((line) => line !== "");
	if (lines.length === 0) {
		return { ok: false, errors: [{ code: "EMPTY_GRID" }] };
	}

	const errors: GridError[] = [];
	const theas: TheaState[] = [];
	const tokens = lines.map((line) => line.split(/\s+/));
	const expected = tokens[0]?.length ?? 0;

	const cells = tokens.map((row, r) => {
		if (row.length !== expected) {
			errors.push({
				code: "ROW_LENGTH",
				line: r + 1,
				found: row.length,
				expected,
			});
		}
		return row.map((symbol, c): Cell => {
			const position = { row: r, col: c };
			const direction = THEA[symbol];
			if (direction !== undefined) {
				theas.push({ position, direction });
				return "free";
			}
			if (symbol === "~") {
				return chooseObstacle(position);
			}
			const cell = SYMBOLS[symbol];
			if (cell === undefined) {
				errors.push({ code: "UNKNOWN_SYMBOL", symbol, line: r + 1 });
				return "free";
			}
			return cell;
		});
	});

	const start = theas[0];
	if (theas.length !== 1 || start === undefined) {
		errors.push({ code: "THEA_COUNT", found: theas.length });
	}
	if (errors.length > 0 || start === undefined) {
		return { ok: false, errors };
	}
	return {
		ok: true,
		street: { rows: cells.length, cols: expected, cells, start },
	};
}
