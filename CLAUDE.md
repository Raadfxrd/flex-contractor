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

There is no linter, formatter, or test runner configured. Verification is manual: run `npm run dev` and scroll the page
(see `DEVELOPMENT.md` for a manual QA checklist).

## Architecture

Single-page, scroll-driven marketing site. One route (`app/pages/index.vue`) composes five section components plus an
inline footer. No state management, no API layer, no server routes — the contact form's `submitForm` only `console.log`
s.

### Directory layout is non-standard — read this before adding files

The project runs **Nuxt 4** (`nuxt@^4.4.4`), so `srcDir` is `app/`. But `components/` and `composables/` live at the
**repo root**, outside `srcDir`. Consequences:

- **Auto-imports do not apply to them.** `app/pages/index.vue` imports components with explicit relative paths
  (`import Hero from '../../components/Hero.vue'`). Follow that pattern; do not assume `<Hero />` resolves on its own.
  Same for composables — `useX()` is not auto-injected.
- **Tailwind only scans root `components/`/`composables/` because `tailwind.config.ts` hardcodes those two globs.**
  Everything under `app/` is covered by globs the `@nuxtjs/tailwindcss` module injects. If you add a new class-bearing
  directory at the root, add a matching `content` glob or its classes will be purged.
- **Path aliases follow srcDir, not the repo root.** `~` and `@` resolve to `app/`; `~~` and `@@` resolve to the repo
  root. Since `assets/`, `components/`, and `composables/` are all at the root, any alias pointing at them needs `~~`.
- Global CSS is registered as `css: ['~~/assets/css/globals.css']` in `nuxt.config.ts`. Note the `~~`: `~/assets/...`
  fails the build with "Cannot find module", because `~` is `app/`.

**Verifying a production build:** `nuxt dev` and the built server emit completely different asset URLs — dev uses
`/_nuxt/@fs/<abs-path>` module links, production emits a single hashed `entry.*.css`. If a dev server is already on :
3000, `node .output/server/index.mjs` cannot bind, exits, and requests silently hit the dev server instead. Always run
the production check on a free port (`PORT=3100 node .output/server/index.mjs`) and confirm the log line says it is
listening there.

Moving `components/`/`composables/` under `app/` would restore auto-imports and let you delete the manual imports, but
that is a deliberate refactor, not a drive-by.

### Scroll system

Scrolling is the core feature and is split across three cooperating mechanisms:

1. **CSS scroll-snap** (`assets/css/globals.css`) — snap is `y mandatory`, set on **both** `html` and `body` (UAs
   disagree about whether it is read off the root or propagated up from body; it is ignored on whichever is not the
   scroll container). Do not "soften" this to `proximity` — proximity only snaps when a scroll happens to end near a
   snap point, which reads as snapping that works half the time.

   Details: — the **root element is the one and only scroll container**, and carries `overflow-x: hidden` +
   `scroll-snap-type: y mandatory`. Never give `<body>` a height plus `overflow-y`: because `<html>`'s overflow is not
   `visible`, body's overflow does not propagate to the viewport, so body would scroll internally while
   `window.scrollY` — which the snap logic and ScrollTrigger both read — stayed pinned at 0. `scroll-behavior: smooth`
   is deliberately absent for the same reason (it fights mandatory snap and breaks scrub). The `.section-container`
   class is the snap point; `.no-snap` opts out and must stay declared after it in the stylesheet. **Every new
   full-screen section needs one of these two classes**, or it will snap unpredictably.
2. **Runtime snap gate** — every snap point on the page (hero, the four story sections, the process section) sits
   *above* `PortfolioScroller`; below it there are none, since the portfolio is pinned and contact and the footer both
   carry `.no-snap`. So `PortfolioScroller` owns a single `ScrollTrigger` (`start: 'top 80%'`, `end: 'max'`) that
   toggles `.snap-disabled` on **both `<html>` and `<body>`** for that whole region.

Two traps, both of which have already caused bugs here — any moment `.snap-disabled` is missing while scrolled below the
process section, mandatory snapping yanks the page back up to it:

- **Toggle both elements.** `scroll-snap-type` is set on html *and* body, so leaving either one snapping re-arms the
  yank.
