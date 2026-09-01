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

    app: {
        // Layout transitions
        layoutTransition: {name: 'layout', mode: 'out-in'},

        head: {
            // Without an explicit lang, screen readers fall back to the user
            // agent locale and may mispronounce the page.
            htmlAttrs: {lang: 'en'},
            meta: [
                {charset: 'utf-8'},
                {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            ],
        },
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
