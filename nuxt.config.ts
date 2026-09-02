// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@nuxtjs/i18n'],

    /*
     * globals.css is handed to the Tailwind module as its `cssPath` rather than
     * being pushed onto the `css:` array. The module injects a virtual
     * stylesheet carrying the three @tailwind directives when it cannot find a
     * cssPath of its own -- listing ours here means there is exactly one copy
     * of the Tailwind output in the bundle instead of two.
     *
     * `~/` (not `~~/`) is correct now: assets/ moved inside srcDir (app/).
     */
    tailwindcss: {
        cssPath: '~/assets/css/globals.css',
    },

    /*
     * Dutch is the default and sits at the bare path (`/`, `/services`); English
     * is prefixed (`/en`, `/en/services`). `prefix_except_default` is what keeps
     * the primary audience — Dutch homeowners and businesses around Amsterdam —
     * on clean URLs, while still giving English its own indexable pages rather
     * than swapping text client-side behind one URL.
     *
     * `redirectOn: 'root'` means an English browser landing on `/` is sent to
     * `/en`, but a Dutch URL shared directly is never hijacked by the visitor's
     * browser setting.
     */
    i18n: {
        defaultLocale: 'nl',
        strategy: 'prefix_except_default',
        locales: [
            {code: 'nl', language: 'nl-NL', name: 'Nederlands'},
            {code: 'en', language: 'en-GB', name: 'English'},
        ],
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_locale',
            alwaysRedirect: false,
            redirectOn: 'root',
        },
    },

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

    runtimeConfig: {
        /*
         * Contact form delivery. Both are server-only. When either is missing
         * the endpoint answers 503 with `code: 'not_configured'` and the form
         * shows the phone/email fallback rather than pretending to have sent
         * something -- see server/api/contact.post.ts.
         */
        resendApiKey: '',      // NUXT_RESEND_API_KEY
        contactToEmail: '',    // NUXT_CONTACT_TO_EMAIL
        contactFromEmail: '',  // NUXT_CONTACT_FROM_EMAIL

        public: {
            // Absolute origin, used for canonical URLs, og:url and sitemap.xml.
            siteUrl: 'https://flexcontractor.nl', // NUXT_PUBLIC_SITE_URL
        },
    },

    // PostCSS configuration
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    app: {
        /*
         * A short cross-fade only. Anything that moves the page vertically
         * during a route change fights ScrollTrigger's measurements on the
         * scroll-driven homepage.
         */
        pageTransition: {name: 'page', mode: 'out-in'},
        layoutTransition: false,

        head: {
            // NOTE: `lang` is deliberately NOT set here. It is derived from the
            // active i18n locale in app.vue — hardcoding it would label every
            // Dutch page as English and mispronounce it in a screen reader.
            meta: [
                {charset: 'utf-8'},
                {name: 'viewport', content: 'width=device-width, initial-scale=1'},
                {name: 'theme-color', content: '#0a0a0a'},
            ],
            link: [
                /*
                 * Fonts are linked from <head>, NOT @import-ed at the top of
                 * globals.css. An @import inside the stylesheet is a
                 * render-blocking third-party request chained BEHIND our own
                 * CSS download -- the browser cannot even start it until
                 * globals.css has arrived and parsed. As a <link> it is
                 * discovered in the initial HTML and races in parallel, and
                 * the two preconnects warm the DNS/TLS handshakes ahead of it.
                 */
                {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
                {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: ''},
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2'
                        + '?family=Archivo:wght@500;600;700;800'
                        + '&family=Inter:wght@400;500;600'
                        + '&display=swap',
                },
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
