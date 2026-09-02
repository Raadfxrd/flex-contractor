# Development notes

There is no test runner. Verification is manual — this is the checklist.

Architecture and the reasoning behind the scroll system are in `CLAUDE.md`; content and the before-launch checklist are
in `README.md`.

## Running a check

```bash
npm run dev                                # http://localhost:3000

npm run build                              # then, on a FREE port:
PORT=3100 node .output/server/index.mjs    # confirm it logs "Listening on ... :3100"
```

Dev and production emit completely different asset URLs, so a bug can exist in one and not the other. Check both when
you touch CSS, images or the head.

If the port is already bound the process exits with `EADDRINUSE` and your requests hit the stale server instead — you
will be testing the previous build without knowing. Free it first:

```bash
lsof -tiTCP:3100 -sTCP:LISTEN | xargs -r kill
```

## Scroll behaviour (homepage)

The page scrolls normally — there is no snapping. If the page ever grabs the scroll and pulls it to a
section boundary, snapping has been reintroduced somewhere and should not have been.

- [ ] Scroll from the top with a **mouse wheel**, not just a trackpad. It should feel like any other page:
      no resistance, no jumping to section edges, no delay before the page moves.
- [ ] Keep scrolling to the specialisms. The section pins and the track moves sideways as you scroll.
- [ ] Below `md`, or with reduced motion on, the specialism track is a plain horizontal scroller you can
      swipe — and it still snaps card to card **horizontally**. That carousel snap is intentional.
- [ ] Resize the window while the specialisms are pinned. The track's travel distance recomputes and the
      last card still ends flush.
- [ ] Scroll to the very bottom of the footer and stop. The page stays there.


## Languages

- [ ] `/` is Dutch, `/en` is English, and the header toggle moves between the *same* page in each.
- [ ] `<html lang>` is `nl-NL` on Dutch pages and `en-GB` on English ones — not one value everywhere.
- [ ] Every page carries three `hreflang` alternates (`nl-NL`, `en-GB`, `x-default`) and a canonical that
      matches its own URL, not the other locale's.
- [ ] Navigate around in English: no link silently drops you back onto a Dutch page.
- [ ] The testimonials on `/en` carry the "translated from the original Dutch" note; the Dutch ones do not.


## Pages

- [ ] Every route returns 200: `/`, `/services`, each `/services/[slug]`, `/projects`, each `/projects/[slug]`,
  `/about`, `/contact`, `/careers`, `/privacy`.
- [ ] A bad slug returns a real **404**, not a 200 with an empty page:
  `/services/nope`, `/projects/nope`, `/nope`.
- [ ] No page grabs the scroll. Every route scrolls like an ordinary document.
- [ ] Service ↔ project cross-links resolve in both directions.
- [ ] "Next project" on the last case study wraps round to the first.

## Navigation and exits

- [ ] Header is transparent over the homepage hero and takes a solid background once the hero scrolls past. It is solid
  immediately on every other page.
- [ ] Detail pages (`/services/[slug]`, `/projects/[slug]`) show a back arrow to their index. Index pages do not.
- [ ] Below `lg`: the hamburger opens a full-screen panel; the same button becomes an X and closes it; there is a "Close
  menu" button at the end of the panel; **Escape**
  closes it and returns focus to the toggle.
- [ ] Navigating from inside the panel closes it.
- [ ] Scrolling over the open panel does not scroll the page behind it.

## Contact form

Reachable at `/contact` and at the bottom of `/`.

- [ ] Submitting empty shows inline errors and moves focus to the first bad field.
- [ ] A bad email address is rejected client-side and server-side.
- [ ] **With no `NUXT_RESEND_API_KEY` set**, submitting a valid message shows the
  "not connected yet" panel with the phone number — *not* a success message. This is the important one: the form must
  never claim to have sent something it did not.
- [ ] With delivery configured, a valid message arrives and replying in the inbox goes to the enquirer (`reply_to`).
- [ ] Six submissions in ten minutes: the sixth is rate-limited.

Endpoint behaviour can be checked directly:

```bash
curl -i -X POST localhost:3100/api/contact -H 'content-type: application/json' \
  -d '{"name":"Test","email":"t@example.com","message":"A message long enough to pass validation."}'
```

## Accessibility

- [ ] Tab from the very top: the skip link appears first and jumps to `#main`.
- [ ] Every interactive element shows a visible focus ring.
- [ ] With **reduced motion** enabled (macOS: System Settings → Accessibility → Display → Reduce motion):
      no pinning, no reveal animations, and **all content visible** — nothing stranded at `opacity: 0`.
      The specialisms degrade to a native horizontal scroller.
- [ ] The portfolio is usable by keyboard and by touch swipe below `md`.

## Images

- [ ] After adding any `<NuxtImg>`, grep the rendered HTML for `_ipx/w_1/`. Any hit means a
  `sizes` attribute is missing its screen keys and that image is being served **one pixel wide**. It fails silently —
  the build passes and the page renders.

```bash
curl -s localhost:3100/ | grep -o '_ipx/w_1/' | wc -l   # must be 0
```

## Styling

Tailwind purges anything it cannot find in `app/**`. A class that only ever appears in a computed string will be
stripped. After a build, cross-check the classes the pages actually render against the emitted CSS — anything present in
the HTML with no rule in
`.output/public/_nuxt/entry.*.css` is a purge miss. (`router-link-active` and
`router-link-exact-active` are expected: Vue Router adds them and they carry no styles.)
