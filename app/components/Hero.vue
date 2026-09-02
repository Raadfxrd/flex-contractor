<script setup lang="ts">
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {site} from '~/data/site'

gsap.registerPlugin(ScrollTrigger)

const heroRef = ref<HTMLElement>()
const eyebrowRef = ref<HTMLElement>()
const headlineRef = ref<HTMLElement>()
const subheadlineRef = ref<HTMLElement>()
const actionsRef = ref<HTMLElement>()
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
    const intro = gsap.timeline({defaults: {ease: 'power3.out'}})
    const staged = [eyebrowRef, headlineRef, subheadlineRef, actionsRef]
        .map((r) => r.value)
        .filter(Boolean) as HTMLElement[]

    // One timeline rather than four tweens with hand-tuned delays: the stagger
    // stays correct if a line is added or removed.
    intro.from(staged, {opacity: 0, y: 28, duration: 0.9, stagger: 0.12}, 0.25)

    if (scrollIndicatorRef.value) {
      gsap.to(scrollIndicatorRef.value, {
        opacity: 0.45,
        y: 8,
        duration: 1.6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    }

    // Slow push on the backdrop only -- the copy stays put, which reads as
    // depth rather than as the whole section sliding.
    gsap.to('[data-hero-image]', {
      scale: 1.08,
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
      class="section-container isolate flex items-center overflow-hidden bg-ink"
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
        data-hero-image
        preload
        fetchpriority="high"
        loading="eager"
        sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:100vw"
        class="absolute inset-0 -z-10 h-full w-full object-cover brightness-[0.32]"
    />

    <!--
      Two overlays, not one. The vertical gradient seats the composition on the
      page ground; the left-weighted one buys contrast for the copy without
      dimming the whole photograph the way a flat scrim would.
    -->
    <div class="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/20 to-ink/60"/>
    <div class="absolute inset-0 -z-10 bg-gradient-to-r from-ink/85 via-ink/40 to-transparent"/>

    <div class="wrap">
      <div class="max-w-3xl">
        <p ref="eyebrowRef" class="eyebrow">
          General contractor · Est. {{ site.founded }}
        </p>

        <!--
          Plain white, not a clipped gradient. A white-to-grey gradient on
          display type loses contrast exactly where the line ends, and reads as
          an effect applied to the headline rather than as the headline.
        -->
        <h1 ref="headlineRef" class="display-1 mt-6">
          From foundation<br>to finish.
        </h1>

        <p ref="subheadlineRef" class="lede mt-8 max-w-xl">
          Foundations, electrical, structural work and renovation — delivered by
          directly employed trades across residential, commercial and industrial
          projects.
        </p>

        <div ref="actionsRef" class="mt-10 flex flex-col gap-3 sm:flex-row">
          <NuxtLink to="/contact" class="btn-primary">Request a quote</NuxtLink>
          <NuxtLink to="/projects" class="btn-secondary">See our work</NuxtLink>
        </div>
      </div>
    </div>

    <div ref="scrollIndicatorRef" class="scroll-indicator">
      <span class="eyebrow">Scroll</span>
      <svg
          class="h-5 w-5 text-white"
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
