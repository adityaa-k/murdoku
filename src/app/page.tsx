"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { puzzles } from "@/data/puzzles";
import { isPuzzleSolved, getSolvedCount } from "@/lib/progress";

export default function Home() {
  const router = useRouter();
  const [solvedMap, setSolvedMap] = useState<
    Record<string, boolean>
  >({});
  const [totalSolved, setTotalSolved] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const map: Record<string, boolean> = {};
    for (const p of puzzles) {
      map[p.id] = isPuzzleSolved(p.id);
    }
    setSolvedMap(map);
    setTotalSolved(getSolvedCount());
    setLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-5xl font-black tracking-tight">
            MURD
            <span className="text-red-500">O</span>
            KU
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            Murder Mystery Logic Puzzles
          </p>
          {loaded && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="h-2 flex-1 max-w-[200px] bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${(totalSolved / puzzles.length) * 100}%`,
                  }}
                />
              </div>
              <span className="text-xs text-gray-500">
                {totalSolved}/{puzzles.length} solved
              </span>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs text-gray-400">
              <div className="flex items-start gap-2">
                <span className="text-amber-500 font-bold text-sm">
                  1
                </span>
                <span>
                  Read the clues for each suspect to figure
                  out where they were
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-500 font-bold text-sm">
                  2
                </span>
                <span>
                  Place suspects on the grid — one per row,
                  one per column
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-500 font-bold text-sm">
                  3
                </span>
                <span>
                  The victim was alone with the murderer in
                  the same room
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-500 font-bold text-sm">
                  4
                </span>
                <span>
                  Name the murderer to solve the case and
                  earn your badge
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {puzzles.map((p, i) => {
            const solved = solvedMap[p.id];
            return (
              <button
                key={p.id}
                onClick={() => router.push(`/puzzle/${p.id}`)}
                className={`
                  group text-left rounded-xl p-5 border transition-all
                  hover:scale-[1.02] hover:shadow-xl
                  ${solved ? "bg-green-900/10 border-green-800/50" : "bg-gray-900 border-gray-800 hover:border-gray-600"}
                `}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-gray-600 text-xs font-mono">
                    CASE #{String(i + 1).padStart(2, "0")}
                  </span>
                  {solved && (
                    <span className="text-green-400 text-lg">
                      ✓
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-lg group-hover:text-amber-400 transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {p.subtitle}
                </p>
              </button>
            );
          })}
        </div>

      </main>
    </div>
  );
}
