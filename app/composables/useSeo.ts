interface SeoOptions {
    title: string
    description: string
    /** Route path, leading slash, no origin -- e.g. '/services/electrical'. */
    path: string
    /** Absolute-from-root path to a social card image, e.g. '/img/office.jpg'. */
    image?: string
    type?: 'website' | 'article'
    /** Set on pages that must never be indexed (thank-you, legal boilerplate). */
    noindex?: boolean
}

/**
 * One call per page for title, description, canonical and social cards.
 *
 * Canonical and og:url have to be absolute, so they are built from
 * `runtimeConfig.public.siteUrl` (NUXT_PUBLIC_SITE_URL). Without a canonical
 * every page is reachable at several URLs -- with and without a trailing
 * slash, and under any preview domain -- and the crawler has to guess which
 * one is the real one.
 */
export const useSeo = (options: SeoOptions) => {
    const {siteUrl} = useRuntimeConfig().public
    const origin = String(siteUrl).replace(/\/$/, '')
    const url = `${origin}${options.path === '/' ? '' : options.path}`
    const image = `${origin}${options.image ?? '/img/hero.jpg'}`

    useHead({
        title: options.title,
        link: [{rel: 'canonical', href: url}],
        meta: [
            {name: 'description', content: options.description},
            ...(options.noindex ? [{name: 'robots', content: 'noindex, follow'}] : []),

            {property: 'og:type', content: options.type ?? 'website'},
            {property: 'og:title', content: options.title},
            {property: 'og:description', content: options.description},
            {property: 'og:url', content: url},
            {property: 'og:image', content: image},
            {property: 'og:site_name', content: 'Flex Contractor'},

            {name: 'twitter:card', content: 'summary_large_image'},
            {name: 'twitter:title', content: options.title},
            {name: 'twitter:description', content: options.description},
            {name: 'twitter:image', content: image},
        ],
    })
}
