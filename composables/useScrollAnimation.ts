import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type ScrollTriggerVars = ScrollTrigger.Vars
type Target = Element | string

const resolve = (target: Target): Element | null =>
    typeof target === 'string' ? document.querySelector(target) : target

export const useScrollAnimation = () => {
    const registerScrollTrigger = () => {
        gsap.registerPlugin(ScrollTrigger)
    }

    /**
     * Parallax: drift the element against the scroll direction across the whole
     * time it is on screen. `speed` is a fraction of the element's own height.
     */
    const createParallax = (
        element: Target,
        speed: number = 0.5,
        options: ScrollTriggerVars = {}
    ) => gsap.to(element, {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            ...options,
        },
    })

    const createFadeIn = (
        element: Target,
        options: ScrollTriggerVars = {}
    ) => gsap.fromTo(
        element,
        {opacity: 0, y: 30},
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                end: 'top 60%',
                scrub: 0.5,
                ...options,
            },
        }
    )

    /**
     * Pin `container` and translate `scrollContent` sideways by exactly its
     * overflow width, so the travel matches the content instead of a fixed
     * guess. Distances are computed in functions + invalidateOnRefresh so they
     * survive a resize.
     */
    const createHorizontalScroll = (
        container: Target,
        scrollContent: Target,
        options: ScrollTriggerVars = {}
    ) => {
        const containerEl = resolve(container)
        const contentEl = resolve(scrollContent)
        if (!containerEl || !contentEl) return

        const distance = () => Math.max(0, contentEl.scrollWidth - containerEl.clientWidth)

        return gsap.to(contentEl, {
            x: () => -distance(),
            ease: 'none',
            scrollTrigger: {
                trigger: containerEl,
                start: 'top top',
                end: () => `+=${distance()}`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                ...options,
            },
        })
    }

    const pinSection = (element: Target, options: ScrollTriggerVars = {}) =>
        ScrollTrigger.create({
            trigger: element,
            pin: true,
            pinSpacing: false,
            start: 'top top',
            end: 'bottom top',
            ...options,
        })

    const refreshScroll = () => ScrollTrigger.refresh()

    /**
     * Kills every ScrollTrigger on the page. Prefer scoping animations with
     * gsap.context() and reverting that instead -- this is a blunt reset.
     */
    const killAll = () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        gsap.globalTimeline.clear()
    }

    return {
        registerScrollTrigger,
        createParallax,
        createFadeIn,
        createHorizontalScroll,
        pinSection,
        refreshScroll,
        killAll,
    }
}
