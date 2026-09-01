# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # postinstall runs `nuxt prepare` (regenerates .nuxt types)
npm run dev          # dev server on http://localhost:3000
npm run build        # production build -> .output/
npm run generate     # static prerender
npm run preview      # serve the built output
```

There is no linter, formatter, or test runner configured. Verification is manual: run `npm run dev` and scroll the page (see `DEVELOPMENT.md` for a manual QA checklist).

## Architecture

Single-page, scroll-driven marketing site. One route (`app/pages/index.vue`) composes five section components plus an inline footer. No state management, no API layer, no server routes — the contact form's `submitForm` only `console.log`s.

### Directory layout is non-standard — read this before adding files

The project runs **Nuxt 4** (`nuxt@^4.4.4`), so `srcDir` is `app/`. But `components/` and `composables/` live at the **repo root**, outside `srcDir`. Consequences:

- **Auto-imports do not apply to them.** `app/pages/index.vue` imports components with explicit relative paths (`import Hero from '../../components/Hero.vue'`). Follow that pattern; do not assume `<Hero />` resolves on its own. Same for composables — `useX()` is not auto-injected.
- **Tailwind only scans root `components/` because `tailwind.config.ts` hardcodes `./components/**`.** The `./layouts/**`, `./pages/**`, and `./app.vue` globs in that file are dead paths (those files are under `app/`); the `@nuxtjs/tailwindcss` module injects `app/**` globs separately. If you add a new class-bearing directory at the root, add a matching `content` glob or its classes will be purged.
- Global CSS is not registered via `nuxt.config.ts` — `app/app.vue` imports `../assets/css/globals.css` directly.

Moving `components/`/`composables/` under `app/` would restore auto-imports and let you delete the manual imports, but that is a deliberate refactor, not a drive-by.

### Scroll system

Scrolling is the core feature and is split across three cooperating mechanisms:

1. **CSS scroll-snap** (`assets/css/globals.css`) — `body` has `scroll-snap-type: y mandatory`. The `.section-container` component class is the snap point (`scroll-snap-align: start; scroll-snap-stop: always`); `.no-snap` opts an element out. **Every new full-screen section needs one of these two classes**, or it will snap unpredictably.
2. **Runtime snap toggle** (`app/pages/index.vue`) — a scroll listener adds `.snap-disabled` to `<html>`/`<body>` once `scrollY` reaches `#portfolio-section`, and removes it half a viewport before. This exists because vertical snapping fights the portfolio's horizontal scroll. `.snap-disabled` rules in `globals.css` neutralize snapping with `!important`.
3. **Wheel capture** (`components/PortfolioScroller.vue`) — translates vertical wheel deltas into `scrollLeft`, and stops calling `preventDefault` at either edge so vertical scrolling resumes.

Changing any one of these three usually requires touching the others.

### GSAP

`gsap` is listed under `devDependencies` but is a runtime dependency; `nuxt.config.ts` pre-bundles `gsap` and `gsap/ScrollTrigger` via `vite.optimizeDeps`.

Each component registers plugins itself (`gsap.registerPlugin(ScrollTrigger)` at module scope) and creates all animations inside `onMounted` — that's what keeps them out of SSR. Preserve that shape; GSAP touching the DOM at setup time will break the server render.

`composables/useScrollAnimation.ts`, `useSmoothScroll.ts`, and `useScrollSnap.ts` are **currently imported by nothing**. `DEVELOPMENT.md` describes them as the animation architecture, but components animate inline instead. Treat the composables as an unadopted abstraction: either wire a component through one deliberately, or keep animating inline — don't assume calling them is the established convention.

### Design tokens

`tailwind.config.ts` is the source of truth: `dark` `#0a0a0a`, `dark-secondary` `#1a1a1a`, `accent` **`#ffffff`** (the site was moved to a black-and-white palette), Inter as the sans stack, `spacing.section: 100vh`. Reusable component classes (`.section-container`, `.section-title`, `.section-subtitle`, `.gradient-overlay`, `.scroll-indicator`) are defined in the `@layer components` block of `globals.css`.

## Stale documentation

`README.md` and `DEVELOPMENT.md` predate the current code and disagree with it in ways that will mislead:

- Both say "Nuxt 3"; the project is on Nuxt 4 with the `app/` srcDir layout.
- Both describe the accent as orange `#FFA500`; it is white `#ffffff`.
- `DEVELOPMENT.md` documents the composables as in use, and describes `PortfolioScroller` as a GSAP horizontal-scroll/skew effect — it is a plain native-overflow scroller with a wheel handler.

Trust the code. When you change behavior these files describe, update them in the same change.
