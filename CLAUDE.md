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

There is no linter, formatter, or test runner configured. Verification is manual: run
`npm run dev` and work through the checklist in `DEVELOPMENT.md`.

## Architecture

Multipage marketing site for a general contractor, built around one scroll-driven homepage. Nine routes: the homepage,
`/services` + `/services/[slug]`, `/projects` +
`/projects/[slug]`, `/about`, `/contact`, `/careers`, `/privacy`, plus `app/error.vue`
for 404/500.

details, the four service divisions and the five case studies. The homepage story panels, the footer, the sitemap and
the cross-links between services and projects are all derived from those arrays — **add content there, not in a
template**, or the two copies drift.

### Directory layout

Nuxt 4, so `srcDir` is `app/`, and `components/`, `composables/`, `data/` and `assets/`
all now live **inside** it. That means auto-imports work normally: `<Hero />`,
`useScrollSnap()` and `useSeo()` resolve without an import line. `~`/`@` resolve to
`app/`; `~~`/`@@` resolve to the repo root.

(This was not always true. Until recently those directories sat at the repo root, outside
`srcDir`, which forced explicit relative imports and a hand-maintained Tailwind content glob. If you find a stale
`../../components/X.vue` import anywhere, it is a leftover.)

`app/data/*.ts` is **not** auto-imported — import it explicitly (`import {services} from
'~/data/services'`). That is deliberate: these are data modules, not composables.

Global CSS is handed to the Tailwind module as its `cssPath`, **not** pushed onto the
`css:` array:

```ts
tailwindcss: {
    cssPath: '~/assets/css/globals.css'
}
```

The module injects a virtual stylesheet carrying the three `@tailwind` directives when it cannot find a `cssPath` of its
own. Registering globals.css through `css:` instead leaves both in the bundle and the whole Tailwind output ships twice.

**Verifying a production build:** `nuxt dev` and the built server emit completely different asset URLs — dev uses
`/_nuxt/@fs/<abs-path>` module links, production emits a single hashed `entry.*.css`. Always run the production check on
a free port (`PORT=3100 node .output/server/index.mjs`) and **confirm the log line says it is listening there**. If
something is already bound to the port, the new process dies with
`EADDRINUSE` and every request silently hits the *old* server — you will be testing a stale build and not know it. Note
that `kill %1` does not work across separate shell invocations; kill by port instead:

```bash
lsof -tiTCP:3100 -sTCP:LISTEN | xargs -r kill
```

### Scroll system

Scrolling is the homepage's core feature and is split across three cooperating mechanisms.

1. **CSS scroll-snap, opted in per page** (`app/assets/css/globals.css`). Snap is
   `y mandatory`, declared on `html.snap-enabled` **and** `body.snap-enabled` (UAs disagree about whether the viewport
   reads it off the root or has it propagated up from body; it is ignored on whichever is not the scroll container).

   The class comes from `useScrollSnap()`, called by `app/pages/index.vue` **and nowhere else**. It is applied through
   `useHead()` rather than a `classList` write, so it is in the server-rendered HTML (no unsnapped first paint) and
   unhead removes it on route change. Snapping used to be unconditional on `html`/`body`; that was fine while the site
   was one page, but it applies to every route, so any ordinary page with a full-height block started jumping.

   Do not "soften" this to `proximity` — proximity only snaps when a scroll happens to end near a snap point, which
   reads as snapping that works half the time.

   `useScrollSnap()` also installs an **animated wheel handler**, because CSS snap on its own does not animate for a
   plain mouse. `mandatory` snapping only animates the settle when the browser is animating the scroll in the first
   place: a trackpad emits a stream of small deltas so the browser eases into the snap point, but a mouse emits one
   large discrete notch — the scroll lands instantly and the snap engine re-targets in the same frame, so the page
   appears to teleport. There is no animation being skipped; the browser never started one.

   `scroll-behavior: smooth` does **not** fix this. Per spec, it applies to navigation and scripted scrolls only,
   explicitly *not* to input scrolling — and it breaks ScrollTrigger's scrub as a bonus. So the handler `preventDefault`
   s the wheel, finds the next snap point in the direction of travel, and tweens the scroll position itself.

   Four things that handler must keep doing:
    - **Stand CSS snap down for the length of the tween** via `.snap-animating`. It is
      `mandatory`, so it re-targets on every frame and fights the tween to a standstill. That class is separate from
      `.snap-disabled` so the two owners never clobber each other.
    - **Handle the downward exit explicitly.** Below the last snap point there are no more snap points, but CSS snapping
      stays armed until the portfolio gate fires at `top 80%` — about a fifth of a viewport further down. Handing that
      boundary back to native scrolling does not work: one mouse notch (~100px) never reaches the gate, so
      `mandatory` snapping finds the section you just left as the only candidate and yanks straight back. Every notch
      gets undone and the page is stuck. A trackpad escapes only because one flick travels far enough to trip the gate
      mid-gesture — which is exactly why this reads as "works on trackpad, broken on mouse". The handler therefore
      animates all the way to the bottom of the last snapping section, clearing the gate by a full viewport. Going *up*,
      and at the top of the hero, native scrolling is still correct and the handler must not `preventDefault`.
    - **Call `ScrollTrigger.update()` before dropping `.snap-animating`.** The gate only runs off scroll events; without
      a forced update the exit tween can finish before the gate has processed the final position, and re-arming snap a
      full viewport below its nearest snap point hauls the page back up.
    - **Release the busy lock on interrupt, not just on complete.** A killed tween that never clears the flag leaves the
      page unable to respond to the wheel at all.

   It is gated on `prefers-reduced-motion: no-preference` — under reduced motion CSS snapping is already off and the
   page is a plain document.

   Details: the **root element is the one and only scroll container**, and carries
   `overflow-x: hidden`. Never give `<body>` a height plus `overflow-y`: because `<html>`'s overflow is not `visible`,
   body's overflow does not propagate to the viewport, so body would scroll internally while `window.scrollY` — which
   the snap logic and ScrollTrigger both read — stayed pinned at 0. `scroll-behavior: smooth` is deliberately absent for
   the same reason (it fights mandatory snap and breaks scrub). `.section-container` is the snap point; `.no-snap` opts
   out. **Every new full-screen section on the homepage needs one of those two classes**, or it will snap unpredictably.

