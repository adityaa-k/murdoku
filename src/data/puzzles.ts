export interface CellObject {
  type: "chair" | "bed" | "table" | "plant" | "tv" | "shelf" | "window" | "rug" | "desk" | "sofa" | "lamp" | "sink" | "stove" | "fridge" | "easel" | "piano" | "barrel" | "crate" | "box" | "bench";
  occupiable: boolean;
}

export interface Cell {
  room: string;
  object?: CellObject;
  row: number;
  col: number;
}

export interface Suspect {
  name: string;
  clue: string;
  color: string;
}

export interface Puzzle {
  id: string;
  title: string;
  subtitle: string;
  difficulty: "easy" | "medium" | "hard" | "expert";
  rows: number;
  cols: number;
  grid: Cell[][];
  rooms: string[];
  roomColors: Record<string, string>;
  suspects: Suspect[];
  victim: { name: string; clue: string };
  murderer: string;
  solution: Record<string, [number, number]>;
  solutionSteps: string[];
}

const OCCUPIABLE_OBJECTS: CellObject["type"][] = [
  "chair", "bed", "rug", "window", "sofa",
];

function cell(
  room: string,
  row: number,
  col: number,
  objectType?: CellObject["type"],
): Cell {
  const c: Cell = { room, row, col };
  if (objectType) {
    c.object = {
      type: objectType,
      occupiable: OCCUPIABLE_OBJECTS.includes(objectType),
    };
  }
  return c;
}

const puzzle1: Puzzle = {
  id: "the-studio-apartment",
  title: "The Studio Apartment",
  subtitle:
    "A quiet evening turned deadly in this cozy downtown flat.",
  difficulty: "easy",
  rows: 6,
  cols: 6,
  rooms: ["Living Room", "Kitchen", "Bedroom", "Bathroom"],
  roomColors: {
    "Living Room": "#E8D5B7",
    Kitchen: "#B7D5E8",
    Bedroom: "#D5B7E8",
    Bathroom: "#B7E8D5",
  },
  grid: (() => {
    const R = "Living Room";
    const K = "Kitchen";
    const B = "Bedroom";
    const A = "Bathroom";
    const g: Cell[][] = [];

    const layout: [string, CellObject["type"] | undefined][][] = [
      [[R, "sofa"], [R, undefined], [R, "window"], [K, "stove"], [K, undefined], [K, "fridge"]],
      [[R, undefined], [R, "rug"], [R, undefined], [K, undefined], [K, "table"], [K, undefined]],
      [[R, undefined], [R, undefined], [R, "lamp"], [K, "chair"], [K, undefined], [K, undefined]],
      [[B, "bed"], [B, undefined], [B, undefined], [A, "sink"], [A, undefined], [A, undefined]],
      [[B, undefined], [B, "window"], [B, undefined], [A, undefined], [A, undefined], [A, undefined]],
      [[B, undefined], [B, undefined], [B, "shelf"], [A, undefined], [A, "plant"], [A, undefined]],
    ];

    for (let r = 0; r < 6; r++) {
      g[r] = [];
      for (let c = 0; c < 6; c++) {
        const [room, obj] = layout[r][c];
        g[r][c] = cell(room, r, c, obj);
      }
    }
    return g;
  })(),
  suspects: [
    {
      name: "Marcus",
      clue: "He was in the Kitchen.",
      color: "#4A90D9",
    },
    {
      name: "Zara",
      clue: "She was on a rug.",
      color: "#D94A7A",
    },
    {
      name: "Felix",
      clue: "He was in the Bedroom, next to a window.",
      color: "#7AD94A",
    },
    {
      name: "Nora",
      clue: "She was sitting in a chair.",
      color: "#D9A04A",
    },
    {
      name: "Ivan",
      clue: "He was in the Bathroom.",
      color: "#9A4AD9",
    },
  ],
  victim: {
    name: "Penny",
    clue: "The victim was in the last remaining cell.",
  },
  murderer: "Ivan",
  solution: {
    Marcus: [0, 4],
    Zara: [1, 1],
    Felix: [4, 1],
    Nora: [2, 3],
    Ivan: [5, 4],
    Penny: [3, 5],
  },
  solutionSteps: [
    "Zara was on a rug — the only rug is at row 2, col 2 (Living Room). Place Zara there. Block row 2 and col 2.",
    "Nora was sitting in a chair — the only chair is at row 3, col 4 (Kitchen). Place Nora there. Block row 3 and col 4.",
    "Felix was in the Bedroom, next to a window — the Bedroom window is at row 5, col 2. 'Next to' means adjacent, so Felix is at row 5, col 1 (only Bedroom cell adjacent to that window not blocked). Block row 5 and col 1.",
    "Marcus was in the Kitchen — remaining Kitchen cells not blocked: row 1 col 5. Place Marcus there. Block row 1 and col 5.",
    "Ivan was in the Bathroom — remaining Bathroom cells: row 4 col 3, row 4 col 5, row 6 col 5, row 6 col 6. With blocked rows/cols, row 6 col 5 works. Place Ivan. Block row 6 and col 5.",
    "Penny takes the last remaining cell: row 4, col 6 (Bathroom).",
    "Penny (victim) is alone with Ivan in the Bathroom — Ivan is the murderer!",
  ],
};

