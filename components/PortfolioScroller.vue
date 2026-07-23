<script setup lang="ts">
import {ref} from 'vue'

interface Project {
  id: number
  title: string
  category: string
  image: string
}

const scrollContainer = ref<HTMLElement | null>(null)

const handleWheel = (event: WheelEvent) => {
  const el = scrollContainer.value
  if (!el) return

  // Ignore gestures that are already primarily horizontal (trackpad swipes).
  if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return

  const delta = event.deltaY
  const atStart = el.scrollLeft <= 0
  const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1

  if ((delta < 0 && atStart) || (delta > 0 && atEnd)) return

  event.preventDefault()
  el.scrollLeft += delta
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Modern Office Tower',
    category: 'Commercial',
    image: '/img/office.jpg',
  },
  {
    id: 2,
    title: 'Residential Complex',
    category: 'Residential',
    image: '/img/residential.jpg',
  },
  {
    id: 3,
    title: 'Industrial Facility',
    category: 'Industrial',
    image: '/img/industrial.jpg',
  },
  {
    id: 4,
    title: 'Luxury Renovation',
    category: 'Renovation',
    image: '/img/luxury.jpg',
  },
  {
    id: 5,
    title: 'Shopping Mall',
    category: 'Commercial',
    image: '/img/shopping-mall.jpg',
  },
]
</script>

<template>
  <section
      class="relative w-full h-screen bg-black flex flex-col"
      @wheel="handleWheel"
  >
    <!-- Title (outside scroll container) -->
    <div class="pt-12 px-6 md:px-12">
      <h2 class="section-title text-4xl md:text-6xl font-bold mb-2">
        Portfolio
      </h2>
      <p class="text-gray-400 text-sm md:text-base">Scroll to explore our latest projects</p>
    </div>

    <!-- Horizontal Scroll Container -->
    <div
        ref="scrollContainer"
        class="flex-1 overflow-x-auto overflow-y-hidden"
    >
      <div class="flex gap-6 md:gap-8 h-full items-center px-6 md:px-12 py-20 w-max">
        <div
            v-for="project in projects"
            :key="project.id"
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