2. **Runtime snap gate.** Every snap point on the homepage (hero, the four-story sections, the process section) sits
   *above* `PortfolioScroller`; below it there are none, since the portfolio is pinned and contact and the footer both
   carry `.no-snap`. So
   `PortfolioScroller` owns a single `ScrollTrigger` (`start: 'top 80%'`, `end: 'max'`)
   that toggles `.snap-disabled` on **both `<html>` and `<body>`** for that whole region.
   `.snap-disabled` beats `.snap-enabled` with `!important`.

   Three traps, all of which have already caused bugs here — any moment `.snap-disabled` is missing while scrolled below
   the process section, mandatory snapping yanks the page back up to it:
    - **Toggle both elements.** Leaving either one snapping re-arms the yank.
    - **Do not key the gate off `self.isActive`.** ScrollTrigger computes it as
      `progress > 0 && progress < 1` (ScrollTrigger.js:1681), so with `end: 'max'` it flips back to `false` at the very
      bottom of the page. The gate uses `onEnter`/`onLeaveBack`
      as a one-way switch on the start threshold instead, with `onRefresh` re-deriving from
      `self.scroll() >= self.start`.
    - **Never pass a possibly-`undefined` force to `classList.toggle`** — that is spec'd to *flip* the class rather than
      force it off.

   It is created outside the `matchMedia` block so it still holds on mobile and under reduced motion, where there is no
   pin, and its initial state is seeded explicitly because `onToggle` only fires on a change. `index.vue` has no scroll
   logic at all.