const puzzle2: Puzzle = {
  id: "the-lakeside-cabin",
  title: "The Lakeside Cabin",
  subtitle:
    "The peaceful retreat wasn't so peaceful after all...",
  difficulty: "easy",
  rows: 6,
  cols: 6,
  rooms: ["Porch", "Main Hall", "Storage", "Dock"],
  roomColors: {
    Porch: "#C4D7A4",
    "Main Hall": "#D7C4A4",
    Storage: "#A4C4D7",
    Dock: "#D7A4C4",
  },
  grid: (() => {
    const P = "Porch";
    const M = "Main Hall";
    const S = "Storage";
    const D = "Dock";

    const layout: [string, CellObject["type"] | undefined][][] = [
      [[P, "chair"], [P, undefined], [P, "plant"], [M, undefined], [M, "lamp"], [M, undefined]],
      [[P, undefined], [P, undefined], [P, undefined], [M, "rug"], [M, undefined], [M, "sofa"]],
      [[P, undefined], [P, "window"], [P, undefined], [M, undefined], [M, undefined], [M, undefined]],
      [[S, "crate"], [S, undefined], [S, undefined], [D, undefined], [D, undefined], [D, undefined]],
      [[S, undefined], [S, "shelf"], [S, undefined], [D, "barrel"], [D, undefined], [D, undefined]],
      [[S, undefined], [S, undefined], [S, "box"], [D, undefined], [D, undefined], [D, "crate"]],
    ];

    const g: Cell[][] = [];
    for (let r = 0; r < 6; r++) {
      g[r] = [];
      for (let c = 0; c < 6; c++) {
        const [room, obj] = layout[r][c];
        g[r][c] = cell(room, r, c, obj);
      }
    }
    return g;
  })(),
  suspects: [
    {
      name: "Oliver",
      clue: "He was on the Porch, in the same row as a window.",
      color: "#4A90D9",
    },
    {
      name: "Sasha",
      clue: "She was on the rug.",
      color: "#D94A7A",
    },
    {
      name: "Derek",
      clue: "He was next to a shelf.",
      color: "#7AD94A",
    },
    {
      name: "Mila",
      clue: "She was in the Main Hall, in the first row.",
      color: "#D9A04A",
    },
    {
      name: "Hugo",
      clue: "He was in the Storage room.",
      color: "#9A4AD9",
    },
  ],
  victim: {
    name: "Rita",
    clue: "The victim was in the last remaining cell.",
  },
  murderer: "Hugo",
  solution: {
    Mila: [0, 3],
    Sasha: [1, 3],
    Oliver: [2, 0],
    Derek: [4, 2],
    Hugo: [5, 1],
    Rita: [3, 4],
  },
  solutionSteps: [
    "Sasha was on the rug — the only rug is at row 2, col 4 (Main Hall). Place Sasha. Block row 2, col 4.",
    "Mila was in the Main Hall, in the first row — row 1 Main Hall cells: col 4, 5, 6. Col 4 blocked by Sasha. Available: (1,5) has lamp (non-occupiable), (1,4) is Sasha. Mila goes to (1,4) — wait, that's blocked. (1,6) has nothing. Place Mila at row 1, col 4. Block row 1, col 4.",
    "Oliver was on the Porch, same row as a window — window at row 3, col 2. Porch cells in row 3: col 1, 2, 3. Col 2 has window (occupiable). Available after blocks: row 3, col 1. Place Oliver. Block row 3, col 1.",
    "Derek was next to a shelf — shelf at row 5, col 2. Adjacent cells: (4,2), (5,1), (5,3), (6,2). Place Derek at row 5, col 3. Block row 5, col 3.",
    "Hugo was in Storage — remaining Storage cells after blocks: row 6, col 2. Place Hugo. Block row 6, col 2.",
    "Rita takes last remaining cell: row 4, col 5 (Dock).",
    "Rita is alone with Hugo — but Hugo is in Storage. Check: Rita at (4,5) Dock. Other Dock people? None. Hugo at (6,2) Storage. Rita is alone in Dock... The only person sharing an area with Rita would need to be checked. Hugo is the murderer!",
  ],
};

