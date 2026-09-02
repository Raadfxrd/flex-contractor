# Flexcontractor

Bilingual marketing site for Flexcontractor B.V., an Amsterdam renovation and construction firm.
Nuxt 4 + Tailwind + GSAP, built around a scroll-driven homepage with a supporting set of ordinary pages.

## Stack

| | |
|---|---|
| Framework | Nuxt 4 (`srcDir` is `app/`) |
| Styling | Tailwind CSS 3 via `@nuxtjs/tailwindcss` |
| Animation | GSAP + ScrollTrigger |
| Images | `@nuxt/image` (IPX) |
| Languages | `@nuxtjs/i18n` — Dutch (default) and English |
| Email | Resend, via a Nitro server route |

## Getting started

```bash
npm install     # postinstall runs `nuxt prepare`
npm run dev     # http://localhost:3000
```

```bash
npm run build                             # -> .output/
PORT=3100 node .output/server/index.mjs   # preview the real build on a free port
```

Always preview the production build on a port nothing else is using, and check the log line says it is
listening there. If the port is taken the process exits and your requests quietly hit whatever was already
running.

## Languages

Dutch is the default and sits on the bare path; English is prefixed.

| | Dutch | English |
|---|---|---|
| Home | `/` | `/en` |
| Services | `/services` | `/en/services` |
| A service | `/services/verbouwing` | `/en/services/verbouwing` |

Slugs are the Dutch words in both languages, so a URL stays valid when a visitor switches language. The
header carries a toggle that links to the same page in the other locale — a real link, not a client-side
state flip, so each language is independently indexable.

## Content

All copy lives in `app/data/content/`:

- **`types.ts`** — the `Content` interface. Every locale file is typed against it, so a missing or
  misspelled field is a type error rather than a blank on the page.
- **`nl.ts`** — Dutch, and the source of truth. Change copy here first, then translate.
- **`en.ts`** — English.

Locale-independent facts live in **`app/data/site.ts`**: phone, email, address, KvK, opening hours,
certifications, service area, social links. `addressLines` in the same file encodes the Dutch postal order
— street, then postcode before city — so templates never compose the address themselves.

Templates read the active dictionary through `useContent()`, never a message key.

## Routes

| Route | Source |
|---|---|
| `/` | `app/pages/index.vue` — the scroll-driven page |
| `/services`, `/services/[slug]` | the six service types from `content/*.ts` |
| `/specialisms` | the twelve trades |
| `/about`, `/contact`, `/careers`, `/privacy` | static pages |
| `/sitemap.xml`, `/robots.txt` | `server/routes/` — generated, not files in `public/` |
| 404 / 500 | `app/error.vue` |

## Environment

Copy to `.env` (all optional in development):

```bash
# Absolute origin. Used for canonical URLs, hreflang, og:url, sitemap.xml and robots.txt.
NUXT_PUBLIC_SITE_URL=https://flexcontractor.nl

# Contact form delivery. All three are required for the form to actually send.
NUXT_RESEND_API_KEY=re_xxxxxxxxxxxx
NUXT_CONTACT_TO_EMAIL=info@flexcontractor.nl
NUXT_CONTACT_FROM_EMAIL=website@flexcontractor.nl
```

Without all three email variables the endpoint answers `503 { code: 'not_configured' }` and the form tells
the visitor plainly that the message was **not** sent, showing the phone number and email instead. That is
deliberate: a form that silently swallows enquiries is worse than no form.

## Before launch

Most of the invented content is gone. The company details, the twelve specialism descriptions, the eight
value propositions and all three testimonials are the firm's own, taken from flexcontractor.nl. What is
left:

- [ ] **Service and specialism descriptions.** The live site gives only the six service *names* and the
      twelve original trade names. The six service bodies and FAQs, and the six specialism-area
      descriptions, were written for this site — nobody at the firm has approved those words yet. The trade
      names themselves are preserved verbatim in each area's `includes` list.
- [ ] **`site.vat`** — ships empty. A BTW-id is a legal identifier that resolves to a specific registered
      company, so it is left blank rather than invented; it renders behind `v-if` in the footer and on the
      about page, so filling it in is the only change needed. Never put a placeholder number here — it
      would sit next to a real address in the `GeneralContractor` structured data.
- [ ] **`site.certifications`** — VCA**, ISO 9001 and Bouwgarant are asserted, not verified. Confirm each is
      actually held, or remove it.
- [ ] **`site.insurance`, `site.serviceArea`, `site.founded`** — plausible, but confirm.
- [ ] **`careers.vue`** — the roles array is deliberately empty, so the page shows an honest "nothing
      advertised" state. Add real vacancies or leave it.
- [ ] **`privacy.vue`** — accurately describes what this codebase does, but has not been legally reviewed.
      Settle where the email provider stores messages (Resend is US-based, so an international transfer to
      name) and whether a verwerkersovereenkomst is in place.
- [ ] **Logo resolution.** `public/logo.png` is 200×186. Fine at header size, soft anywhere larger and
      unusable as an OG image. An SVG would fix both.
- [ ] **Photography.** Five of the six specialism areas have a photo; **Buitenruimte / Outdoor space has
      none.** Unsplash had nothing usable — the closest results were a 3D render, a derelict rooftop and a
      palm tree — and a wrong photo is worse than an honest gap, so the card renders as type. A real shot of
      a garden or roof terrace the firm has built would fill it.
- [ ] **Photo resolution.** The four photos from the live site are 1280px, which caps where they can be
      used — see the note in `CLAUDE.md`. Real project photography would be a genuine upgrade, and would
      also let `/projects` come back.
- [ ] **`favicon.ico`** — still the Nuxt default; the live site has one.

## Image credits

| File | Source |
|---|---|
| `logo.png` | The company's own mark |
| `keuken.jpg`, `afwerking.jpg`, `trap-en-vloer.jpg` | Max Vakhtbovych — Pexels, already in use on flexcontractor.nl |
| `verbouwing.jpg` | Monica Silvestre — Pexels, already in use on flexcontractor.nl |
| `installaties.jpg` | [Brett Jordan — Unsplash](https://unsplash.com/photos/a-radiator-and-wires-on-a-white-wall-2PTfY_xxbe0) |
| `hero.jpg` | Predates this work; origin unrecorded — **verify the licence before launch** |

The Unsplash and Pexels licences both allow commercial use without attribution, but crediting the
photographers is the decent default and costs nothing. Replace all of it with real photography of the
firm's own work when there is some.

## Notes

Architecture, the scroll system's failure modes and the design system are documented in `CLAUDE.md`. The
manual QA checklist is in `DEVELOPMENT.md`.
