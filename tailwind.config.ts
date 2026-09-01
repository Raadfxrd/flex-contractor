import type {Config} from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
    content: [
        // `components/` and `composables/` sit OUTSIDE the Nuxt 4 srcDir
        // (app/), so the module's own globs miss them. Everything under app/
        // is added automatically by @nuxtjs/tailwindcss.
        './components/**/*.{js,vue,ts}',
        './composables/**/*.{js,ts}',
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
