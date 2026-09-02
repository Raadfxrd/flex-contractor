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

Bilingual marketing site for Flexcontractor B.V., an Amsterdam renovation firm, built around one
scroll-driven homepage. Thirteen pages per locale: the homepage, `/services` + `/services/[slug]` (six),
`/specialisms`, `/about`, `/contact`, `/careers`, `/privacy`, plus `app/error.vue` for 404/500.

Dutch is the default locale and sits on the bare path; English is prefixed (`/en/...`). Slugs are the Dutch
words in both languages, so a URL survives a language switch.

There is no `/projects`. It existed, driven by five invented case studies, and was removed when the content
was replaced with the firm's real offering — the business does kitchens, staircases, floors and dormers, not
the 14-storey frames that page advertised. Bringing it back needs real project write-ups and real
photography, not new placeholder ones.

State is module-level data, not a store:

- `app/data/content/{types,nl,en}.ts` — **all copy**, in typed dictionaries, read through `useContent()`
  rather than a message key, so a rename is a compile error instead of a blank on the page. `types.ts` is the
  contract; `nl.ts` is the source of truth and English is translated from it.
- `app/data/site.ts` — locale-independent facts: phone, email, address, KvK, hours, certifications, service
  area. `addressLines` encodes the Dutch postal order (street, then postcode *before* city, no comma) so no
  template composes an address itself.

The homepage panels, the footer, the sitemap and the form's project-type list are all derived from those
files — **add content there, not in a template**, or the copies drift.

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

### Languages

`@nuxtjs/i18n` with `strategy: 'prefix_except_default'` and `defaultLocale: 'nl'`. It is used for locale
state, routing and detection **only** — not for message lookup. Copy lives in the typed dictionaries above,
because the content is structured (arrays of services and specialisms, each with several fields) and a flat
message catalogue would turn that into stringly-typed keys like `services.3.faqs.1.answer` with no type
checking.

Three things that are easy to get wrong:

- **`lang` is set in `app.vue`, from the active locale.** It used to be hardcoded in `nuxt.config.ts`, which
  applies to every route — that would label every Dutch page as English, and a screen reader would read it
  with English pronunciation rules.
- **Links must go through `useLocalePath()`.** A bare `to="/services"` sends an English visitor to the Dutch
  page.
- **`useSeo()` builds the canonical from the current route**, not from a hand-passed path, and emits the
  `hreflang` set (`nl-NL`, `en-GB`, `x-default` → Dutch). A hand-passed path would point every English
  page's canonical at its Dutch equivalent, which is how a whole locale drops out of an index.

`SiteHeader` compares against `localePath('/')` rather than `'/'` to decide whether it is on the homepage —
in English the homepage is `/en`, and a bare `'/'` test leaves the header opaque over the English hero.


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

Served through `@nuxt/image` (`<NuxtImg>`, IPX provider).

**Sources are two different resolutions, and it matters.** The original stock photography in `public/img` is
2560px, and `nuxt.config.ts` caps `screens` at `xl: 1280` so the 2x density variant lands exactly on 2560 and
never upscales. But the four photos taken from the live site — `keuken`, `afwerking`, `trap-en-vloer`,
`verbouwing` — are only **1280px**. At `xl` the pipeline asks for 2x, so their `sizes` must cap at **600px**
or IPX enlarges past the source and they go soft.

That is why those four are used on cards and story panels with `sizes="…xl:600px"`, and **never full-bleed**.
`hero.jpg` is 2560px and is the one that carries `100vw`. `public/logo.png` is 200px and is only safe at
header/footer size.

**`sizes` must be screen-keyed** — `sizes="xs:100vw sm:100vw ..."`. A bare `sizes="100vw"` is parsed by
`parseSizes` as the breakpoint key `"1px"` and silently emits a **1-pixel-wide** image (`/_ipx/w_1/...`).
This fails silently: the build passes and the page renders. Grep the rendered HTML for `_ipx/w_1/` after
adding an image, and check the largest requested `w_` against the source width.


### Design system

Monochrome ground plus one brand signal, taken from the company logo.

The green is `#45b939`, sampled from the logo's own tagline rather than from the old site's CSS (which
carried a near-duplicate `#46b82e` next to leftover Divi theme defaults). It is used only where the logo
uses it: eyebrow labels, the primary button, active nav, the progress rail, small rules.

**The one rule to remember: a green fill always carries a black label.** Measured against our surfaces,
`#45b939` on `#0a0a0a` is 7.8:1 and `#0a0a0a` on `#45b939` is 8.3:1, but `#ffffff` on `#45b939` is
**2.5:1 and fails everything**. That is why `.btn-primary` is `text-ink`. Focus rings stay white, because a
focus indicator has to be visible on every surface, including on top of a green button.

`.eyebrow` is green; `.eyebrow-muted` is the same shape in grey, for places where several eyebrows would
stack up and the green would stop reading as a signal.

`tailwind.config.ts` is the source of truth:

- Surfaces step `ink #0a0a0a` → `surface #121212` → `surface-2 #1a1a1a` → `surface-3 #242424`, so a card on
  a panel on the page ground is distinguishable without a border.
- Body text uses Tailwind's built-in **`neutral`** ramp, not `gray`. `gray` is blue-tinted (`#9ca3af`) and
  reads cold against pure black.
- Two families: `font-display` (Archivo — headings, numerals, eyebrows, buttons) against `font-sans`
  (Inter — body).
- Fonts are `<link>`ed from `app.head` in `nuxt.config.ts` with preconnects — **not** `@import`ed at the top
  of globals.css, which is a render-blocking third-party request chained behind our own stylesheet.


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

## Real vs placeholder content

Most of what used to be invented is gone. The company details, the twelve specialism descriptions, the eight
value propositions and all three testimonials are the firm's own copy, taken from flexcontractor.nl. The
testimonials in particular are **real**, with real attributions — the five fabricated ones that used to live
in `projects.ts` went with that file.

What is still not the firm's own words:

- **The six service types.** The live site gives only their names. Their summaries, bodies, `includes` lists
  and FAQs were written for this site. They describe real services, but nobody at the firm has approved
  them.
- **`site.certifications`, `site.insurance`, `site.serviceArea`, `site.founded`** — plausible, unverified.
- **`careers.vue`** — the roles array is deliberately empty so the page renders an honest "nothing
  advertised" state. Do not populate it with invented vacancies.

`site.vat` is **deliberately empty**. A BTW-id is not marketing copy, it is a legal identifier that resolves
to a specific registered company; inventing one and attaching it to a real, identifiable address — in the
`GeneralContractor` structured data no less — would point at some other real business. It and `site.kvk`
(which *is* real) both render behind `v-if`, so an empty one is omitted rather than printing a bare label.
Keep that guard, and never fill either field with a plausible-looking placeholder.

The regulatory references in the copy are Dutch and load-bearing — the omgevingsvergunning, monument
consent, and in `careers` the CAO Bouw & Infra, bpfBOUW and VCA. They stop being true if this copy is reused
in another country.

`README.md` carries the full before-launch checklist. Keep it accurate when you touch these files.
