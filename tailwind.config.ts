import type {Config} from 'tailwindcss'
import defaultTheme = require('tailwindcss/defaultTheme');

export default {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './app.vue',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                dark: '#0a0a0a',
                'dark-secondary': '#1a1a1a',
                // Use a neutral white accent for a premium black & white look
                accent: '#ffffff',
            },
            spacing: {
                'section': '100vh',
            },
        },
    },
    plugins: [],
} as Config
