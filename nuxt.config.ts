// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],

    css: ['~~/assets/css/globals.css'],

    image: {
        /*
         * Screens cap at 1280 which, doubled by the 2x density variant, lands
         * exactly on the 2560px source width -- so no variant is ever an
         * upscale of the original.
         *
         * NOTE: `sizes` on <NuxtImg> MUST be screen-keyed ("xs:100vw ..."). A
         * bare `sizes="100vw"` is parsed as the breakpoint key "1px" and
         * silently yields a 1-pixel-wide image.
         */
        screens: {xs: 320, sm: 640, md: 768, lg: 1024, xl: 1280},
        format: ['avif', 'webp', 'jpeg'],
        quality: 78,
    },

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
