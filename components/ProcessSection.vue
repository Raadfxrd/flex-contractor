<script setup lang="ts">
import {onMounted, ref} from 'vue'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {CheckIcon, ClipboardIcon, WrenchScrewdriverIcon} from '@heroicons/vue/24/outline'

gsap.registerPlugin(ScrollTrigger)

interface Step {
  number: string
  title: string
  description: string
  icon: any
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Plan',
    description: 'We analyze your vision, requirements, and timeline to create a comprehensive blueprint.',
    icon: ClipboardIcon,
  },
  {
    number: '02',
    title: 'Build',
    description: 'Our expert team executes the plan with precision, quality, and attention to detail.',
    icon: WrenchScrewdriverIcon,
  },
  {
    number: '03',
    title: 'Deliver',
    description: 'We hand over your project complete, on time, and exceeding expectations.',
    icon: CheckIcon,
  },
]

const sectionRef = ref<HTMLDivElement>()
const stepRefs = ref<HTMLDivElement[]>([])
const titleRef = ref<HTMLElement>()

onMounted(() => {
  if (!sectionRef.value) return

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

  // Animate each step sequentially
  stepRefs.value.forEach((step, index) => {
    gsap.fromTo(
        step,
        {opacity: 0, y: 30},
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.value,
            start: `top 50%`,
            end: `top 30%`,
            scrub: 0.5,
            markers: false,
          },
          delay: index * 0.15,
        }
    )
  })

  // Connecting line animation
  const connector = sectionRef.value.querySelector('.step-connector')
  if (connector) {
    gsap.fromTo(
        connector,
        {scaleX: 0},
        {
          scaleX: 1,
          duration: 2.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: sectionRef.value,
            start: 'top 30%',
            end: 'top -20%',
            scrub: 0.5,
            markers: false,
          },
        }
    )
  }
})
</script>

<template>
  <section
      ref="sectionRef"
      class="section-container no-snap w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-dark-secondary px-6 py-20"
  >
    <!-- Title -->
    <div class="text-center mb-20">
      <h2 ref="titleRef" class="section-title text-6xl md:text-7xl font-bold mb-6">
        Our Process
      </h2>
      <p class="text-gray-400 text-lg max-w-2xl mx-auto">
        A streamlined approach from concept to completion
      </p>
    </div>

    <!-- Steps Container -->
    <div class="relative w-full max-w-5xl">
      <!-- Connecting Line -->
      <div
          class="step-connector absolute top-1/4 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent to-transparent transform origin-left"
          style="width: 100%; height: 2px"
      />

      <!-- Steps Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
        <div
            v-for="(step, index) in steps"
            :key="index"
            ref="stepRefs"
            class="relative flex flex-col items-center text-center"
        >
          <!-- Step Number Circle -->
          <div
              class="relative z-10 w-16 h-16 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center mb-6 backdrop-blur-sm"
          >
            <component :is="step.icon" class="w-8 h-8 text-accent"/>
          </div>

          <!-- Step Content -->
          <h3 class="text-2xl font-bold text-white mb-3">{{ step.title }}</h3>
          <p class="text-gray-400 text-sm leading-relaxed">{{ step.description }}</p>

          <!-- Step Number Badge -->
          <div class="absolute -top-2 -right-2 flex items-center justify-center">
            <span class="text-xs font-bold text-accent">{{ step.number }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Process section specific styles */
</style>

