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

- [ ] **Service descriptions.** The live site gives only the six service *names*. Their summaries, bodies,
      `includes` lists and FAQs in `content/nl.ts` were written for this site and nobody at the firm has
      approved them. They describe real services, but the words are not theirs yet.
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
- [ ] **Photography.** The four photos taken from the live site are stock (Pexels) and only 1280px wide,
      which caps where they can be used — see the note in `CLAUDE.md`. Real project photography would be a
      genuine upgrade, and would also let `/projects` come back.
- [x] **Favicon** — built from the logo's circular FC monogram (the wordmark and tagline bands removed so
      the ring closes). `favicon.ico` carries 16/32/48; `apple-touch-icon.png` and `icon-512.png` cover
      iOS and large contexts. The live site's own favicon is a plain black **F** on white, unrelated to the
      logo — swap to that instead if it is the established mark.

## Notes

Architecture, the scroll system's failure modes and the design system are documented in `CLAUDE.md`. The
manual QA checklist is in `DEVELOPMENT.md`.
