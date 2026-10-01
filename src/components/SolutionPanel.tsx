"use client";

import { useState } from "react";
import type { Puzzle } from "@/data/puzzles";

interface SolutionPanelProps {
  puzzle: Puzzle;
  showSolution: boolean;
  onToggleSolution: () => void;
}

export default function SolutionPanel({
  puzzle,
  showSolution,
  onToggleSolution,
}: SolutionPanelProps) {
  const [confirmed, setConfirmed] = useState(false);

  if (!showSolution && !confirmed) {
    return (
      <div className="space-y-2">
        <button
          onClick={() => setConfirmed(true)}
          className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600
            text-gray-300 rounded-lg text-sm transition-colors"
        >
          Reveal Solution
        </button>
      </div>
    );
  }

  if (!showSolution && confirmed) {
    return (
      <div className="space-y-2 p-3 bg-yellow-900/20 rounded-lg border border-yellow-800">
        <p className="text-yellow-300 text-sm">
          Are you sure? This will show the full solution.
        </p>
        <div className="flex gap-2">
          <button
            onClick={onToggleSolution}
            className="flex-1 px-3 py-1.5 bg-yellow-700 hover:bg-yellow-600
              text-white rounded text-sm font-medium transition-colors"
          >
            Yes, show it
          </button>
          <button
            onClick={() => setConfirmed(false)}
            className="flex-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-600
              text-gray-300 rounded text-sm transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">
          Solution
        </h3>
        <button
          onClick={onToggleSolution}
          className="text-xs text-gray-500 hover:text-gray-300"
        >
          Hide
        </button>
      </div>
      <div className="p-3 bg-red-900/20 rounded-lg border border-red-800">
        <p className="text-red-300 text-sm font-medium">
          The murderer is{" "}
          <strong>{puzzle.murderer}</strong>
        </p>
      </div>
      <div className="space-y-2">
        {puzzle.solutionSteps.map((step, i) => (
          <div
            key={i}
            className="flex gap-2 text-xs text-gray-400"
          >
            <span className="text-amber-500 font-bold shrink-0">
              {i + 1}.
            </span>
            <span>{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
