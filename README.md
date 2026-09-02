# Flex Contractor

Marketing site for a general contracting firm. Nuxt 4 + Tailwind + GSAP, built around a scroll-driven homepage with a
supporting set of ordinary pages.

## Stack

|           |                                          |
|-----------|------------------------------------------|
| Framework | Nuxt 4 (`srcDir` is `app/`)              |
| Styling   | Tailwind CSS 3 via `@nuxtjs/tailwindcss` |
| Animation | GSAP + ScrollTrigger                     |
| Images    | `@nuxt/image` (IPX)                      |
| Email     | Resend (via a Nitro server route)        |

## Getting started

```bash
npm install     # postinstall runs `nuxt prepare`
npm run dev     # http://localhost:3000
```

```bash
npm run build                          # -> .output/
PORT=3100 node .output/server/index.mjs   # preview the real build on a free port
```

Always preview the production build on a port nothing else is using, and check the log line says it is listening there.
If the port is taken the process exits and your requests quietly hit whatever was already running.

## Routes

| Route                                        | Source                                               |
|----------------------------------------------|------------------------------------------------------|
| `/`                                          | `app/pages/index.vue` — the scroll-driven page       |
| `/services`, `/services/[slug]`              | driven by `app/data/services.ts`                     |
| `/projects`, `/projects/[slug]`              | driven by `app/data/projects.ts`                     |
| `/about`, `/contact`, `/careers`, `/privacy` | static pages                                         |
| `/sitemap.xml`, `/robots.txt`                | `server/routes/` — generated, not files in `public/` |
| 404 / 500                                    | `app/error.vue`                                      |

## Content

Everything editable lives in `app/data/`:

- **`site.ts`** — company name, phone, email, address, hours, licence, service area, social links, primary navigation,
  headline stats.
- **`services.ts`** — the four divisions. Each carries a summary, body copy, capabilities, deliverables, FAQs and the
  project slugs to cross-link.
- **`projects.ts`** — the five case studies. Each carries client, location, year, duration, scale, challenge /
  solution / outcome, headline figures and a gallery.

The homepage story panels, the footer service list, the sitemap and the service ↔ project cross-links are all derived
from these files. Edit the data, not the templates.

## Environment

Copy to `.env` (all optional in development):

```bash
# Absolute origin. Used for canonical URLs, og:url, sitemap.xml and robots.txt.
NUXT_PUBLIC_SITE_URL=https://www.flexcontractor.com

# Contact form delivery. All three are required for the form to actually send.
NUXT_RESEND_API_KEY=re_xxxxxxxxxxxx
NUXT_CONTACT_TO_EMAIL=enquiries@flexcontractor.com
NUXT_CONTACT_FROM_EMAIL=website@flexcontractor.com
```

Without all three email variables the endpoint answers `503 { code: 'not_configured' }`
and the form tells the visitor plainly that the message was **not** sent, showing the phone number and email address
instead. That is deliberate: a form that silently swallows enquiries is worse than no form.

## Before launch

Everything in `app/data/` is invented placeholder content. It renders on the visible pages **and** feeds the
`GeneralContractor` structured data that search engines read to decide whether the business can appear in local
results — publishing invented name/address/phone data there is actively harmful.

- [ ] **`site.ts`** — replace the `555` phone number, the `flexcontractor.com` email, the street address, the licence
  number, the insurance wording, the founding year, the service area and the social URLs.
- [ ] **`companyStats`** in `site.ts` — the years / projects / staff / on-time figures are made up.
- [ ] **`services.ts`** — rewrite summaries, body copy, capabilities, deliverables and FAQ answers to the firm's actual
  scope. Do not ship an FAQ answer you would not stand behind; the FAQ is marked up as structured data.
- [ ] **`projects.ts`** — replace with real, permissioned work. Client names, locations, dates and figures are all
  fictional.
- [ ] **Testimonials** — none ship. The type and the case-study page support them; add them only with the
  client's written permission and their real name and role.
- [ ] **`careers.vue`** — the four vacancies and the benefits list are placeholders.
- [ ] **`privacy.vue`** — accurately describes what this codebase does today, but it has not been legally reviewed. Have
  it checked, and update it the moment you add analytics, a chat widget or any third-party embed.
- [ ] **`NUXT_PUBLIC_SITE_URL`** — set to the real origin, or every canonical URL and the whole sitemap point at the
  wrong domain.
- [ ] **Images** — `public/img` is ~11 MB of sources up to 1.9 MB each. IPX resizes them on first request;
  pre-optimising the originals removes that cold-transform latency.
- [ ] **`favicon.ico`** — still the Nuxt default.

## Notes

Architecture, the scroll system's failure modes and the design system are documented in
`CLAUDE.md`. The manual QA checklist is in `DEVELOPMENT.md`.
