"use client";

import type { Puzzle } from "@/data/puzzles";

interface SuspectPanelProps {
  puzzle: Puzzle;
  placements: Record<string, [number, number] | null>;
  selectedSuspect: string | null;
  onSelectSuspect: (name: string | null) => void;
  onRemovePlacement: (name: string) => void;
}

export default function SuspectPanel({
  puzzle,
  placements,
  selectedSuspect,
  onSelectSuspect,
  onRemovePlacement,
}: SuspectPanelProps) {
  const allSuspects = [
    ...puzzle.suspects,
    {
      name: puzzle.victim.name,
      clue: puzzle.victim.clue,
      color: "#EF4444",
    },
  ];

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">
        Suspects & Clues
      </h3>
      <div className="space-y-1.5">
        {allSuspects.map((s) => {
          const isPlaced = placements[s.name] != null;
          const isSelected = selectedSuspect === s.name;
          const isVictim = s.name === puzzle.victim.name;

          return (
            <div
              key={s.name}
              className={`
                group rounded-lg p-2.5 cursor-pointer transition-all
                border-2 text-sm
                ${isSelected ? "border-white shadow-lg scale-[1.02]" : "border-transparent"}
                ${isPlaced ? "opacity-50" : "opacity-100"}
                hover:border-white/50
              `}
              style={{
                backgroundColor: isSelected
                  ? `${s.color}33`
                  : `${s.color}15`,
              }}
              onClick={() => {
                if (isPlaced) return;
                onSelectSuspect(
                  isSelected ? null : s.name,
                );
              }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center
                    text-white text-xs font-bold shrink-0"
                  style={{ backgroundColor: s.color }}
                >
                  {s.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-white">
                      {s.name}
                    </span>
                    {isVictim && (
                      <span className="text-[10px] bg-red-900/60 text-red-300 px-1.5 py-0.5 rounded font-medium">
                        VICTIM
                      </span>
                    )}
                    {isPlaced && (
                      <span className="text-[10px] bg-green-900/60 text-green-300 px-1.5 py-0.5 rounded font-medium">
                        PLACED
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5 leading-snug">
                    {s.clue}
                  </p>
                </div>
                {isPlaced && (
                  <button
                    className="text-xs text-red-400 hover:text-red-300
                      opacity-0 group-hover:opacity-100 transition-opacity
                      px-1.5 py-0.5 rounded hover:bg-red-900/30"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemovePlacement(s.name);
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