- **Do not key the gate off `self.isActive`.** ScrollTrigger computes it as `progress > 0 && progress < 1`
  (ScrollTrigger.js:1681), so with `end: 'max'` it flips back to `false` at the very bottom of the page. The gate uses
  `onEnter`/`onLeaveBack` as a one-way switch on the start threshold instead, with `onRefresh` re-deriving from
  `self.scroll() >= self.start`. Similarly, never pass a possibly-`undefined` force to `classList.toggle` — that is
  spec'd to *flip* the class rather than force it off — one hard boundary rather than per-frame coordination with the
  pin. It is created outside the `matchMedia` block so it still holds on mobile and under reduced motion, where there is
  no pin, and its initial state is seeded explicitly because `onToggle` only fires on a change. `index.vue` has no
  scroll logic at all.

3. **Pinned horizontal scroll** (`components/PortfolioScroller.vue`) — the section pins and the track translates by
   exactly its overflow width, driven by scroll position. Below `md`, or under reduced motion, it degrades to a native
   `overflow-x-auto` scroller (`pinned` ref switches the wrapper's overflow). A pinned section must **not** also carry
   `.section-container`.

### GSAP

`gsap` is listed under `devDependencies` but is a runtime dependency; `nuxt.config.ts` pre-bundles `gsap` and
`gsap/ScrollTrigger` via `vite.optimizeDeps`.

Each component registers plugins itself (`gsap.registerPlugin(ScrollTrigger)` at module scope) and creates all
animations inside `onMounted` — that's what keeps them out of SSR. Preserve that shape; GSAP touching the DOM at setup
time will break the server render.

Every component registers its `onMounted` animations inside `gsap.matchMedia()` under
`'(prefers-reduced-motion: no-preference)'`, and calls `mm.revert()` in `onUnmounted`. That one pattern does two jobs:
it scopes the tweens so they tear down cleanly (without it ScrollTriggers survive HMR and stack up), and it gates them
on reduced motion — when the query does not match nothing runs, so content renders in its final state rather than
stranded at `opacity: 0`. Keep that shape for new animated components.

`composables/useScrollAnimation.ts`, `useSmoothScroll.ts`, and `useScrollSnap.ts` are still **imported by nothing** —
`PortfolioScroller` implements its pin inline rather than calling `createHorizontalScroll`, because it needs
component-specific `onUpdate`/`onToggle` callbacks. `DEVELOPMENT.md` describes them as the animation architecture, but
components animate inline instead. Treat them as an unadopted abstraction. `useScrollSnap` in particular duplicates and
would fight the CSS snap — read its header comment before wiring it up.

### Images

Served through `@nuxt/image` (`<NuxtImg>`, IPX provider). Sources in `public/img` are capped at 2560px; `nuxt.config.ts`
caps `screens` at `xl: 1280` so the 2x density variant lands exactly on 2560 and no variant is ever an upscale.

**`sizes` must be screen-keyed** — `sizes="xs:100vw sm:100vw ..."`. A bare `sizes="100vw"` is parsed by `parseSizes` as
the breakpoint key `"1px"` and silently emits a **1-pixel-wide** image (`/_ipx/w_1/...`). This fails silently: the build
passes and the page renders.

### Design tokens

`tailwind.config.ts` is the source of truth: `dark` `#0a0a0a`, `dark-secondary` `#1a1a1a`, `accent` **`#ffffff`** (the
site was moved to a black-and-white palette), Inter as the sans stack, `spacing.section: 100vh`. Reusable component
classes (`.section-container`, `.section-title`, `.section-subtitle`, `.gradient-overlay`, `.scroll-indicator`) are
defined in the `@layer components` block of `globals.css`.

## Stale documentation

`README.md` and `DEVELOPMENT.md` predate the current code and disagree with it in ways that will mislead:

- Both say "Nuxt 3"; the project is on Nuxt 4 with the `app/` srcDir layout.
- Both describe the accent as orange `#FFA500`; it is white `#ffffff`.
- `DEVELOPMENT.md` documents the composables as in use, and describes `PortfolioScroller` as a GSAP
  horizontal-scroll/skew effect — it is a plain native-overflow scroller with a wheel handler.
- `DEVELOPMENT.md` lists `StorySection` as having a parallax background; it does not.

Trust the code. When you change behavior these files describe, update them in the same change.
