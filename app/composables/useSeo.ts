interface SeoOptions {
    title: string
    description: string
    /** Absolute-from-root path to a social card image, e.g. '/img/keuken.jpg'. */
    image?: string
    type?: 'website' | 'article'
    /** Set on pages that must never be indexed. */
    noindex?: boolean
}

/**
 * One call per page for title, description, canonical, hreflang and social
 * cards.
 *
 * The canonical is built from the CURRENT route rather than a hand-passed path,
 * because @nuxtjs/i18n rewrites paths per locale (`/services` in Dutch,
 * `/en/services` in English) and a hand-passed path would silently point every
 * English page at its Dutch equivalent.
 *
 * The hreflang set is what tells a crawler these are the same page in two
 * languages rather than duplicate content. `x-default` points at Dutch, which
 * is the default locale and the one on the bare path.
 */
export const useSeo = (options: SeoOptions) => {
    const {siteUrl} = useRuntimeConfig().public
    const origin = String(siteUrl).replace(/\/$/, '')

    const route = useRoute()
    const switchLocalePath = useSwitchLocalePath()

    const url = computed(() => origin + route.path)
    const image = computed(() => `${origin}${options.image ?? '/img/keuken.jpg'}`)

    useHead(() => ({
        title: options.title,
        link: [
            {rel: 'canonical', href: url.value},
            {rel: 'alternate', hreflang: 'nl-NL', href: origin + switchLocalePath('nl')},
            {rel: 'alternate', hreflang: 'en-GB', href: origin + switchLocalePath('en')},
            {rel: 'alternate', hreflang: 'x-default', href: origin + switchLocalePath('nl')},
        ],
        meta: [
            {name: 'description', content: options.description},
            ...(options.noindex ? [{name: 'robots', content: 'noindex, follow'}] : []),

            {property: 'og:type', content: options.type ?? 'website'},
            {property: 'og:title', content: options.title},
            {property: 'og:description', content: options.description},
            {property: 'og:url', content: url.value},
            {property: 'og:image', content: image.value},
            {property: 'og:site_name', content: 'Flexcontractor B.V.'},

            {name: 'twitter:card', content: 'summary_large_image'},
            {name: 'twitter:title', content: options.title},
            {name: 'twitter:description', content: options.description},
            {name: 'twitter:image', content: image.value},
        ],
    }))
}
