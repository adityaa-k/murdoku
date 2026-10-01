import type { Puzzle, Cell, CellObject, Suspect } from "./puzzles";

const OCCUPIABLE: CellObject["type"][] = [
  "chair", "bed", "rug", "window", "sofa",
];

export interface RoomDef {
  name: string;
  color: string;
  cells: [number, number][];
}

export interface ObjDef {
  pos: [number, number];
  type: CellObject["type"];
}

export interface SuspectDef {
  name: string;
  clue: string;
  color: string;
  pos: [number, number];
}

export interface PuzzleDef {
  id: string;
  title: string;
  subtitle: string;
  difficulty: "easy" | "medium" | "hard" | "expert";
  rows: number;
  cols: number;
  rooms: RoomDef[];
  objects: ObjDef[];
  suspects: SuspectDef[];
  victim: { name: string; clue: string; pos: [number, number] };
  murderer: string;
  solutionSteps: string[];
}

export function buildPuzzle(def: PuzzleDef): Puzzle {
  const roomMap: Record<string, string> = {};
  const roomColors: Record<string, string> = {};
  const roomNames: string[] = [];

  for (const room of def.rooms) {
    roomColors[room.name] = room.color;
    roomNames.push(room.name);
    for (const [r, c] of room.cells) {
      roomMap[`${r},${c}`] = room.name;
    }
  }

  const objMap: Record<string, CellObject> = {};
  for (const o of def.objects) {
    objMap[`${o.pos[0]},${o.pos[1]}`] = {
      type: o.type,
      occupiable: OCCUPIABLE.includes(o.type),
    };
  }

  const grid: Cell[][] = [];
  for (let r = 0; r < def.rows; r++) {
    grid[r] = [];
    for (let c = 0; c < def.cols; c++) {
      const key = `${r},${c}`;
      const cell: Cell = {
        room: roomMap[key] ?? roomNames[0],
        row: r,
        col: c,
      };
      if (objMap[key]) cell.object = objMap[key];
      grid[r][c] = cell;
    }
  }

  const solution: Record<string, [number, number]> = {};
  for (const s of def.suspects) {
    solution[s.name] = s.pos;
  }
  solution[def.victim.name] = def.victim.pos;

  return {
    id: def.id,
    title: def.title,
    subtitle: def.subtitle,
    difficulty: def.difficulty,
    rows: def.rows,
    cols: def.cols,
    grid,
    rooms: roomNames,
    roomColors,
    suspects: def.suspects.map((s) => ({
      name: s.name,
      clue: s.clue,
      color: s.color,
    })),
    victim: { name: def.victim.name, clue: def.victim.clue },
    murderer: def.murderer,
    solution,
    solutionSteps: def.solutionSteps,
  };
}

// Room cell range helpers
export function rect(
  r1: number,
  c1: number,
  r2: number,
  c2: number,
): [number, number][] {
  const cells: [number, number][] = [];
  for (let r = r1; r <= r2; r++) {
    for (let c = c1; c <= c2; c++) {
      cells.push([r, c]);
    }
  }
  return cells;
}
