import {defineEventHandler, setHeader} from 'h3'
import {nl} from '~/data/content/nl'

/*
 * Hand-rolled rather than pulling in a sitemap module: every URL comes from one
 * static list plus the service slugs, so a module would be a dependency and a
 * build step to generate a couple of dozen lines of XML.
 *
 * Each page is emitted ONCE, with xhtml:link alternates naming both language
 * versions. Listing the Dutch and English URLs as two unrelated <url> entries
 * would read as duplicate content; the alternates are what tell a crawler they
 * are the same page in two languages.
 *
 * Slugs are shared across locales, so `nl` is enough to enumerate them.
 *
 * Anything added to app/pages/ that is not a service detail page needs adding
 * to STATIC_ROUTES below.
 */
const STATIC_ROUTES = [
    {path: '', priority: '1.0'},
    {path: '/services', priority: '0.9'},
    {path: '/specialisms', priority: '0.9'},
    {path: '/about', priority: '0.7'},
    {path: '/contact', priority: '0.8'},
    {path: '/careers', priority: '0.5'},
    {path: '/privacy', priority: '0.2'},
]

/** Dutch is the default locale and sits on the bare path; English is prefixed. */
const localised = (origin: string, path: string, locale: 'nl' | 'en') =>
    locale === 'nl'
        ? `${origin}${path || '/'}`
        : `${origin}/en${path}`

export default defineEventHandler((event) => {
    const {siteUrl} = useRuntimeConfig(event).public
    const origin = String(siteUrl).replace(/\/$/, '')

    const routes = [
        ...STATIC_ROUTES,
        ...nl.services.items.map((s) => ({path: `/services/${s.slug}`, priority: '0.8'})),
    ]

    const entries = routes.flatMap(({path, priority}) =>
        (['nl', 'en'] as const).map((locale) => [
            '  <url>',
            `    <loc>${localised(origin, path, locale)}</loc>`,
            `    <xhtml:link rel="alternate" hreflang="nl-NL" href="${localised(origin, path, 'nl')}"/>`,
            `    <xhtml:link rel="alternate" hreflang="en-GB" href="${localised(origin, path, 'en')}"/>`,
            `    <xhtml:link rel="alternate" hreflang="x-default" href="${localised(origin, path, 'nl')}"/>`,
            `    <priority>${priority}</priority>`,
            '  </url>',
        ].join('\n')))

    const xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
        '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
        ...entries,
        '</urlset>',
    ].join('\n')

    setHeader(event, 'content-type', 'application/xml; charset=utf-8')
    setHeader(event, 'cache-control', 'public, max-age=3600')
    return xml
})
