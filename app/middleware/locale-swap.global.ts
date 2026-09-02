/**
 * Swap languages instantly, with no page transition.
 *
 * The layout chrome -- the header, the footer and `<html lang>` -- sits outside
 * `<NuxtPage>`, so it re-renders the moment the route changes. `mode: 'out-in'`
 * then holds the outgoing page on screen for the length of its leave
 * transition, which leaves a window where the header is already in the new
 * language and the body is still in the old one.
 *
 * A language switch is the same page in different words, so there is nothing a
 * cross-fade can usefully communicate. Dropping the transition for this one
 * case closes the window; ordinary navigation keeps its fade.
 *
 * @nuxtjs/i18n names localised routes `<base>___<locale>` -- verified against
 * the build output: `index___nl`, `services-slug___en`, and so on. Same base
 * with a different suffix is a language switch of the same page.
 */
const baseName = (name: unknown) => String(name ?? '').split('___')[0]

export default defineNuxtRouteMiddleware((to, from) => {
    const isLanguageSwap = Boolean(from.name)
        && to.name !== from.name
        && baseName(to.name) === baseName(from.name)

    /*
     * Assigned on both branches on purpose. `to.meta` belongs to the route
     * RECORD, not to this one navigation, so a bare `if` would leave
     * `pageTransition: false` stuck on any route that had ever been reached by
     * a language swap -- and that route would silently lose its fade for the
     * rest of the session. `undefined` hands control back to the app-level
     * default in nuxt.config.
     */
    to.meta.pageTransition = isLanguageSwap ? false : undefined
})
