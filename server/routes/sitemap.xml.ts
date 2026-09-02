import {defineEventHandler, setHeader} from 'h3'
import {services} from '~/data/services'
import {projects} from '~/data/projects'

/*
 * Hand-rolled rather than pulling in a sitemap module: every URL on this site
 * comes from two static arrays plus a fixed list of pages, so a module would be
 * a dependency and a build step to generate eleven lines of XML.
 *
 * Anything added to app/pages/ that is not derived from those arrays needs
 * adding to STATIC_ROUTES below.
 */
const STATIC_ROUTES = [
    {path: '/', priority: '1.0'},
    {path: '/services', priority: '0.9'},
    {path: '/projects', priority: '0.9'},
    {path: '/about', priority: '0.7'},
    {path: '/contact', priority: '0.8'},
    {path: '/careers', priority: '0.6'},
    {path: '/privacy', priority: '0.2'},
]

export default defineEventHandler((event) => {
    const {siteUrl} = useRuntimeConfig(event).public
    const origin = String(siteUrl).replace(/\/$/, '')

    const urls = [
        ...STATIC_ROUTES,
        ...services.map((service) => ({path: `/services/${service.slug}`, priority: '0.8'})),
        ...projects.map((project) => ({path: `/projects/${project.slug}`, priority: '0.7'})),
    ]

    const xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...urls.map(({path, priority}) =>
            `  <url><loc>${origin}${path}</loc><priority>${priority}</priority></url>`),
        '</urlset>',
    ].join('\n')

    setHeader(event, 'content-type', 'application/xml; charset=utf-8')
    setHeader(event, 'cache-control', 'public, max-age=3600')
    return xml
})