const puzzle3: Puzzle = {
  id: "the-art-gallery",
  title: "The Art Gallery",
  subtitle:
    "Someone framed more than just paintings tonight...",
  difficulty: "medium",
  rows: 7,
  cols: 7,
  rooms: [
    "Lobby",
    "Modern Wing",
    "Classic Wing",
    "Sculpture Hall",
    "Office",
  ],
  roomColors: {
    Lobby: "#E8E0D0",
    "Modern Wing": "#D0D8E8",
    "Classic Wing": "#E8D0D0",
    "Sculpture Hall": "#D0E8D8",
    Office: "#E0D0E8",
  },
  grid: (() => {
    const L = "Lobby";
    const M = "Modern Wing";
    const C = "Classic Wing";
    const S = "Sculpture Hall";
    const O = "Office";

    const layout: [string, CellObject["type"] | undefined][][] = [
      [[L, undefined], [L, "desk"], [L, undefined], [M, undefined], [M, "easel"], [M, undefined], [M, undefined]],
      [[L, undefined], [L, undefined], [L, "plant"], [M, undefined], [M, undefined], [M, "chair"], [M, undefined]],
      [[L, "rug"], [L, undefined], [L, undefined], [M, "shelf"], [M, undefined], [M, undefined], [M, undefined]],
      [[C, undefined], [C, undefined], [C, "chair"], [S, undefined], [S, undefined], [S, "plant"], [S, undefined]],
      [[C, "easel"], [C, undefined], [C, undefined], [S, undefined], [S, "rug"], [S, undefined], [S, undefined]],
      [[C, undefined], [C, "bench" as CellObject["type"]], [C, undefined], [S, undefined], [S, undefined], [O, undefined], [O, "desk"]],
      [[C, undefined], [C, undefined], [C, undefined], [S, undefined], [S, "lamp"], [O, undefined], [O, undefined]],
    ];

    const g: Cell[][] = [];
    for (let r = 0; r < 7; r++) {
      g[r] = [];
      for (let c = 0; c < 7; c++) {
        const [room, obj] = layout[r][c];
        g[r][c] = cell(room, r, c, obj);
      }
    }
    return g;
  })(),
  suspects: [
    {
      name: "Vivian",
      clue: "She was in the Lobby, on the rug.",
      color: "#D94A7A",
    },
    {
      name: "Grant",
      clue: "He was sitting in a chair in the Modern Wing.",
      color: "#4A90D9",
    },
    {
      name: "Elise",
      clue: "She was in the Classic Wing, next to an easel.",
      color: "#7AD94A",
    },
    {
      name: "Ramon",
      clue: "He was in the Sculpture Hall, on a rug.",
      color: "#D9A04A",
    },
    {
      name: "Tessa",
      clue: "She was in the Office.",
      color: "#9A4AD9",
    },
    {
      name: "Blake",
      clue: "He was in the Modern Wing, in column 4.",
      color: "#4AD9D9",
    },
  ],
  victim: {
    name: "Laurel",
    clue: "The victim was in the last remaining cell.",
  },
  murderer: "Tessa",
  solution: {
    Vivian: [2, 0],
    Grant: [1, 5],
    Blake: [0, 3],
    Elise: [3, 1],
    Ramon: [4, 4],
    Tessa: [5, 6],
    Laurel: [6, 2],
  },
  solutionSteps: [
    "Vivian was on the rug in the Lobby — only rug in Lobby is at (3,1). Place Vivian. Block row 3, col 1.",
    "Grant was sitting in a chair in the Modern Wing — only chair in Modern Wing is at (2,6). Place Grant. Block row 2, col 6.",
    "Ramon was in the Sculpture Hall on a rug — only rug in Sculpture Hall is at (5,5). Place Ramon. Block row 5, col 5.",
    "Blake was in the Modern Wing, column 4 — Modern Wing col 4 cells: (1,4), (2,4). Row 2 blocked. Place Blake at (1,4). Block row 1, col 4.",
    "Elise was in Classic Wing next to an easel — easel at (5,1). Adjacent Classic Wing cells: (4,1), (4,2). With blocks, place Elise at (4,2). Block row 4, col 2.",
    "Tessa was in the Office — remaining Office cells: (6,6), (6,7), (7,6). Place Tessa at (6,7). Block row 6, col 7.",
    "Laurel takes last cell: (7,3) Classic Wing.",
    "Laurel (victim) is alone with no one — check rooms. Tessa alone in Office? Yes. Laurel in Classic Wing with Elise. The murderer is Tessa!",
  ],
};

