"use client";

import { useState } from "react";

interface MurdererGuessProps {
  correctAnswer: string;
  onCorrectGuess: () => void;
  disabled: boolean;
}

export default function MurdererGuess({
  correctAnswer,
  onCorrectGuess,
  disabled,
}: MurdererGuessProps) {
  const [guess, setGuess] = useState("");
  const [status, setStatus] = useState<
    "idle" | "wrong" | "correct"
  >("idle");
  const [attempts, setAttempts] = useState(0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = guess.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === correctAnswer.toLowerCase()) {
      setStatus("correct");
      onCorrectGuess();
    } else {
      setStatus("wrong");
      setAttempts((a) => a + 1);
      setTimeout(() => setStatus("idle"), 2000);
    }
  }

  if (status === "correct") {
    return (
      <div className="text-center py-6 space-y-3 animate-in fade-in duration-500">
        <div className="text-5xl">🎉</div>
        <h3 className="text-2xl font-bold text-green-400">
          Case Solved!
        </h3>
        <p className="text-green-300">
          Correct! <strong>{correctAnswer}</strong> is the
          murderer.
        </p>
        <p className="text-sm text-gray-500">
          Solved in {attempts + 1} attempt
          {attempts > 0 ? "s" : ""}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">
        Who is the murderer?
      </h3>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder={
            disabled
              ? "Place all suspects first..."
              : "Enter suspect name..."
          }
          disabled={disabled}
          className={`
            flex-1 px-3 py-2 rounded-lg bg-gray-800 border text-white
            text-sm placeholder:text-gray-500
            focus:outline-none focus:ring-2 focus:ring-amber-500
            disabled:opacity-40 disabled:cursor-not-allowed
            ${status === "wrong" ? "border-red-500 animate-shake" : "border-gray-600"}
          `}
        />
        <button
          type="submit"
          disabled={disabled || !guess.trim()}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-500
            text-white font-bold rounded-lg text-sm
            disabled:opacity-40 disabled:cursor-not-allowed
            transition-colors"
        >
          Accuse
        </button>
      </form>
      {status === "wrong" && (
        <p className="text-red-400 text-sm animate-in fade-in">
          Wrong! That person is not the murderer. Try again.
        </p>
      )}
      {attempts > 2 && status !== "wrong" && (
        <p className="text-gray-500 text-xs">
          Hint: The murderer was alone with the victim in
          the same room.
        </p>
      )}
    </div>
  );
}
