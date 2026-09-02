<script setup lang="ts">
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const c = useContent()
const localePath = useLocalePath()

const heroRef = ref<HTMLElement>()
const contentRef = ref<HTMLElement>()
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
    if (contentRef.value) {
      // One timeline rather than a tween per line with hand-tuned delays: the
      // stagger stays correct if a line is added or removed.
      // Same set()-then-to() shape as the scroll-triggered reveals, so there is
      // one pattern to recognise and the hidden state is provably synchronous.
      gsap.set(contentRef.value.children, {opacity: 0, y: 28})

      gsap.to(contentRef.value.children, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12, delay: 0.25,
      })
    }

    if (scrollIndicatorRef.value) {
      gsap.to(scrollIndicatorRef.value, {
        opacity: 0.45, y: 8, duration: 1.6, ease: 'sine.inOut', repeat: -1, yoyo: true,
      })
    }

    // Slow push on the backdrop only -- the copy stays put, which reads as
    // depth rather than as the whole section sliding.
    gsap.to('[data-hero-image]', {
      scale: 1.08,
      scrollTrigger: {trigger: heroRef.value, start: 'top top', end: 'bottom center', scrub: 1},
    })
  })
})

onUnmounted(() => mm?.revert())
</script>

<template>
  <!--
    The copy is vertically centred, so it needs both ends held off explicitly:
    `pt` the height of the fixed header, and `pb` enough to clear the scroll
    indicator anchored at `bottom-8`. Without them, a short viewport (landscape,
    or a large system font) tucks the eyebrow under the header bar and runs the
    buttons into the indicator. With `min-h-svh` on `.section-container` the
    padding is inside the viewport height, not added to it.
  -->
  <section
      ref="heroRef"
      class="section-container isolate flex items-center overflow-hidden bg-ink pb-28 pt-[var(--header-h)]"
  >
    <!--
      A real <img> rather than a CSS background: this is the LCP element, and a
      background-image is not preload-discoverable, so the browser only finds it
      after the stylesheet resolves.

      hero.jpg is one of the 2560px sources, so a full-bleed 100vw is safe here.
      The four photos from the old site are only 1280px and must NOT be used
      this way -- see the note in CLAUDE.md.
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
      <div ref="contentRef" class="max-w-3xl">
        <p class="eyebrow">{{ c.hero.eyebrow }}</p>

        <h1 class="display-1 mt-6">{{ c.hero.title }}</h1>

        <p class="lede mt-8 max-w-xl">{{ c.hero.lede }}</p>

        <div class="mt-10 flex flex-col gap-3 sm:flex-row">
          <NuxtLink :to="localePath('/contact')" class="btn-primary">{{ c.actions.requestQuote }}</NuxtLink>
          <NuxtLink :to="localePath('/specialisms')" class="btn-secondary">{{ c.actions.seeWork }}</NuxtLink>
        </div>
      </div>
    </div>

    <div ref="scrollIndicatorRef" class="scroll-indicator">
      <span class="eyebrow">{{ c.hero.scroll }}</span>
      <svg
          class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
      </svg>
    </div>
  </section>
</template>
