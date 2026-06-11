import type { Metadata } from "next";
import Link from "next/link";

import PasswordField from "./password-field";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function SignInPage() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center px-4 py-16 font-sans">
      <main className="flex w-full max-w-[420px] flex-col items-center rounded-2xl bg-white px-6 py-10 shadow-[0_24px_24px_rgba(145,158,171,0.16)] sm:p-10">
        <div className="flex flex-col items-center gap-3 pb-8 text-center">
          <h1 className="font-heading text-xl font-semibold leading-[30px] text-[#1c252e] sm:text-2xl sm:leading-9">
            Sign in
          </h1>
          <p className="flex items-center gap-1 text-sm leading-[22px] text-[#637381]">
            Don&apos;t have an account?
            <Link
              href="#"
              className="font-semibold text-black hover:underline"
            >
              Get started
            </Link>
          </p>
        </div>

        <form className="flex w-full flex-col gap-6">
          <div className="flex w-full flex-col">
            <div className="flex h-[53px] w-full flex-col justify-center rounded-lg bg-[rgba(145,158,171,0.08)] pl-3 pr-2.5">
              <label
                htmlFor="email"
                className="text-xs font-semibold leading-3 text-[#637381]"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="w-full bg-transparent text-[15px] leading-[22px] text-[#1c252e] outline-none placeholder:text-[#919eab]"
              />
            </div>
          </div>

          <PasswordField />

          <Link
            href="/generate"
            className="w-full text-right text-sm leading-[22px] text-[#1c252e] hover:underline"
          >
            Generate numbers
          </Link>

          <button
            type="submit"
            className="flex h-12 w-full cursor-pointer items-center justify-center rounded-lg bg-black text-[15px] font-bold leading-[26px] text-white transition-colors hover:bg-[#1c252e]"
          >
            Sign in
          </button>
        </form>
      </main>
    </div>
  );
}
