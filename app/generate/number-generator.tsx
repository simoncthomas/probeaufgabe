"use client";

import { useState } from "react";

const COUNT = 6;
const MAX_DIGIT = 9;

function generateUniqueNumbers(): number[] {
  const digits = Array.from({ length: MAX_DIGIT + 1 }, (_, i) => i);
  for (let i = digits.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [digits[i], digits[j]] = [digits[j], digits[i]];
  }
  return digits.slice(0, COUNT);
}

export default function NumberGenerator() {
  const [numbers, setNumbers] = useState<(number | null)[]>(
    Array(COUNT).fill(null),
  );

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
        onClick={() => setNumbers(generateUniqueNumbers())}
        className="flex h-12 w-full items-center justify-center rounded-lg bg-black text-[15px] font-bold leading-[26px] text-white transition-colors hover:bg-[#1c252e]"
      >
        Generieren
      </button>
    </div>
  );
}
