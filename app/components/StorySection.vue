<script setup lang="ts">
import {onMounted, onUnmounted, ref} from 'vue'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  title: string
  description: string
  imageUrl: string
  imageAlt: string
  reverse?: boolean
  index: number
}

const props = withDefaults(defineProps<Props>(), {
  reverse: false,
})

const sectionRef = ref<HTMLElement>()
const titleRef = ref<HTMLElement>()
const descRef = ref<HTMLElement>()

let mm: gsap.MatchMedia

onMounted(() => {
  if (!sectionRef.value) return

  mm = gsap.matchMedia()

  // Gated on prefers-reduced-motion: when it does not match, the copy renders
  // in place instead of being animated in from opacity 0.
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const from = {opacity: 0, x: props.reverse ? -50 : 50}
    const reveal = {
      trigger: sectionRef.value,
      start: 'top 70%',
      end: 'top 50%',
    }

    if (titleRef.value) {
      gsap.fromTo(titleRef.value, from, {
        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: reveal,
      })
    }

    if (descRef.value) {
      gsap.fromTo(descRef.value, {opacity: 0, x: props.reverse ? -30 : 30}, {
        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: 0.1,
        scrollTrigger: reveal,
      })
    }

    const overlay = sectionRef.value!.querySelector('.story-overlay')
    if (overlay) {
      gsap.to(overlay, {
        opacity: 0.3,
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
      })
    }
  })
})

onUnmounted(() => mm?.revert())
</script>

<template>
  <section
      ref="sectionRef"
      class="section-container relative w-full h-screen flex items-center"
  >
    <!-- Background Image -->
    <NuxtImg
        :src="imageUrl"
        :alt="imageAlt"
        loading="lazy"
        sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:100vw"
        class="absolute inset-0 w-full h-full object-cover"
    />

    <!-- Overlay Gradient -->
    <div class="story-overlay absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"/>

    <!-- Content -->
    <div
        :class="[
        'relative z-10 px-6 md:px-12 lg:px-20 flex-1 max-w-2xl',
        reverse ? 'ml-auto text-right' : 'text-left',
      ]"
    >
      <div class="space-y-6">
        <h2 ref="titleRef" class="section-title text-6xl md:text-7xl font-bold">
          {{ title }}
        </h2>
        <p ref="descRef" class="section-subtitle text-lg md:text-xl font-light max-w-xl">
          {{ description }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Story section specific styles */
</style>