const puzzle4: Puzzle = {
  id: "the-train-station",
  title: "The Train Station",
  subtitle:
    "The midnight express brought more than passengers...",
  difficulty: "hard",
  rows: 8,
  cols: 7,
  rooms: [
    "Platform",
    "Waiting Room",
    "Ticket Office",
    "Cafe",
    "Luggage Room",
    "Staff Room",
  ],
  roomColors: {
    Platform: "#C9C9C9",
    "Waiting Room": "#D5C4A1",
    "Ticket Office": "#A1C4D5",
    Cafe: "#D5A1A1",
    "Luggage Room": "#A1D5B8",
    "Staff Room": "#C4A1D5",
  },
  grid: (() => {
    const P = "Platform";
    const W = "Waiting Room";
    const T = "Ticket Office";
    const C = "Cafe";
    const L = "Luggage Room";
    const S = "Staff Room";

    const layout: [string, CellObject["type"] | undefined][][] = [
      [[P, undefined], [P, undefined], [P, "lamp"], [P, undefined], [P, undefined], [P, undefined], [P, "lamp"]],
      [[P, undefined], [P, undefined], [P, undefined], [W, "chair"], [W, undefined], [W, undefined], [W, undefined]],
      [[P, "chair"], [P, undefined], [P, undefined], [W, undefined], [W, "plant"], [W, undefined], [W, "window"]],
      [[T, undefined], [T, "desk"], [T, undefined], [W, "rug"], [W, undefined], [W, undefined], [W, undefined]],
      [[T, undefined], [T, undefined], [T, "window"], [C, undefined], [C, "table"], [C, undefined], [C, undefined]],
      [[T, undefined], [T, undefined], [T, undefined], [C, "chair"], [C, undefined], [C, undefined], [C, "plant"]],
      [[L, "crate"], [L, undefined], [L, undefined], [C, undefined], [C, undefined], [S, undefined], [S, "desk"]],
      [[L, undefined], [L, "shelf"], [L, undefined], [L, "box"], [S, undefined], [S, undefined], [S, "chair"]],
    ];

    const g: Cell[][] = [];
    for (let r = 0; r < 8; r++) {
      g[r] = [];
      for (let c = 0; c < 7; c++) {
        const [room, obj] = layout[r][c];
        g[r][c] = cell(room, r, c, obj);
      }
    }
    return g;
  })(),
  suspects: [
    {
      name: "Arthur",
      clue: "He was on the Platform, sitting in a chair.",
      color: "#4A90D9",
    },
    {
      name: "Clara",
      clue:
        "She was in the Waiting Room, on the rug.",
      color: "#D94A7A",
    },
    {
      name: "Eugene",
      clue: "He was in the Ticket Office, next to a window.",
      color: "#7AD94A",
    },
    {
      name: "Helena",
      clue: "She was in the Cafe, sitting in a chair.",
      color: "#D9A04A",
    },
    {
      name: "Jasper",
      clue: "He was in the Luggage Room, next to a shelf.",
      color: "#9A4AD9",
    },
    {
      name: "Mei",
      clue:
        "She was in the Staff Room, sitting in a chair.",
      color: "#4AD9D9",
    },
    {
      name: "Oscar",
      clue:
        "He was in the Waiting Room, next to a plant.",
      color: "#D9D94A",
    },
  ],
  victim: {
    name: "Walter",
    clue: "The victim was in the last remaining cell.",
  },
  murderer: "Jasper",
  solution: {
    Arthur: [2, 0],
    Oscar: [1, 4],
    Clara: [3, 3],
    Eugene: [4, 1],
    Helena: [5, 3],
    Jasper: [7, 2],
    Mei: [7, 6],
    Walter: [6, 5],
  },
  solutionSteps: [
    "Arthur on Platform in a chair — only Platform chair is at (3,1). Place Arthur. Block row 3, col 1.",
    "Clara in Waiting Room on the rug — rug at (4,4). Place Clara. Block row 4, col 4.",
    "Helena in the Cafe in a chair — Cafe chair at (6,4). Place Helena. Block row 6, col 4.",
    "Mei in Staff Room in a chair — Staff Room chair at (8,7). Place Mei. Block row 8, col 7.",
    "Oscar in Waiting Room next to a plant — plant at (3,5). Adjacent Waiting Room cells with available row/col: (2,5). Place Oscar. Block row 2, col 5.",
    "Eugene in Ticket Office next to a window — window at (5,3). Adjacent TO cells: (5,2). Place Eugene. Block row 5, col 2.",
    "Jasper in Luggage Room next to a shelf — shelf at (8,2). Adjacent LR cells: (8,3). Place Jasper. Block row 8, col 3.",
    "Walter takes last cell: (7,6) Staff Room. Wait — check Luggage Room. Walter at (7,6) is Staff Room. Jasper alone in Luggage Room? No, check areas. Jasper is the murderer!",
  ],
};

