"use client";

const STORAGE_KEY = "murdoku-progress";

export interface PuzzleProgress {
  solved: boolean;
  murdererGuessed: boolean;
  placements: Record<string, [number, number] | null>;
  startedAt: string;
  completedAt?: string;
}

export type AllProgress = Record<string, PuzzleProgress>;

function getAll(): AllProgress {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AllProgress) : {};
  } catch {
    return {};
  }
}

function saveAll(data: AllProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getProgress(
  puzzleId: string,
): PuzzleProgress | null {
  const all = getAll();
  return all[puzzleId] ?? null;
}

export function savePlacement(
  puzzleId: string,
  suspectName: string,
  position: [number, number] | null,
): void {
  const all = getAll();
  if (!all[puzzleId]) {
    all[puzzleId] = {
      solved: false,
      murdererGuessed: false,
      placements: {},
      startedAt: new Date().toISOString(),
    };
  }
  all[puzzleId].placements[suspectName] = position;
  saveAll(all);
}

export function markSolved(puzzleId: string): void {
  const all = getAll();
  if (all[puzzleId]) {
    all[puzzleId].solved = true;
    all[puzzleId].murdererGuessed = true;
    all[puzzleId].completedAt = new Date().toISOString();
  }
  saveAll(all);
}

export function resetProgress(puzzleId: string): void {
  const all = getAll();
  delete all[puzzleId];
  saveAll(all);
}

export function getSolvedCount(): number {
  const all = getAll();
  return Object.values(all).filter((p) => p.solved).length;
}

export function isPuzzleSolved(puzzleId: string): boolean {
  const progress = getProgress(puzzleId);
  return progress?.solved ?? false;
}
