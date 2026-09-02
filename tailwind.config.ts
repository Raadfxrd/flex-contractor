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
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                dark: '#0a0a0a',
                'dark-secondary': '#1a1a1a',
                // Neutral white accent for the black & white look.
                accent: '#ffffff',
            },
            spacing: {
                'section': '100vh',
            },
        },
    },
    plugins: [],
} as Config