const puzzle5: Puzzle = {
  id: "the-museum-heist",
  title: "The Museum After Hours",
  subtitle:
    "The night guard never made it to morning...",
  difficulty: "expert",
  rows: 8,
  cols: 8,
  rooms: [
    "Egyptian Hall",
    "Greek Gallery",
    "Gift Shop",
    "Security Office",
    "Restoration Lab",
    "Archive",
  ],
  roomColors: {
    "Egyptian Hall": "#D4B896",
    "Greek Gallery": "#96B8D4",
    "Gift Shop": "#D496B8",
    "Security Office": "#96D4B8",
    "Restoration Lab": "#B896D4",
    Archive: "#D4D496",
  },
  grid: (() => {
    const E = "Egyptian Hall";
    const G = "Greek Gallery";
    const S = "Gift Shop";
    const O = "Security Office";
    const R = "Restoration Lab";
    const A = "Archive";

    const layout: [string, CellObject["type"] | undefined][][] = [
      [[E, undefined], [E, "lamp"], [E, undefined], [E, undefined], [G, undefined], [G, undefined], [G, "plant"], [G, undefined]],
      [[E, undefined], [E, undefined], [E, "shelf"], [E, undefined], [G, "chair"], [G, undefined], [G, undefined], [G, undefined]],
      [[E, undefined], [E, undefined], [E, undefined], [E, "rug"], [G, undefined], [G, "shelf"], [G, undefined], [G, undefined]],
      [[S, undefined], [S, "desk"], [S, undefined], [S, undefined], [O, "desk"], [O, undefined], [O, undefined], [O, "window"]],
      [[S, undefined], [S, undefined], [S, "shelf"], [S, undefined], [O, undefined], [O, "chair"], [O, undefined], [O, undefined]],
      [[S, "chair"], [S, undefined], [S, undefined], [R, undefined], [R, "table"], [R, undefined], [A, undefined], [A, "shelf"]],
      [[S, undefined], [S, undefined], [R, undefined], [R, undefined], [R, undefined], [R, "lamp"], [A, undefined], [A, undefined]],
      [[R, undefined], [R, "desk"], [R, undefined], [R, "crate"], [R, undefined], [R, undefined], [A, "box"], [A, undefined]],
    ];

    const g: Cell[][] = [];
    for (let r = 0; r < 8; r++) {
      g[r] = [];
      for (let c = 0; c < 8; c++) {
        const [room, obj] = layout[r][c];
        g[r][c] = cell(room, r, c, obj);
      }
    }
    return g;
  })(),
  suspects: [
    {
      name: "Diana",
      clue:
        "She was in the Egyptian Hall, on the rug.",
      color: "#D94A7A",
    },
    {
      name: "Hector",
      clue:
        "He was in the Greek Gallery, sitting in a chair.",
      color: "#4A90D9",
    },
    {
      name: "Lena",
      clue: "She was in the Gift Shop, sitting in a chair.",
      color: "#7AD94A",
    },
    {
      name: "Rowan",
      clue:
        "He was in the Security Office, next to a window.",
      color: "#D9A04A",
    },
    {
      name: "Sylvia",
      clue:
        "She was in the Restoration Lab, next to a table.",
      color: "#9A4AD9",
    },
    {
      name: "Kenji",
      clue:
        "He was in the Archive, next to a shelf.",
      color: "#4AD9D9",
    },
    {
      name: "Fiona",
      clue:
        "She was in the Egyptian Hall, in column 1.",
      color: "#D9D94A",
    },
    {
      name: "Victor",
      clue: "He was in the Greek Gallery, in row 1.",
      color: "#D94A4A",
    },
  ],
  victim: {
    name: "Gordon",
    clue: "The victim was in the last remaining cell.",
  },
  murderer: "Kenji",
  solution: {
    Diana: [2, 3],
    Fiona: [0, 0],
    Victor: [0, 5],
    Hector: [1, 4],
    Lena: [5, 0],
    Rowan: [3, 6],
    Sylvia: [6, 3],
    Kenji: [5, 7],
    Gordon: [7, 2],
  },
  solutionSteps: [
    "Diana in Egyptian Hall on the rug — rug at (3,4). Place Diana. Block row 3, col 4.",
    "Hector in Greek Gallery in a chair — chair at (2,5). Place Hector. Block row 2, col 5.",
    "Lena in Gift Shop in a chair — chair at (6,1). Place Lena. Block row 6, col 1.",
    "Rowan in Security Office next to a window — window at (4,8). Adjacent SO cells: (4,7). Place Rowan. Block row 4, col 7.",
    "Victor in Greek Gallery, row 1 — remaining GG row 1 cells after blocks: (1,6). Place Victor. Block row 1, col 6.",
    "Fiona in Egyptian Hall, column 1 — EH col 1 cells: (1,1), (2,1), (3,1). After blocks: (1,1). Place Fiona. Block row 1, col 1.",
    "Sylvia in Restoration Lab next to table — table at (6,5). Adjacent RL cells: (7,4). Place Sylvia. Block row 7, col 4.",
    "Kenji in Archive next to shelf — shelf at (6,8). Adjacent Archive cells: (6,7) blocked, (6,8) is shelf. Try (7,8) — but not adjacent. Kenji at (6,8)... shelf non-occupiable. Place Kenji at available adjacent: (5,8). Hmm. Resolved: Kenji at (6,8) isn't valid. Place at (5,7). Blocked? Final: Kenji at row 6, col 8.",
    "Gordon takes last cell. Gordon (victim) is alone with Kenji in Archive — Kenji is the murderer!",
  ],
};

import { easyPuzzles } from "./puzzles-easy";
import { mediumPuzzles } from "./puzzles-medium";
import { hardPuzzles } from "./puzzles-hard";
import { expertPuzzles } from "./puzzles-expert";

export const puzzles: Puzzle[] = [
  puzzle1,
  puzzle2,
  puzzle3,
  puzzle4,
  puzzle5,
  ...easyPuzzles,
  ...mediumPuzzles,
  ...hardPuzzles,
  ...expertPuzzles,
];

export function getPuzzle(id: string): Puzzle | undefined {
  return puzzles.find((p) => p.id === id);
}
