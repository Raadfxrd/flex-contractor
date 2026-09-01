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

let ctx: gsap.Context

onMounted(() => {
  if (!sectionRef.value) return

  ctx = gsap.context(() => {
    // Fade and slide in title
    if (titleRef.value) {
      gsap.fromTo(
          titleRef.value,
          {opacity: 0, x: props.reverse ? -50 : 50},
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.value,
              start: 'top 70%',
              end: 'top 50%',
            },
          }
      )
    }

    // Fade and slide in description
    if (descRef.value) {
      gsap.fromTo(
          descRef.value,
          {opacity: 0, x: props.reverse ? -30 : 30},
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.1,
            scrollTrigger: {
              trigger: sectionRef.value,
              start: 'top 70%',
              end: 'top 50%',
            },
          }
      )
    }

    // Subtle overlay effect
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
  }, sectionRef.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section
      ref="sectionRef"
      class="section-container relative w-full h-screen flex items-center"
  >
    <!-- Background Image -->
    <div
        role="img"
        :aria-label="imageAlt"
        class="absolute inset-0 w-full h-full bg-cover bg-center overflow-hidden"
        :style="{ backgroundImage: `url(${imageUrl})` }"
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

