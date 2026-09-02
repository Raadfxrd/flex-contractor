import {defineEventHandler, setHeader} from 'h3'

/*
 * A route rather than a file in public/ so the Sitemap line can carry the real
 * origin from NUXT_PUBLIC_SITE_URL instead of a hardcoded domain that goes
 * stale the first time the site moves.
 */
export default defineEventHandler((event) => {
    const {siteUrl} = useRuntimeConfig(event).public
    const origin = String(siteUrl).replace(/\/$/, '')

    setHeader(event, 'content-type', 'text/plain; charset=utf-8')
    return [
        'User-agent: *',
        'Allow: /',
        '',
        `Sitemap: ${origin}/sitemap.xml`,
        '',
    ].join('\n')
})
