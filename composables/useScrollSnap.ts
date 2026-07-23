import { onMounted, onUnmounted } from 'vue'

export const useScrollSnap = () => {
  const snapSections: Element[] = [] // Only sections with snapping enabled
  let isSnapping = false
  let lastScrollY = 0

  const initSections = () => {
    // Get ALL sections
    const allSections = Array.from(
      document.querySelectorAll('.section-container')
    )

    // Clear and find only sections that should snap (exclude no-snap)
    snapSections.length = 0
    allSections.forEach((section, index) => {
      if (!section.classList.contains('no-snap')) {
        snapSections.push(section)
      }
    })
  }

  const snapToNextSection = (direction: 'down' | 'up') => {
    if (isSnapping || snapSections.length === 0) return

    const scrollY = window.scrollY
    const windowHeight = window.innerHeight

    // Find current section - the one closest to top of viewport
    let currentIndex = -1
    for (let i = 0; i < snapSections.length; i++) {
      const rect = snapSections[i].getBoundingClientRect()
      if (rect.top <= windowHeight / 2) {
        currentIndex = i
      } else {
        break
      }
    }

    let nextIndex = currentIndex
    if (direction === 'down') {
      nextIndex = Math.min(currentIndex + 1, snapSections.length - 1)
    } else {
      nextIndex = Math.max(currentIndex - 1, 0)
    }

    // Don't snap if we're already at the target
    if (nextIndex === currentIndex) return

    const nextSectionTop = (
      snapSections[nextIndex] as HTMLElement
    ).offsetTop

    isSnapping = true
    window.scrollTo({
      top: nextSectionTop,
      behavior: 'smooth',
    })

    // Keep snapping lock while smooth scroll happens
    setTimeout(() => {
      isSnapping = false
    }, 800)
  }

  const handleScroll = () => {
    if (isSnapping) return

    const currentScrollY = window.scrollY
    const delta = currentScrollY - lastScrollY

    // Only snap if user has scrolled a meaningful amount (at least 50px)
    if (Math.abs(delta) > 50) {
      const direction = delta > 0 ? 'down' : 'up'
      snapToNextSection(direction)
      lastScrollY = currentScrollY
    }
  }

  onMounted(() => {
    initSections()
    lastScrollY = window.scrollY
    window.addEventListener('scroll', handleScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
}

