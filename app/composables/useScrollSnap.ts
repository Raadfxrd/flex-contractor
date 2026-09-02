/**
 * Opt a single page in to full-screen CSS scroll snapping.
 *
 * Snapping is deliberately NOT global. `scroll-snap-type: y mandatory` used to
 * sit unconditionally on <html>/<body>, which was fine while the site was one
 * page -- but it applies to every route, so any ordinary page carrying a
 * full-height block would start jumping. Only the scroll-driven homepage wants
 * this behaviour, so the homepage asks for it.
 *
 * Implemented with useHead() rather than a classList write in onMounted for
 * two reasons:
 *   1. It is server-rendered, so there is no first paint where the page is
 *      briefly unsnapped and then snaps once hydration lands.
 *   2. unhead disposes the entry when the component unmounts, so navigating
 *      away removes the class without any manual teardown to forget.
 *
 * The class goes on BOTH elements: globals.css declares scroll-snap-type on
 * html and body because UAs disagree about whether the viewport reads it off
 * the root or has it propagated up from body.
 *
 * NOTE: this does NOT replace the runtime gate in PortfolioScroller. That
 * component still toggles `.snap-disabled` to stand snapping down for the
 * pinned region, and `.snap-disabled` beats `.snap-enabled` with !important.
 */
export const useScrollSnap = () => {
    useHead({
        htmlAttrs: {class: 'snap-enabled'},
        bodyAttrs: {class: 'snap-enabled'},
    })
}
