<script setup lang="ts">
import {onMounted, onUnmounted, ref} from 'vue'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const heroRef = ref<HTMLElement>()
const headlineRef = ref<HTMLElement>()
const subheadlineRef = ref<HTMLElement>()
const scrollIndicatorRef = ref<HTMLElement>()

let mm: gsap.MatchMedia

onMounted(() => {
  if (!heroRef.value) return

  /*
   * gsap.matchMedia does two jobs here: it scopes every tween so a single
   * revert() tears them down, and it gates them on prefers-reduced-motion.
   * When motion is not wanted the callback never runs, so the content simply
   * renders in its final state -- no opacity:0 left stranded.
   */
  mm = gsap.matchMedia()

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    if (headlineRef.value) {
      gsap.from(headlineRef.value, {opacity: 0, y: 50, duration: 1.2, ease: 'power2.out', delay: 0.3})
    }

    if (subheadlineRef.value) {
      gsap.from(subheadlineRef.value, {opacity: 0, y: 30, duration: 1, ease: 'power2.out', delay: 0.6})
    }

    if (scrollIndicatorRef.value) {
      gsap.to(scrollIndicatorRef.value, {
        opacity: 0.5,
        y: 10,
        duration: 1.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    }

    gsap.to(heroRef.value!, {
      scale: 1.05,
      scrollTrigger: {
        trigger: heroRef.value,
        start: 'top top',
        end: 'bottom center',
        scrub: 1,
      },
    })
  })
})

onUnmounted(() => mm?.revert())
</script>

<template>
  <section
      ref="heroRef"
      class="section-container relative w-full h-screen flex items-center justify-center bg-black"
  >
    <!--
      A real <img> rather than a CSS background: this is the LCP element, and a
      background-image is not preload-discoverable, so the browser only finds it
      after the stylesheet resolves.
    -->
    <NuxtImg
        src="/img/hero.jpg"
        alt=""
        aria-hidden="true"
        preload
        fetchpriority="high"
        loading="eager"
        sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:100vw"
        class="absolute inset-0 w-full h-full object-cover brightness-[0.3]"
    />

    <!-- Gradient Overlay -->
    <div class="gradient-overlay"/>

    <!-- Content -->
    <div class="relative z-10 text-center px-4 max-w-4xl mx-auto">
      <h1
          ref="headlineRef"
          class="section-title mb-6 text-7xl md:text-8xl font-black tracking-tighter"
      >
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Flex Contractor
        </span>
      </h1>
      <p ref="subheadlineRef" class="section-subtitle text-2xl md:text-3xl font-light">
        From foundation to finish
      </p>
    </div>

    <!-- Scroll Indicator -->
    <div ref="scrollIndicatorRef" class="scroll-indicator">
      <span class="text-sm font-light text-gray-400">Scroll to explore</span>
      <svg
          class="w-6 h-6 text-accent"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.5"
          aria-hidden="true"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
      </svg>
    </div>
  </section>
</template>
