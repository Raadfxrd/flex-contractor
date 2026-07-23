import {onMounted, onUnmounted} from 'vue'

export const useScrollSnap = () => {
    const snapSections: HTMLElement[] = []
    let isSnapping = false
    let currentSectionIndex = 0

    const initSections = () => {
        const allSections = Array.from(
            document.querySelectorAll('.section-container')
        ) as HTMLElement[]

        snapSections.length = 0
        allSections.forEach((section) => {
            if (!section.classList.contains('no-snap')) {
                snapSections.push(section)
            }
        })
    }

    const findCurrentSection = (): number => {
        const scrollY = window.scrollY
        const windowHeight = window.innerHeight

        // Find which section is in view (top of section is above middle of viewport)
        for (let i = snapSections.length - 1; i >= 0; i--) {
            const sectionTop = snapSections[i].offsetTop
            if (scrollY >= sectionTop - windowHeight * 0.3) {
                return i
            }
        }
        return 0
    }

    const snapToSection = (index: number) => {
        if (isSnapping || index < 0 || index >= snapSections.length) return
        if (index === currentSectionIndex) return

        const targetSection = snapSections[index]
        const targetTop = targetSection.offsetTop

        isSnapping = true
        currentSectionIndex = index

        window.scrollTo({
            top: targetTop,
            behavior: 'smooth',
        })

        setTimeout(() => {
            isSnapping = false
        }, 600)
    }

    const handleScroll = () => {
        if (isSnapping) return

        const newIndex = findCurrentSection()
        if (newIndex !== currentSectionIndex) {
            currentSectionIndex = newIndex
        }
    }

    const handleWheel = (event: WheelEvent) => {
        if (isSnapping) return

        const now = Date.now()
        if (!handleWheel.lastTime) handleWheel.lastTime = now
        if (now - handleWheel.lastTime < 500) return // Ignore rapid scrolls
        handleWheel.lastTime = now

        const currentIndex = findCurrentSection()
        const delta = event.deltaY

        if (Math.abs(delta) > 10) {
            const nextIndex = delta > 0
                ? Math.min(currentIndex + 1, snapSections.length - 1)
                : Math.max(currentIndex - 1, 0)

            if (nextIndex !== currentIndex) {
                event.preventDefault()
                snapToSection(nextIndex)
            }
        }
    }

    onMounted(() => {
        initSections()
        currentSectionIndex = findCurrentSection()
        window.addEventListener('scroll', handleScroll, {passive: true})
        window.addEventListener('wheel', handleWheel, {passive: false})
    })

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll)
        window.removeEventListener('wheel', handleWheel)
    })
}

declare global {
    interface Function {
        lastTime?: number
    }
}

