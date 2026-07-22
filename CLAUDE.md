# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this is

`.G` — a single-page marketing/landing site for a Ukrainian dry gin, built with Next.js (App Router). UI copy is in Ukrainian. The page sells one product (466 грн / 0.5L bottle) and collects orders through a simple lead-capture form; there is no cart, checkout, or payment integration — orders are just logged server-side pending a real backend.

## Commands

```
npm run dev      # start dev server (Turbopack, per Next.js 16 default)
npm run build    # production build
npm run start    # run production build
npm run lint     # eslint (flat config via eslint-config-next)
```

No test suite is configured.

## Architecture

**Everything lives on one route** (`src/app/page.tsx`), assembled from section components rendered in order: `ProductHero → Story → TastingProfile → Serve → OrderForm`, wrapped by `Header`/`Footer` and `AgeGate` in `src/app/layout.tsx`. Each section component is self-contained presentational markup (Tailwind v4 classes) with no shared state — when adding a new section, follow this pattern rather than introducing shared layout state.

**Order flow**: `OrderForm` (`src/components/OrderForm.tsx`, client component) validates with the shared Zod schema on submit, then POSTs JSON to `/api/orders` (`src/app/api/orders/route.ts`), which re-validates with the *same* schema server-side before computing the total and logging the order. The validation schema (`src/lib/orderSchema.ts`) is the single source of truth for order fields — client and server both import it, so changes to order fields only need to happen there. Persisting orders (DB) and notifications (email) are explicitly not implemented yet (see the `TODO` in `route.ts`).

**Age gate**: `AgeGate` (`src/components/AgeGate.tsx`) is a client component rendered at the top of the body in `layout.tsx`. It gates the whole site behind an 18+ confirmation, tracked via `sessionStorage` (`age-verified` key) so it only prompts once per session. Declining redirects off-site.

**Styling**: Tailwind CSS v4 via `@tailwindcss/postcss`, no `tailwind.config` — theme tokens (`--background`, `--foreground`, `--accent`) are defined as CSS variables in `src/app/globals.css` under `@theme inline` and consumed as `var(--accent)` etc. throughout components rather than Tailwind color names.

**Path alias**: `@/*` maps to `src/*` (see `tsconfig.json`).

## Framework version note

This project is on a newer/breaking Next.js version than typical training data reflects (see `AGENTS.md`). Before using an App Router API you're not certain about (route handlers, config options, caching/revalidation, adapters), check `node_modules/next/dist/docs/01-app/` rather than relying on prior knowledge.
