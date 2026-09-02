import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/*
 * Section-by-section scrolling for the homepage.
 *
 * Two cooperating halves:
 *   1. CSS scroll-snap, opted in per page (the `snap-enabled` class).
 *   2. An animated wheel handler, because CSS snap alone does not animate for
 *      a plain mouse. See the long note on animateTo() below.
 */

/** How long a section-to-section transition takes. */
const DURATION = 0.75

/**
 * Ignore the tail of a gesture for this long after a transition lands, so
 * trackpad momentum does not chain three sections off one flick.
 */
const SETTLE_MS = 90

/** Treat a scroll position within this many px of a snap point as "at" it. */
const EPSILON = 4

export const useScrollSnap = () => {
    /*
     * Snapping is deliberately NOT global. `scroll-snap-type: y mandatory` used
     * to sit unconditionally on <html>/<body>, which was fine while the site
     * was one page -- but it applies to every route, so any ordinary page
     * carrying a full-height block would start jumping. Only the scroll-driven
     * homepage wants this behaviour, so the homepage asks for it.
     *
     * Implemented with useHead() rather than a classList write in onMounted for
     * two reasons:
     *   1. It is server-rendered, so there is no first paint where the page is
     *      briefly unsnapped and then snaps once hydration lands.
     *   2. unhead disposes the entry when the component unmounts, so navigating
     *      away removes the class without any manual teardown to forget.
     *
     * The class goes on BOTH elements: globals.css declares scroll-snap-type on
     * html and body because UAs disagree about whether the viewport reads it
     * off the root or has it propagated up from body.
     */
    useHead({
        htmlAttrs: {class: 'snap-enabled'},
        bodyAttrs: {class: 'snap-enabled'},
    })

    let mm: gsap.MatchMedia | undefined

    onMounted(() => {
        /*
         * Under a reduced-motion preference this whole mechanism stays off:
         * globals.css already turns CSS snapping off there, and animating the
         * scroll ourselves would reintroduce exactly the motion the preference
         * asks us not to produce. The page becomes a plain document.
         */
        mm = gsap.matchMedia()

        mm.add('(prefers-reduced-motion: no-preference)', () => {
            const root = document.documentElement
            let tween: gsap.core.Tween | undefined
            let busy = false
            let releaseTimer: ReturnType<typeof setTimeout> | undefined

            const snapSections = (): HTMLElement[] =>
                Array.from(document.querySelectorAll<HTMLElement>('.section-container'))
                    .filter((el) => !el.classList.contains('no-snap'))

            /** Absolute document offsets of every snap point, top to bottom. */
            const snapPoints = (sections: HTMLElement[]): number[] =>
                sections.map((el) => Math.round(el.getBoundingClientRect().top + window.scrollY))

            /*
             * The scroll position just past the LAST snap point -- the bottom
             * edge of the final snapping section, which is the top of the
             * pinned portfolio.
             *
             * This is the exit from the snapping region, and it has to be
             * reachable in one move. See the note in onWheel().
             */
            const exitPoint = (sections: HTMLElement[]): number | undefined => {
                const last = sections[sections.length - 1]
                return last
                    ? Math.round(last.getBoundingClientRect().bottom + window.scrollY)
                    : undefined
            }

            const maxScroll = () =>
                Math.max(0, document.documentElement.scrollHeight - window.innerHeight)

            /*
             * WHY THIS EXISTS AT ALL.
             *
             * `scroll-snap-type: mandatory` only *animates* the settle when the
             * browser is animating the scroll in the first place. A trackpad
             * emits a stream of small deltas, so the browser scrolls
             * continuously and eases into the snap point -- which looks right.
             * A plain mouse emits one large discrete notch: the scroll lands
             * instantly and the snap engine re-targets in the same frame, so
             * the page appears to teleport between sections. There is no
             * animation being skipped; the browser never started one.
             *
             * `scroll-behavior: smooth` does not fix it. Per spec it applies to
             * navigation and scripted scrolls only, explicitly NOT to input
             * scrolling -- and it breaks ScrollTrigger's scrub as a bonus.
             *
             * So we drive the transition ourselves. CSS snap has to be stood
             * down while we do: it is `mandatory`, so it would re-target on
             * every frame of our tween and fight it to a standstill. The class
             * is separate from `.snap-disabled` (which PortfolioScroller owns
             * for the pinned region) so the two can be set and cleared
             * independently without clobbering each other.
             *
             * The tween moves a proxy object rather than using ScrollToPlugin,
             * which keeps the plugin out of the bundle and out of
             * vite.optimizeDeps.
             */
            const animateTo = (target: number) => {
                busy = true
                root.classList.add('snap-animating')
                document.body.classList.add('snap-animating')

                const proxy = {y: window.scrollY}

                tween = gsap.to(proxy, {
                    y: target,
                    duration: DURATION,
                    ease: 'power2.inOut',
                    overwrite: true,
                    onUpdate: () => window.scrollTo(0, proxy.y),
                    onComplete: release,
                    /*
                     * A killed tween still has to release the lock. Without
                     * this, an interrupted transition leaves `busy` true and
                     * the page stops responding to the wheel entirely.
                     */
                    onInterrupt: release,
                })
            }

            function release() {
                /*
                 * Force every ScrollTrigger to evaluate at the position we just
                 * landed on BEFORE handing control back to CSS snapping.
                 *
                 * This matters for the exit tween. PortfolioScroller's gate is
                 * what sets `.snap-disabled` for the pinned region, and it only
                 * runs off scroll events. If the tween finished before the gate
                 * had processed the final position, dropping `.snap-animating`
                 * here would re-arm `mandatory` snapping a full viewport below
                 * its nearest snap point -- and it would haul the page straight
                 * back up. One synchronous update removes the race.
                 */
                ScrollTrigger.update()

                root.classList.remove('snap-animating')
                document.body.classList.remove('snap-animating')

                clearTimeout(releaseTimer)
                releaseTimer = setTimeout(() => {
                    busy = false
                }, SETTLE_MS)
            }

            /*
             * True if the pointer is over something that scrolls on its own --
             * the open mobile menu panel, the portfolio's native overflow
             * track below `md`, a tall textarea.
             *
             * The listener is on `window`, so without this the handler would
             * preventDefault a wheel aimed at one of those and scroll the page
             * behind it instead. Cheap test first (scrollHeight vs
             * clientHeight) so getComputedStyle only runs for the handful of
             * elements that could possibly qualify.
             */
            const overScrollable = (target: EventTarget | null): boolean => {
                let el = target instanceof Element ? target : null

                while (el && el !== document.body && el !== document.documentElement) {
                    if (el.scrollHeight > el.clientHeight) {
                        const overflowY = getComputedStyle(el).overflowY
                        if (overflowY === 'auto' || overflowY === 'scroll') return true
                    }
                    el = el.parentElement
                }

                return false
            }

            const onWheel = (event: WheelEvent) => {
                // Pinch-zoom arrives as a ctrl-modified wheel event.
                if (event.ctrlKey) return

                if (overScrollable(event.target)) return

                /*
                 * Below the process section the portfolio is pinned and
                 * PortfolioScroller has stood snapping down for the whole
                 * region. Hands off: that area scrolls natively, and the pin
                 * reads the raw scroll position.
                 */
                if (root.classList.contains('snap-disabled')) return

                if (Math.abs(event.deltaY) < 1) return

                // Swallow the rest of the gesture while a transition is running.
                if (busy) {
                    event.preventDefault()
                    return
                }

                const sections = snapSections()
                if (!sections.length) return

                const points = snapPoints(sections)
                const y = window.scrollY
                const down = event.deltaY > 0

                let target = down
                    ? points.find((point) => point > y + EPSILON)
                    : [...points].reverse().find((point) => point < y - EPSILON)

                /*
                 * THE EXIT, and the reason a mouse used to get stuck on the
                 * last section while a trackpad sailed through.
                 *
                 * Below the final snap point there are no more snap points, but
                 * CSS snapping is still armed until PortfolioScroller's gate
                 * fires at `top 80%` of the portfolio -- about a fifth of a
                 * viewport further down. Handing the boundary back to native
                 * scrolling does not work there: one mouse notch (~100px) never
                 * reaches the gate, so `mandatory` snapping finds the section we
                 * just left as the only candidate and yanks straight back to it.
                 * Every notch gets undone. A trackpad escapes only because one
                 * flick travels far enough to trip the gate mid-gesture.
                 *
                 * So the exit is an explicit destination: animate the whole way
                 * to the bottom of the last snapping section. That clears the
                 * gate by a full viewport, so snapping is already stood down by
                 * the time the tween ends and there is nothing left to yank.
                 */
                if (down && target === undefined) {
                    const exit = exitPoint(sections)
                    if (exit !== undefined && y < exit - EPSILON) target = exit
                }

                /*
                 * Still nothing in that direction -- the top of the hero going
                 * up, or already past the exit. Do NOT preventDefault; native
                 * scrolling owns the page from here.
                 */
                if (target === undefined) return

                event.preventDefault()
                animateTo(Math.min(target, maxScroll()))
            }

            // Non-passive: preventDefault is the entire point.
            window.addEventListener('wheel', onWheel, {passive: false})

            return () => {
                window.removeEventListener('wheel', onWheel)
                clearTimeout(releaseTimer)
                tween?.kill()
                root.classList.remove('snap-animating')
                document.body.classList.remove('snap-animating')
            }
        })
    })

    onUnmounted(() => mm?.revert())
}
