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
                 * Strict monochrome -- there is deliberately no accent hue.
                 * Emphasis is carried by surface layering, hairlines, weight
                 * and scale instead of colour.
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

                /*
                 * Kept as aliases so any external reference to these names
                 * keeps resolving. `accent` is white because in a strict
                 * monochrome system the emphasis colour genuinely is white --
                 * an inverted fill, not a hue.
                 */
                dark: '#0a0a0a',
                'dark-secondary': '#1a1a1a',
                accent: '#ffffff',
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
