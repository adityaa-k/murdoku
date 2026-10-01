"use client";

import { useState, useCallback, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPuzzle } from "@/data/puzzles";
import PuzzleGrid from "@/components/PuzzleGrid";
import SuspectPanel from "@/components/SuspectPanel";
import MurdererGuess from "@/components/MurdererGuess";
import SolutionPanel from "@/components/SolutionPanel";
import {
  getProgress,
  savePlacement,
  markSolved,
  resetProgress,
} from "@/lib/progress";

export default function PuzzlePage() {
  const params = useParams();
  const router = useRouter();
  const puzzle = getPuzzle(params.id as string);

  const [placements, setPlacements] = useState<
    Record<string, [number, number] | null>
  >({});
  const [selectedSuspect, setSelectedSuspect] = useState<
    string | null
  >(null);
  const [showSolution, setShowSolution] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!puzzle) return;
    const progress = getProgress(puzzle.id);
    if (progress) {
      setPlacements(progress.placements);
      setIsSolved(progress.solved);
    }
    setLoaded(true);
  }, [puzzle]);

  const allNames = puzzle
    ? [
        ...puzzle.suspects.map((s) => s.name),
        puzzle.victim.name,
      ]
    : [];

  const allPlaced =
    allNames.length > 0 &&
    allNames.every((n) => placements[n] != null);

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      if (!puzzle || !selectedSuspect || showSolution) return;

      const existing = Object.entries(placements).find(
        ([, pos]) =>
          pos && pos[0] === row && pos[1] === col,
      );
      if (existing) return;

      const cell = puzzle.grid[row][col];
      if (cell.object && !cell.object.occupiable) return;

      const next = {
        ...placements,
        [selectedSuspect]: [row, col] as [number, number],
      };
      setPlacements(next);
      savePlacement(puzzle.id, selectedSuspect, [row, col]);

      const unplaced = allNames.filter(
        (n) => n !== selectedSuspect && !next[n],
      );
      setSelectedSuspect(
        unplaced.length > 0 ? unplaced[0] : null,
      );
    },
    [
      puzzle,
      selectedSuspect,
      placements,
      allNames,
      showSolution,
    ],
  );

  const handleRemovePlacement = useCallback(
    (name: string) => {
      if (!puzzle) return;
      const next = { ...placements, [name]: null };
      setPlacements(next);
      savePlacement(puzzle.id, name, null);
    },
    [puzzle, placements],
  );

  const handleCorrectGuess = useCallback(() => {
    if (!puzzle) return;
    setIsSolved(true);
    markSolved(puzzle.id);
  }, [puzzle]);

  const handleReset = useCallback(() => {
    if (!puzzle) return;
    setPlacements({});
    setSelectedSuspect(null);
    setShowSolution(false);
    setIsSolved(false);
    resetProgress(puzzle.id);
  }, [puzzle]);

  if (!puzzle) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        <div className="text-center space-y-4">
          <p className="text-xl">Puzzle not found</p>
          <button
            onClick={() => router.push("/")}
            className="text-amber-400 hover:text-amber-300 underline"
          >
            Back to cases
          </button>
        </div>
      </div>
    );
  }

  if (!loaded) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-gray-500 animate-pulse">
          Loading case file...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <button
            onClick={() => router.push("/")}
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            &larr; All Cases
          </button>
          <div className="flex-1">
            <h1 className="font-bold text-lg">
              {puzzle.title}
            </h1>
            <p className="text-xs text-gray-500">
              {puzzle.subtitle}
            </p>
          </div>
          {isSolved && (
            <span className="text-xs px-2 py-1 rounded font-medium text-green-400 bg-green-900/30">
              SOLVED
            </span>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <div className="space-y-4">
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">
                    Crime Scene
                  </h2>
                  <div className="flex gap-1.5 flex-wrap">
                    {puzzle.rooms.map((room) => (
                      <span
                        key={room}
                        className="text-[10px] px-1.5 py-0.5 rounded font-medium text-gray-800"
                        style={{
                          backgroundColor:
                            puzzle.roomColors[room],
                        }}
                      >
                        {room}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  className="text-xs text-gray-500 hover:text-red-400 transition-colors"
                >
                  Reset
                </button>
              </div>
              <PuzzleGrid
                puzzle={puzzle}
                placements={placements}
                selectedSuspect={selectedSuspect}
                onCellClick={handleCellClick}
                showSolution={showSolution}
              />
              {selectedSuspect && (
                <p className="text-center text-sm text-amber-400 mt-3 animate-pulse">
                  Click a cell to place{" "}
                  <strong>{selectedSuspect}</strong>
                </p>
              )}
            </div>

            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <MurdererGuess
                  correctAnswer={puzzle.murderer}
                  onCorrectGuess={handleCorrectGuess}
                  disabled={!allPlaced && !isSolved}
                />
                <SolutionPanel
                  puzzle={puzzle}
                  showSolution={showSolution}
                  onToggleSolution={() =>
                    setShowSolution(!showSolution)
                  }
                />
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                How to Play
              </h3>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>
                  1. Select a suspect from the panel, then
                  click a cell to place them
                </li>
                <li>
                  2. Each row and column can hold only one
                  suspect
                </li>
                <li>
                  3. Use the clues to deduce where each
                  person was
                </li>
                <li>
                  4. The murderer was alone with the victim
                  in the same room
                </li>
                <li>
                  5. Once all suspects are placed, enter the
                  murderer&apos;s name
                </li>
              </ul>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 lg:sticky lg:top-20">
              <SuspectPanel
                puzzle={puzzle}
                placements={placements}
                selectedSuspect={selectedSuspect}
                onSelectSuspect={setSelectedSuspect}
                onRemovePlacement={handleRemovePlacement}
              />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
