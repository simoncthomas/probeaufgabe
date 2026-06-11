"use client";

import { useState } from "react";

const COUNT = 6;
const HISTORY_SIZE = 3;
const MAX_ATTEMPTS = 100;

const ALL_DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// Step 1: Shuffle the digits 0-9 into a random order, then keep the first COUNT.
// Because we shuffle real digits, they are random and never repeat.
function pickRandomDigits(): number[] {
  const shuffled = [...ALL_DIGITS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, COUNT);
}

// Step 2: Describe the "shape" of a result by comparing each digit to the next.
// "<" means it went up, ">" means it went down.
// Example: 0-5-6-2-1-9 -> "<<>><" (0<5, 5<6, 6>2, 2>1, 1<9).
function getPattern(numbers: number[]): string {
  return numbers
    .map((digit, i) => (digit < numbers[i + 1] ? "<" : ">"))
    .slice(0, -1)
    .join("");
}

// Step 3: Keep generating until we get a shape we haven't shown recently.
// We cap the tries so the app can never get stuck in an endless loop.
function generateUniqueNumbers(recentPatterns: string[]): number[] {
  for (let tries = 0; tries < MAX_ATTEMPTS; tries++) {
    const candidate = pickRandomDigits();

    if (!recentPatterns.includes(getPattern(candidate))) {
      return candidate;
    }
  }

  // Fallback: keep going until the pattern is fresh.
  // Safe from infinite loops: at most 3 patterns are forbidden out of 32 possible.
  let candidate = pickRandomDigits();
  while (recentPatterns.includes(getPattern(candidate))) {
    candidate = pickRandomDigits();
  }
  return candidate;
}

export default function NumberGenerator() {
  const [numbers, setNumbers] = useState<(number | null)[]>(
    Array(COUNT).fill(null),
  );

  const [recentPatterns, setRecentPatterns] = useState<string[]>([]);

  const handleGenerate = () => {
    const next = generateUniqueNumbers(recentPatterns);
    setNumbers(next);
    setRecentPatterns((prev) =>
      [getPattern(next), ...prev].slice(0, HISTORY_SIZE),
    );
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex w-full items-center justify-center gap-2.5">
        {numbers.map((value, index) => (
          <div
            key={index}
            className="flex h-[53px] flex-1 items-center justify-center rounded-lg bg-[rgba(145,158,171,0.08)] text-sm leading-[22px] tabular-nums"
          >
            <span className={value === null ? "text-[#919eab]" : "text-[#1c252e]"}>
              {value === null ? "-" : value}
            </span>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleGenerate}
        className="flex h-12 w-full cursor-pointer items-center justify-center rounded-lg bg-black text-[15px] font-bold leading-[26px] text-white transition-colors hover:bg-[#1c252e]"
      >
        Generieren
      </button>
    </div>
  );
}
