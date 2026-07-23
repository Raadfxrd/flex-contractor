<script setup lang="ts">
import {onMounted, ref} from 'vue'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Project {
  id: number
  title: string
  category: string
  image: string
}

const sectionRef = ref<HTMLDivElement>()
const scrollContainerRef = ref<HTMLDivElement>()
const titleRef = ref<HTMLElement>()
const projectsRef = ref<HTMLDivElement[]>([])

const projects: Project[] = [
  {
    id: 1,
    title: 'Modern Office Tower',
    category: 'Commercial',
    image: '/img/800x600.png',
  },
  {
    id: 2,
    title: 'Residential Complex',
    category: 'Residential',
    image: '/img/600x800.png',
  },
  {
    id: 3,
    title: 'Industrial Facility',
    category: 'Industrial',
    image: '/img/600x600.png',
  },
  {
    id: 4,
    title: 'Luxury Renovation',
    category: 'Renovation',
    image: '/img/800x600.png',
  },
  {
    id: 5,
    title: 'Shopping Mall',
    category: 'Commercial',
    image: '/img/600x800.png',
  },
]

onMounted(() => {
  if (!sectionRef.value || !scrollContainerRef.value) return

  // Animate title
  if (titleRef.value) {
    gsap.fromTo(
        titleRef.value,
        {opacity: 0, y: 30},
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.value,
            start: 'top 60%',
            end: 'top 40%',
            scrub: 0.5,
            markers: false,
          },
        }
    )
  }

  // Horizontal scroll animation
  const proxy = {skew: 0}
  const clamp = gsap.utils.clamp(-20, 20)
  const scrollSetter = gsap.quickSetter(scrollContainerRef.value, 'x', 'px')

  gsap.set(scrollContainerRef.value, {transformOrigin: 'center center', force3D: true})

  const initHorizontalScroll = () => {
    if (!sectionRef.value || !scrollContainerRef.value) return

    // remove any existing ScrollTriggers for this section to avoid duplicates
    ScrollTrigger.getAll()
        .filter((t) => t.trigger === sectionRef.value)
        .forEach((t) => t.kill())

    const container = scrollContainerRef.value
    const section = sectionRef.value
    const totalScrollable = Math.max(0, container.scrollWidth - section.offsetWidth)

    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => `+=${totalScrollable}`,
      scrub: 1,
      pin: true,
      markers: false,
      onUpdate(self) {
        // update horizontal position (performance-optimized)
        scrollSetter(-self.progress * totalScrollable)

        // subtle skew/velocity effect
        const skew = clamp(self.getVelocity() / 300)
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew
          gsap.to(proxy, {skew: 0, duration: 0.8, ease: 'power3', overwrite: 'auto'})
        }
      },
    })
  }

  // initialize now and again after images/load/resize so measurements are correct
  initHorizontalScroll()
  window.addEventListener('load', initHorizontalScroll)
  window.addEventListener('resize', initHorizontalScroll)

  // Animate individual projects
  projectsRef.value.forEach((project) => {
    gsap.fromTo(
        project,
        {opacity: 0.6, scale: 1},
        {
          opacity: 1,
          scale: 1.02,
          duration: 0.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: project,
            start: 'left center',
            end: 'right center',
            scrub: 1,
            markers: false,
          },
          onMouseEnter() {
            gsap.to(project, {scale: 1.05, duration: 0.3})
          },
          onMouseLeave() {
            gsap.to(project, {scale: 1.02, duration: 0.3})
          },
        }
    )
  })
})
</script>

<template>
  <section
      ref="sectionRef"
      class="section-container no-snap relative w-full h-screen bg-black"
  >
    <!-- Title (outside scroll container) -->
    <div class="absolute top-0 left-0 right-0 z-20 pt-12 px-6 md:px-12">
      <h2 ref="titleRef" class="section-title text-4xl md:text-6xl font-bold mb-2">
        Portfolio
      </h2>
      <p class="text-gray-400 text-sm md:text-base">Scroll to explore our latest projects</p>
    </div>

    <!-- Horizontal Scroll Container -->
    <div
        ref="scrollContainerRef"
        class="flex gap-6 md:gap-8 h-full items-center px-6 md:px-12 py-20"
        style="width: fit-content"
    >
      <div
          v-for="project in projects"
          :key="project.id"
          ref="projectsRef"
          class="relative flex-shrink-0 w-[22rem] md:w-[40rem] h-[28rem] md:h-[48rem] rounded-lg overflow-hidden group cursor-pointer"
      >
        <!-- Project Image -->
        <img
            :src="project.image"
            :alt="project.title"
            class="w-full h-full object-cover"
        />

        <!-- Overlay -->
        <div
            class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-end justify-end p-6"
        >
          <h3 class="text-2xl md:text-3xl font-bold text-white mb-2">{{ project.title }}</h3>
          <span class="inline-block px-4 py-2 bg-accent rounded-full text-black text-sm font-semibold">
            {{ project.category }}
          </span>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-6 left-6 text-gray-400 text-sm">
      Drag or scroll horizontally
    </div>
  </section>
</template>

<style scoped>
/* Portfolio section specific styles */
</style>

