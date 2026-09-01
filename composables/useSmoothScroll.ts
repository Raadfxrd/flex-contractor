import gsap from 'gsap'
import {ScrollToPlugin} from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

export const useSmoothScroll = () => {
    // Smooth scroll to element
    const scrollTo = (target: Element | string | number, duration: number = 1) => {
        if (typeof window === 'undefined') return
        gsap.to(window, {
            scrollTo: target,
            duration,
            ease: 'power3.inOut',
        })
    }

    // Get current scroll position
    const getScrollPosition = () => {
        if (typeof window === 'undefined') return 0
        return window.scrollY
    }

    /*
     * The root element is the scroll container (see globals.css), so lock it
     * there rather than on <body>.
     */
    const disableScroll = () => {
        if (typeof document === 'undefined') return
        document.documentElement.style.overflow = 'hidden'
    }

    // Clear the inline value rather than hardcoding a value, so the stylesheet
    // stays the single source of truth for how the page scrolls.
    const enableScroll = () => {
        if (typeof document === 'undefined') return
        document.documentElement.style.overflow = ''
    }

    return {
        scrollTo,
        getScrollPosition,
        disableScroll,
        enableScroll,
    }
}
