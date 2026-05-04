import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

export const useScrollAnimation = () => {
    // Register ScrollTrigger
    const registerScrollTrigger = () => {
        gsap.registerPlugin(ScrollTrigger)
    }

    // Parallax effect - moves element based on scroll position
    const createParallax = (
        element: Element | string,
        speed: number = 0.5,
        options: any = {}
    ) => {
        const trigger = typeof element === 'string' ? {trigger: element} : {trigger: element}

        gsap.to(element, {
            y: typeof element === 'string' ? 100 * speed : (el: Element) => {
                return ScrollTrigger.getById(el) ? 100 * speed : 0
            },
            scrollTrigger: {
                trigger,
                start: 'top center',
                end: 'bottom center',
                scrub: 1,
                markers: false,
                ...options,
            },
        })
    }

    // Fade in on scroll
    const createFadeIn = (
        element: Element | string,
        options: any = {}
    ) => {
        gsap.fromTo(
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
                    markers: false,
                    ...options,
                },
            }
        )
    }

    // Horizontal scroll effect
    const createHorizontalScroll = (
        container: Element | string,
        scrollContent: Element | string,
        options: any = {}
    ) => {
        const proxy = {
                skew: 0, skewSetter(val: number) {
                    this.skew = val
                }, skewGetter() {
                    return this.skew
                }, onUpdate() {
                    gsap.set(scrollContent, {skewY: this.skew})
                }
            },
            skewSetter = gsap.quickSetter(scrollContent, 'skewY', 'deg'),
            clamp = gsap.utils.clamp(-20, 20)

        gsap.set(scrollContent, {transformOrigin: 'center center', force3D: true})

        ScrollTrigger.create({
            onUpdate: (self) => {
                let skew = clamp(self.getVelocity() / 300)
                if (Math.abs(skew) > Math.abs(proxy.skew)) {
                    proxy.skew = skew
                    proxy.onUpdate()
                }
            }
        })

        gsap.set(scrollContent, {y: 0})

        gsap.to(scrollContent, {
            x: -500,
            scrollTrigger: {
                trigger: container,
                start: 'top center',
                end: 'bottom center',
                scrub: 1,
                markers: false,
                ...options,
            },
        })

        gsap.to(proxy, {
            skew: 0,
            duration: 0.8,
            ease: 'power3',
            overwrite: 'auto'
        })
    }

    // Pin section
    const pinSection = (element: Element | string, options: any = {}) => {
        ScrollTrigger.create({
            trigger: element,
            pin: true,
            pinSpacing: false,
            start: 'top top',
            end: 'bottom top',
            markers: false,
            ...options,
        })
    }

    // Refresh ScrollTrigger after dynamic content
    const refreshScroll = () => {
        ScrollTrigger.refresh()
    }

    // Kill all animations
    const killAll = () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        gsap.killTweensOf('*')
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