3. **Pinned horizontal scroll** (`app/components/PortfolioScroller.vue`) — the section pins and the track translates by
   exactly its overflow width, driven by scroll position. Below
   `md`, or under reduced motion, it degrades to a native `overflow-x-auto` scroller (`pinned` ref switches the
   wrapper's overflow). A pinned section must **not** also carry
   `.section-container`.

   The cards are links to case studies, which creates a keyboard trap the pin does not handle on its own: tabbing to a
   card the pin has translated off-screen makes the browser scroll the nearest scrollable ancestor (the
   `overflow-hidden` `<section>`, which is still programmatically scrollable) and the layout skews. A `focusin` handler
   drives the *page*
   scroll to the position whose pin progress reveals that card, and resets the ancestor's own scroll offsets. Keep it if
   you touch the cards.

### GSAP

`gsap` is a runtime dependency; `nuxt.config.ts` pre-bundles `gsap` and `gsap/ScrollTrigger`
via `vite.optimizeDeps`.

Each component registers plugins itself (`gsap.registerPlugin(ScrollTrigger)` at module scope) and creates all
animations inside `onMounted` — that's what keeps them out of SSR. Preserve that shape; GSAP touching the DOM at setup
time will break the server render.

Every component registers its `onMounted` animations inside `gsap.matchMedia()` under
`'(prefers-reduced-motion: no-preference)'`, and calls `mm.revert()` in `onUnmounted`. That one pattern does two jobs:
it scopes the tweens so they tear down cleanly (without it ScrollTriggers survive HMR and stack up), and it gates them
on reduced motion — when the query does not match anything, nothing runs, so content renders in its final state rather
than stranded at `opacity: 0`. Keep that shape for new animated components.

Prefer **one timeline off one trigger** to several elements each carrying their own ScrollTrigger with hand-tuned
`delay`s. On a mandatory-snap page the section arrives at the top almost instantly, so independent triggers all resolve
in the same frame and the intended stagger never actually reads.

### Images

Served through `@nuxt/image` (`<NuxtImg>`, IPX provider). Sources in `public/img` are capped at 2560px; `nuxt.config.ts`
caps `screens` at `xl: 1280` so the 2x density variant lands exactly on 2560 and no variant is ever an upscale.

**`sizes` must be screen-keyed** — `sizes="xs:100vw sm:100vw ..."`. A bare `sizes="100vw"`
is parsed by `parseSizes` as the breakpoint key `"1px"` and silently emits a **1-pixel-wide** image (`/_ipx/w_1/...`).
This fails silently: the build passes and the page renders. Grep the rendered HTML for `_ipx/w_1/` after adding an
image.

### Design system

Strict monochrome — **there is deliberately no accent hue.** Emphasis is carried by surface layering, hairlines, weight
and scale. `accent` is `#ffffff` because in this system the emphasis colour genuinely is white: an inverted fill, not a
colour. The primary button is the only white-filled surface on the page, and that inversion *is* the emphasis — so
nothing else anywhere gets a white fill.

`tailwind.config.ts` is the source of truth:

- Surfaces step `ink #0a0a0a` → `surface #121212` → `surface-2 #1a1a1a` → `surface-3 #242424`, so a card on a panel on
  the page ground is distinguishable without a border.
- Body text uses Tailwind's built-in **`neutral`** ramp, not `gray`. `gray` is blue-tinted (`#9ca3af`) and reads cold
  against pure black.
- Two families: `font-display` (Archivo — headings, numerals, eyebrows, buttons) against
  `font-sans` (Inter — body). With no accent colour, that contrast is what carries the hierarchy.
- Fonts are `<link>`ed from `app.head` in `nuxt.config.ts` with preconnects — **not**
  `@import`ed at the top of globals.css, which is a render-blocking third-party request chained behind our own
  stylesheet.

Reusable component classes live in the `@layer components` block of globals.css:
`.wrap` / `.wrap-narrow` / `.band` (layout), `.eyebrow` / `.display-1..3` / `.lede` /
`.body-copy` / `.numeral` (type), `.btn` / `.btn-primary` / `.btn-secondary` / `.btn-ghost`
(controls), `.field` / `.field-label` / `.field-error` (forms), `.card`, `.rule`.

Use `.wrap` for every full-width band. It is what makes the left edge of a heading in one section line up with the
next — the thing that most separates a composed page from an assembled one.

### Contact form

`app/components/ContactForm.vue` posts to `server/api/contact.post.ts`, which delivers via Resend. It has **four**
distinct outcomes and none of them ever claims a message was received when it was not:

| Condition              | Status    | `data.code`               | UI                                                                              |
|------------------------|-----------|---------------------------|---------------------------------------------------------------------------------|
| Delivered              | 200       | —                         | success panel                                                                   |
| Honeypot filled        | 200       | —                         | success panel (nothing sent; a bot that gets a 400 learns the field is checked) |
| Invalid / rate-limited | 400 / 429 | `invalid`, `rate_limited` | inline error                                                                    |
| No delivery configured | 503       | `not_configured`          | "not connected yet" panel + phone and email                                     |

Configure delivery with `NUXT_RESEND_API_KEY`, `NUXT_CONTACT_TO_EMAIL` and
`NUXT_CONTACT_FROM_EMAIL`. Without all three the endpoint answers 503 by design — that is the honest failure, not a bug
to route around.

### SEO

`useSeo({title, description, path, image?, type?, noindex?})` — one call per page for title, description, canonical,
Open Graph and Twitter cards. Canonical and `og:url` are absolute and built from `NUXT_PUBLIC_SITE_URL`.

`app/layouts/default.vue` emits site-wide `GeneralContractor` JSON-LD; service pages add
`FAQPage`. `server/routes/sitemap.xml.ts` and `server/routes/robots.txt.ts` are hand-rolled routes (not modules) so both
carry the real origin from runtime config. **A new page that is not derived from `services.ts` or `projects.ts` must be
added to `STATIC_ROUTES` in sitemap.xml.ts.**

## Placeholder content

`app/data/site.ts`, `services.ts` and `projects.ts` are **invented**: 555 phone number, made-up licence number,
fictional clients and figures. They feed the visible pages *and*
the LocalBusiness structured data, where publishing invented name/address/phone data is actively harmful.
`app/data/projects.ts` deliberately ships **no** testimonials — the type supports them
and the page renders them, but a fabricated quote attributed to a named person is a
different class of placeholder from invented body copy.

`README.md` carries the full before-launch checklist. Keep it accurate when you touch these files.
