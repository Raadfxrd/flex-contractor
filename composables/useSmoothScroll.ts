import gsap from 'gsap'
import {ScrollToPlugin} from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

export const useSmoothScroll = () => {
    // Smooth scroll to element
    const scrollTo = (target: Element | string | number, duration: number = 1) => {
        if (typeof window !== 'undefined') {
            gsap.to(window, {
                scrollTo: target,
                duration,
                ease: 'power3.inOut',
            })
        }
    }

    // Get current scroll position
    const getScrollPosition = () => {
        if (typeof window !== 'undefined') {
            return window.scrollY || window.pageYOffset
        }
        return 0
    }

    // Enable/disable scroll
    const disableScroll = () => {
        if (typeof document !== 'undefined') {
            document.body.style.overflow = 'hidden'
        }
    }

    const enableScroll = () => {
        if (typeof document !== 'undefined') {
            document.body.style.overflow = 'auto'
        }
    }

    return {
        scrollTo,
        getScrollPosition,
        disableScroll,
        enableScroll,
    }
}

