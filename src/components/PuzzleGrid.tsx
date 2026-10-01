"use client";

import { useState, useCallback } from "react";
import type { Puzzle, Cell } from "@/data/puzzles";

const OBJECT_ICONS: Record<string, string> = {
  chair: "🪑",
  bed: "🛏️",
  table: "🍽️",
  plant: "🪴",
  tv: "📺",
  shelf: "📚",
  window: "🪟",
  rug: "🟫",
  desk: "🖥️",
  sofa: "🛋️",
  lamp: "💡",
  sink: "🚰",
  stove: "🔥",
  fridge: "🧊",
  easel: "🎨",
  piano: "🎹",
  barrel: "🛢️",
  crate: "📦",
  box: "📦",
  bench: "🪑",
};

interface PuzzleGridProps {
  puzzle: Puzzle;
  placements: Record<string, [number, number] | null>;
  selectedSuspect: string | null;
  onCellClick: (row: number, col: number) => void;
  showSolution: boolean;
}

export default function PuzzleGrid({
  puzzle,
  placements,
  selectedSuspect,
  onCellClick,
  showSolution,
}: PuzzleGridProps) {
  const [hoveredCell, setHoveredCell] = useState<
    [number, number] | null
  >(null);

  const getPlacedSuspect = useCallback(
    (row: number, col: number): string | null => {
      if (showSolution) {
        for (const [name, pos] of Object.entries(
          puzzle.solution,
        )) {
          if (pos[0] === row && pos[1] === col) return name;
        }
        return null;
      }
      for (const [name, pos] of Object.entries(placements)) {
        if (pos && pos[0] === row && pos[1] === col)
          return name;
      }
      return null;
    },
    [placements, puzzle.solution, showSolution],
  );

  const getSuspectColor = (name: string): string => {
    const suspect = puzzle.suspects.find(
      (s) => s.name === name,
    );
    if (suspect) return suspect.color;
    if (name === puzzle.victim.name) return "#EF4444";
    return "#888";
  };

  const isOccupiable = (c: Cell): boolean => {
    if (!c.object) return true;
    return c.object.occupiable;
  };

  const getBorderStyle = (
    row: number,
    col: number,
  ): React.CSSProperties => {
    const currentRoom = puzzle.grid[row][col].room;
    const borders: React.CSSProperties = {};

    const top =
      row === 0 || puzzle.grid[row - 1][col].room !== currentRoom;
    const bottom =
      row === puzzle.rows - 1 ||
      puzzle.grid[row + 1][col].room !== currentRoom;
    const left =
      col === 0 || puzzle.grid[row][col - 1].room !== currentRoom;
    const right =
      col === puzzle.cols - 1 ||
      puzzle.grid[row][col + 1].room !== currentRoom;

    borders.borderTop = top
      ? "3px solid #1a1a2e"
      : "1px solid #444";
    borders.borderBottom = bottom
      ? "3px solid #1a1a2e"
      : "1px solid #444";
    borders.borderLeft = left
      ? "3px solid #1a1a2e"
      : "1px solid #444";
    borders.borderRight = right
      ? "3px solid #1a1a2e"
      : "1px solid #444";

    return borders;
  };

  const getRoomLabel = (
    row: number,
    col: number,
  ): string | null => {
    const room = puzzle.grid[row][col].room;
    if (row === 0 && col === 0) return null;

    const isFirstInRoom = !puzzle.grid.some((r, ri) =>
      r.some(
        (c, ci) =>
          c.room === room &&
          (ri < row || (ri === row && ci < col)),
      ),
    );

    return isFirstInRoom ? room : null;
  };

  return (
    <div className="relative overflow-x-auto">
      <div
        className="grid gap-0 mx-auto"
        style={{
          gridTemplateColumns: `repeat(${puzzle.cols}, minmax(56px, 72px))`,
          width: "fit-content",
        }}
      >
        {puzzle.grid.map((row, ri) =>
          row.map((c, ci) => {
            const placed = getPlacedSuspect(ri, ci);
            const occupiable = isOccupiable(c);
            const isHovered =
              hoveredCell?.[0] === ri &&
              hoveredCell?.[1] === ci;
            const canPlace =
              selectedSuspect && occupiable && !placed;
            const roomLabel = getRoomLabel(ri, ci);

            return (
              <div
                key={`${ri}-${ci}`}
                className={`
                  relative flex items-center justify-center
                  min-h-[56px] min-w-[56px] transition-all duration-150
                  ${canPlace ? "cursor-pointer" : ""}
                  ${isHovered && canPlace ? "brightness-110 scale-105 z-10" : ""}
                  ${!occupiable ? "opacity-80" : ""}
                `}
                style={{
                  backgroundColor:
                    puzzle.roomColors[c.room] ?? "#ddd",
                  ...getBorderStyle(ri, ci),
                }}
                onClick={() => {
                  if (occupiable) onCellClick(ri, ci);
                }}
                onMouseEnter={() => setHoveredCell([ri, ci])}
                onMouseLeave={() => setHoveredCell(null)}
              >
                {roomLabel && (
                  <span
                    className="absolute top-0 left-1 text-[8px] font-bold
                      text-gray-700 uppercase tracking-wide z-20
                      whitespace-nowrap pointer-events-none"
                  >
                    {roomLabel}
                  </span>
                )}

                {c.object && (
                  <span
                    className={`text-lg ${placed ? "opacity-30" : "opacity-60"} pointer-events-none`}
                  >
                    {OBJECT_ICONS[c.object.type] ?? "❓"}
                  </span>
                )}

                {placed && (
                  <div
                    className="absolute inset-1 rounded-lg flex items-center
                      justify-center text-white font-bold text-xs shadow-lg
                      border-2 border-white/30"
                    style={{
                      backgroundColor: getSuspectColor(placed),
                    }}
                  >
                    <span className="truncate px-0.5">
                      {placed.slice(0, 3)}
                    </span>
                  </div>
                )}

                {canPlace && isHovered && !placed && (
                  <div
                    className="absolute inset-2 rounded-lg border-2
                      border-dashed opacity-50 pointer-events-none"
                    style={{
                      borderColor: getSuspectColor(
                        selectedSuspect,
                      ),
                    }}
                  />
                )}
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
}
