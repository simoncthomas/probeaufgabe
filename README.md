# Number Generator – TJ Labs Frontend Task

A small Next.js app that implements a Figma design pixel-for-pixel and solves the number-generator logic task. Built over the course of the task window with my own additions on top of the base requirements.

- **Live demo:** _<add your Vercel URL here>_
- **Repo:** _<this repo>_

## Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript** (strict mode)
- **Tailwind CSS v4**
- Deployed on **Vercel**

Fonts come from the design: **Barlow** for headings, **Public Sans** for body text, both loaded via `next/font`.

## How to run

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000. The root route redirects to `/sign-in`.

## My approach (the part that actually matters)

**Tooling.** I built this in Cursor (Opus 4.8) and used the Figma **Dev Mode MCP server** so the editor could read the design directly. My first move was literally to ask the assistant *"how do I implement a Figma file pixel-correct in a Next.js project?"* and then wire up the MCP connection. That let me pull exact colors, spacing and font weights out of the design instead of eyeballing them — which is why the values in the code are concrete (`#1c252e`, `#637381`, `rgba(145,158,171,0.08)`, the `0 24px 24px` card shadow, the `53px` field height, etc.) rather than approximations.

**Build order.**

1. Built the **Sign in** page first, matching the design closely.
2. Decided the sign-in page should be the **homepage**, so `app/page.tsx` just `redirect()`s to `/sign-in`.
3. Added the **generator** page and linked the two together (sign-in → generate, and a "Zurück" link back).
4. Added **mobile responsiveness** (the card scales down, padding shrinks on small screens, the number boxes use `flex-1` so they stay even).
5. Deployed to **Vercel** and verified it works live.

**One detail I couldn't leave alone.** On the password field, the eye/show-password icon wasn't optically centered — it sat slightly high. The design didn't even show a hover state, but the off-center icon bugged me, so I nudged the closed-eye icon down `2px` (`translate-y-[2px]`) and added a subtle circular hover background to the icon button and the settings button. Small thing, but it's the kind of polish I notice.

## The generator logic

The requirement: produce **6 distinct digits in the range 0–9**, where each digit appears only once, **and** the result must not repeat the up/down "pattern" of the last 3 generations.

My reasoning, step by step (this maps directly to `app/generate/number-generator.tsx`):

**1. Uniqueness for free.** Instead of generating random digits and rejecting duplicates, I shuffle the full array `[0..9]` and take the first 6. Since I'm picking from real, distinct digits, they can never repeat — no retry loop needed for uniqueness.

**2. Defining "pattern".** A pattern is the shape of the sequence: for each neighboring pair, `<` if it goes up and `>` if it goes down. So `0-5-6-2-1-9` → `<<>><`. With 6 numbers that's 5 comparisons. A nice side effect of using distinct digits: two neighbors are never equal, so I never have to deal with a `=` case — every comparison is cleanly `<` or `>`.

**3. Avoiding recent patterns.** I keep the last 3 patterns in state. When generating, I draw candidates and reject any whose pattern is in that recent list. There are only 2⁵ = 32 possible patterns and at most 3 are ever forbidden, so a fresh one is found almost immediately.

**4. Not trusting `Math.random()` blindly.** I cap the rejection loop at 100 attempts so the UI can never hang. If it somehow burned through all attempts, there's a guaranteed fallback loop afterwards — but because only 3 of 32 patterns are blocked, that fallback realistically never runs. It's a safety net, not a code path I expect to hit.

## Things I added beyond the spec

- **Show/hide password toggle** with proper `aria-label` / `aria-pressed` for accessibility.
- **Redirect homepage → sign-in** so the entry point makes sense.
- **Linked navigation** between the two screens.
- **Hover states** the design didn't specify, plus the icon-centering fix mentioned above.
- **Mobile layout** so it holds up below the design's desktop breakpoint.

## Trade-offs & what I'd do differently in a real project

- **Commit history isn't ideal.** I set up the GitHub repo in parallel with building, so the history doesn't read as cleanly as I'd like (the first commit is the raw `create-next-app` scaffold). In a real workflow I'd init the repo first and commit in smaller, intention-revealing steps.
- **The auth is fake.** The "Sign in" button doesn't authenticate — it's a static form, and the link goes straight to `/generate`. For a real app I'd wire up actual auth (e.g. a server action / auth provider), validation, and protect the generate route.
- **`Math.random()` is fine here, but not for anything that matters.** For a real "lottery-style" generator I'd reach for `crypto.getRandomValues()` to avoid bias and make it non-predictable.
- **Pattern history is in-memory only.** It resets on reload. If the rule needed to persist across sessions, I'd move it to `localStorage` or the backend.
- **Design tokens are inline.** I used exact hex values straight from Figma to hit the design fast. At scale I'd lift these into the Tailwind theme / CSS variables so they're reusable and themeable instead of repeated per component.
- **No tests.** The generator logic is small but very testable (uniqueness, range, pattern correctness, "differs from last 3"). In a real codebase I'd add unit tests for exactly those invariants.

## Time management

I front-loaded getting the design pixel-accurate (since that's explicitly what's being evaluated), then spent the focused time on the generator logic and thinking through its edge cases, and finished with responsiveness and deployment. I deliberately kept the scope tight and added small, meaningful extras rather than over-engineering.
