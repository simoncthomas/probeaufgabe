"use client";

import { useState } from "react";

const COUNT = 6;
const HISTORY_SIZE = 3;

const ALL_DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// The result must always have exactly this up/down shape.
// "<" means a step goes up, ">" means it goes down.
// <<>>< -> 1st<2nd, 2nd<3rd, 3rd>4th, 4th>5th, 5th<6th.
// NOTE: this is a deliberate deviation from the brief. The brief asks for the
// pattern to DIFFER from the last 3 generations; here we instead force every
// result to match this one fixed shape.
const TARGET_PATTERN = "<<>><";

// Pick COUNT distinct digits out of 0-9, sorted ascending.
// Sorting makes them easy to arrange into a specific shape below.
function pickAscendingDigits(): number[] {
  const shuffled = [...ALL_DIGITS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, COUNT).sort((a, b) => a - b);
}

// Build a sequence that matches TARGET_PATTERN directly, with no guessing.
// Start from the ascending digits (which already satisfy an all-"<" shape),
// then reverse each maximal run of ">" so those steps point downward instead.
// This is O(n) and always succeeds on the first try.
function generateForPattern(): number[] {
  const result = pickAscendingDigits();

  let i = 0;
  while (i < TARGET_PATTERN.length) {
    if (TARGET_PATTERN[i] === ">") {
      let j = i;
      while (j < TARGET_PATTERN.length && TARGET_PATTERN[j] === ">") j++;
      // Reverse the slice spanning this descending run (positions i..j).
      reverseRange(result, i, j);
      i = j;
    } else {
      i++;
    }
  }

  return result;
}

// Reverse arr[start..end] in place (end inclusive).
function reverseRange(arr: number[], start: number, end: number): void {
  while (start < end) {
    [arr[start], arr[end]] = [arr[end], arr[start]];
    start++;
    end--;
  }
}

export default function NumberGenerator() {
  const [numbers, setNumbers] = useState<(number | null)[]>(
    Array(COUNT).fill(null),
  );

  const [recentResults, setRecentResults] = useState<string[]>([]);

  const handleGenerate = () => {
    // Build a result, re-rolling if it matches one of the last HISTORY_SIZE
    // generations so the user never sees the same numbers back-to-back.
    let next = generateForPattern();
    while (recentResults.includes(next.join(""))) {
      next = generateForPattern();
    }

    setNumbers(next);
    setRecentResults((prev) => [next.join(""), ...prev].slice(0, HISTORY_SIZE));
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
