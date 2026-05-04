<script setup lang="ts">
import {onMounted, ref} from 'vue'
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

const sectionRef = ref<HTMLDivElement>()
const imageRef = ref<HTMLDivElement>()
const contentRef = ref<HTMLDivElement>()
const titleRef = ref<HTMLElement>()
const descRef = ref<HTMLElement>()

onMounted(() => {
  if (!sectionRef.value) return

  // Parallax effect on background image
  if (imageRef.value) {
    gsap.to(imageRef.value, {
      y: -100,
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        markers: false,
      },
    })

    // Subtle zoom effect on image
    gsap.to(imageRef.value, {
      scale: 1.05,
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        markers: false,
      },
    })
  }

  // Fade and slide in title
  if (titleRef.value) {
    gsap.fromTo(
        titleRef.value,
        {opacity: 0, x: props.reverse ? -50 : 50},
        {
          opacity: 1,
          x: 0,
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

  // Fade and slide in description
  if (descRef.value) {
    gsap.fromTo(
        descRef.value,
        {opacity: 0, x: props.reverse ? -30 : 30},
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power2.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.value,
            start: 'top 55%',
            end: 'top 35%',
            scrub: 0.5,
            markers: false,
          },
        }
    )
  }

  // Subtle overlay effect
  const overlay = sectionRef.value.querySelector('.story-overlay')
  if (overlay) {
    gsap.to(overlay, {
      opacity: 0.3,
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        markers: false,
      },
    })
  }
})
</script>

<template>
  <section
      ref="sectionRef"
      class="section-container relative w-full h-screen flex items-center overflow-hidden"
  >
    <!-- Background Image -->
    <div
        ref="imageRef"
        class="absolute inset-0 w-full h-full bg-cover bg-center"
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
      <div ref="contentRef" class="space-y-6">
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

