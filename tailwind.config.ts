import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

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
        accent: '#FFA500', // Orange accent
        'accent-gold': '#D4AF37', // Gold accent alternative
      },
      spacing: {
        'section': '100vh',
      },
    },
  },
  plugins: [],
} as Config

