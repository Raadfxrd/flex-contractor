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

The twelve individual trades the live site lists (staircases, door frames, gravel floors …) are grouped
into **six capability areas** in `specialisms`, with every original trade preserved verbatim in that area's
`includes` list. The narrow framing read as a jobbing specialist rather than a firm that takes on a whole
renovation; the `includes` list keeps the specific words on the page for anyone searching for one of them.

`intro.range` carries the positioning statement — high-end through to everyday work — and is rendered on the
homepage, `/services` and `/specialisms`. It is the reason the six service types run from a one-day job to a
complete renovation.


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


`app/middleware/locale-swap.global.ts` turns the page transition **off** for a language switch. The header,
footer and `<html lang>` live outside `<NuxtPage>` and re-render the instant the route changes, while
`mode: 'out-in'` holds the outgoing page for the length of its leave transition — so a fade leaves a window
with the header in one language and the body in the other. It detects the swap from the route name
(`<base>___<locale>`) and must assign `to.meta.pageTransition` on **both** branches: `to.meta` belongs to the
route record, so a bare `if` would leave the fade permanently disabled on any route ever reached by a swap.


### Scrolling

**There is no scroll snapping.** The page scrolls normally.

It used to: `scroll-snap-type: y mandatory` opted in per page, a runtime gate that stood snapping down for
the pinned region, and a wheel handler that animated section-to-section transitions because mandatory snap
does not animate at all for a discrete mouse wheel. It was removed for being sluggish — mandatory snapping
takes the scroll away from the reader, and each mechanism added to make that feel smooth added latency of
its own. Do not reintroduce it without a specific reason; the removal was a deliberate call, not an
oversight.

What remains:

- **`.section-container`** is now purely a layout class — `w-full h-screen relative`. It carries no scroll
  behaviour. Full-viewport sections are a layout choice, nothing more, and a new one needs no opt-in class.
- **`.no-snap` is gone.** Nothing needs to opt out of anything.
- **The root element is still the one and only scroll container**, carrying `overflow-x: hidden`. Never give
  `<body>` a height plus `overflow-y`: because `<html>`'s overflow is not `visible`, body's overflow does not
  propagate to the viewport, so body would scroll internally while `window.scrollY` — which ScrollTrigger
  reads — stayed pinned at 0.
- **`scroll-behavior: smooth` is still deliberately absent.** It breaks ScrollTrigger's scrub, which drives
  the pinned horizontal section. Use an explicit `scrollTo({behavior:'smooth'})` where a smooth jump is
  wanted.

**The pinned horizontal scroll survives** (`app/components/SpecialismScroller.vue`). The section pins and the
track translates by exactly its overflow width, driven by scroll position. Below `md`, or under reduced
motion, it degrades to a native `overflow-x-auto` scroller (the `pinned` ref switches the wrapper's
overflow), and that fallback keeps its own **horizontal** CSS snap — `snap-x` on the track, `snap-start` on
the cards. That is a carousel, unrelated to the page-level system that was removed, and it should stay.


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
`delay`s. Independent triggers on elements this close together all resolve
in the same frame and the intended stagger never actually reads.

**Reveals are `gsap.set()` then `gsap.to()`, never `gsap.from()`.**

A `from()` tween that carries a ScrollTrigger does not apply its start values until ScrollTrigger's first
update, and `create()` defers that to the next frame. On a fresh mount that leaves one painted frame where
the content is fully visible before it is yanked to `opacity: 0` and animated in. It is easy to miss on a
normal page load and obvious when switching language, because that remounts the whole page and the flash is
of text you were just reading in the other language.

`gsap.set()` cannot be deferred — it lands in the same frame as `onMounted`, before the browser paints. Keep
both calls inside the `matchMedia` context: `mm.revert()` then still restores everything, and under reduced
motion neither runs, so the content renders in place rather than stranded at `opacity: 0`.


### Images

Served through `@nuxt/image` (`<NuxtImg>`, IPX provider).

**Sources are mixed resolutions, and it matters.** `nuxt.config.ts` caps `screens` at `xl: 1280`, so the 2x
density variant asks for 2560. Anything smaller than that upscales.

| Source | Width | Safe for |
|---|---|---|
| `hero.jpg`, `installaties.jpg`, `outdoor.jpg` | 2560+ | full-bleed `100vw` |
| `keuken`, `afwerking`, `trap-en-vloer`, `verbouwing` | **1280** | cards and story panels only — cap `sizes` at 600px |
| `logo-white.png`, `logo-black.png` | **200** | header and footer only |

That is why the four 1280px photos carry `sizes="…xl:600px"` and are **never** full-bleed. After adding an
image, check the largest requested `w_` against the source width, not just that the page renders.

**`sizes` must be screen-keyed** — `sizes="xs:100vw sm:100vw ..."`. A bare `sizes="100vw"` is parsed by
`parseSizes` as the breakpoint key `"1px"` and silently emits a **1-pixel-wide** image (`/_ipx/w_1/...`).
This fails silently: the build passes and the page renders. Grep for `_ipx/w_1/`.

All six specialism areas now carry a photo. The card markup still guards on `v-if="item.image"`, so an
area without one renders as type rather than breaking — keep that guard if areas are added.

`outdoor.jpg` is the only **portrait** source (2651×3536). The specialism card and the scroller both crop it
with `object-cover` at a landscape ratio, which takes a band from the middle of the frame. That is fine for
this photograph, but a portrait image whose subject sits at the top or bottom would lose it.


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
