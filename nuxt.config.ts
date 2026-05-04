// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    modules: ['@nuxtjs/tailwindcss'],

    // PostCSS configuration
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    // Layout transitions
    app: {
        layoutTransition: {name: 'layout', mode: 'out-in'}
    },

    // Optimize dependencies for faster builds
    vite: {
        optimizeDeps: {
            include: [
                'gsap',
                'gsap/ScrollTrigger',
                '@vue/devtools-core',
                '@vue/devtools-kit',
            ]
        }
    }
})
