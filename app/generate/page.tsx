import type { Metadata } from "next";
import Link from "next/link";

import NumberGenerator from "./number-generator";

export const metadata: Metadata = {
  title: "Zahlen generieren",
};

export default function GeneratePage() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center px-4 py-16 font-sans">
      <header className="absolute inset-x-0 top-0 flex h-16 items-center justify-end px-4 sm:h-[72px] sm:px-6">
        <button
          type="button"
          aria-label="Settings"
          className="flex size-10 cursor-pointer items-center justify-center rounded-full text-[#1c252e] transition-colors hover:bg-[rgba(145,158,171,0.12)]"
        >
          <SettingsIcon />
        </button>
      </header>

      <main className="flex w-full max-w-[420px] flex-col items-center gap-6 rounded-2xl bg-white px-6 py-10 shadow-[0_24px_24px_rgba(145,158,171,0.16)] sm:p-10">
        <div className="flex w-full flex-col items-center gap-4 pb-4 text-center">
          <h1 className="font-heading text-xl font-semibold leading-[30px] text-[#1c252e] sm:text-2xl sm:leading-9">
            Zahlen generieren
          </h1>
          <p className="text-sm leading-[22px] text-[#637381]">
            Generiere 6 Zahlen zwischen 0 und 9, wobei keine Zahl doppelt
            vorkommen darf.
          </p>
        </div>

        <NumberGenerator />

        <Link
          href="/sign-in"
          className="flex items-center gap-2 text-sm font-semibold leading-[22px] text-[#1c252e] hover:underline"
        >
          <ArrowLeftIcon />
          Zurück
        </Link>
      </main>
    </div>
  );
}

function SettingsIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}
