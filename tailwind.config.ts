import type {Config} from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
    /*
     * `components/`, `composables/` and `assets/` now live INSIDE the Nuxt 4
     * srcDir (app/), so @nuxtjs/tailwindcss injects globs that already cover
     * them. This explicit glob is a belt-and-braces duplicate of that -- a
     * union, so it is harmless, and it means a new class-bearing directory
     * under app/ can never silently get purged.
     */
    content: [
        './app/**/*.{js,ts,vue}',
    ],
    theme: {
        extend: {
            fontFamily: {
                /*
                 * Two families, one request (see the head links in
                 * nuxt.config.ts). `display` is the mechanical grotesque used
                 * for headings, numerals and eyebrows; `sans` is the humanist
                 * body face. The contrast between them is what carries the
                 * hierarchy now that the palette has no accent hue to spend.
                 */
                display: ['Archivo', 'Inter', ...defaultTheme.fontFamily.sans],
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                /*
                 * Monochrome ground, one brand signal.
                 *
                 * The green is sampled from the logo itself -- the "MET PASSIE
                 * VOOR PERFECTIE" tagline -- not from the old site's CSS, which
                 * carried a near-duplicate #46b82e next to leftover Divi theme
                 * defaults.
                 *
                 * CONTRAST, measured against our own surfaces:
                 *   #45b939 on #0a0a0a  ->  7.8:1   passes AA and AAA
                 *   #0a0a0a on #45b939  ->  8.3:1   passes AA and AAA
                 *   #ffffff on #45b939  ->  2.5:1   FAILS everything
                 *
                 * So a green fill always carries a BLACK label, never white.
                 * That is why `.btn-primary` is `text-ink`, and it is the one
                 * rule to keep in mind when using this colour anywhere new.
                 *
                 * Surfaces step 0a -> 12 -> 1a -> 24 so a card can sit on a
                 * panel on the page ground and still be told apart without
                 * needing a border.
                 *
                 * Body text uses Tailwind's built-in `neutral` ramp, not
                 * `gray`: `gray` is blue-tinted (#9ca3af) and reads cold
                 * against a pure-black ground. neutral-400/500 are true greys.
                 */
                ink: '#0a0a0a',
                surface: {
                    DEFAULT: '#121212',
                    2: '#1a1a1a',
                    3: '#242424',
                },

                brand: {
                    DEFAULT: '#45b939',
                    hover: '#3aa42e',
                },

                // Aliases kept so any external reference still resolves.
                // `accent` is the brand green now: the palette has a real
                // accent hue for the first time.
                dark: '#0a0a0a',
                'dark-secondary': '#1a1a1a',
                accent: '#45b939',
            },
            letterSpacing: {
                eyebrow: '0.18em',
            },
            spacing: {
                'section': '100vh',
            },
            maxWidth: {
                wrap: '80rem',
            },
            transitionTimingFunction: {
                'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
            },
        },
    },
    plugins: [],
} as Config
