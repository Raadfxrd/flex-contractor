<script setup lang="ts">
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const c = useContent()

const sectionRef = ref<HTMLElement>()
const headerRef = ref<HTMLElement>()
const gridRef = ref<HTMLElement>()

let mm: gsap.MatchMedia

onMounted(() => {
  if (!sectionRef.value) return

  mm = gsap.matchMedia()

  // Gated on prefers-reduced-motion: when it does not match nothing runs,
  // so content renders in place rather than stranded at opacity 0.
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    /*
     * One timeline off one trigger, rather than a ScrollTrigger per card with
     * hand-tuned `delay`s. Independent triggers on elements this close together
     * resolve within a frame or two of each other, so the stagger never reads.
     */
    const tl = gsap.timeline({
      defaults: {ease: 'power3.out'},
      scrollTrigger: {trigger: sectionRef.value, start: 'top 75%'},
    })

    /*
     * `set()` then `to()`, deliberately -- not `from()`.
     *
     * A `from()` tween that carries a ScrollTrigger does not apply its start
     * values until ScrollTrigger's first update, and `create()` defers that
     * to the next frame. Switching language remounts the whole page, so that
     * leaves one painted frame where the incoming copy is fully visible
     * before it is yanked to opacity 0 and animated in -- which reads as the
     * text flashing in the wrong place.
     *
     * `gsap.set()` cannot be deferred: it lands in the same frame as
     * onMounted, before the browser paints. Both calls sit inside the
     * matchMedia context, so mm.revert() still restores everything, and
     * under reduced motion neither runs and the content renders in place.
     */
    if (headerRef.value) {
      gsap.set(headerRef.value.children, {opacity: 0, y: 24})
      tl.to(headerRef.value.children, {opacity: 1, y: 0, duration: 0.7, stagger: 0.1})
    }
    if (gridRef.value) {
      gsap.set(gridRef.value.children, {opacity: 0, y: 24})
      tl.to(gridRef.value.children, {opacity: 1, y: 0, duration: 0.6, stagger: 0.06}, '-=0.4')
    }
  })
})

onUnmounted(() => mm?.revert())
</script>

<template>
  <section
      ref="sectionRef"
      class="section-container flex flex-col justify-center bg-gradient-to-b from-ink to-surface-2 py-24"
  >
    <div class="wrap">
      <div ref="headerRef" class="max-w-2xl">
        <p class="eyebrow">{{ c.values.eyebrow }}</p>
        <h2 class="display-2 mt-6">{{ c.values.title }}</h2>
        <p class="lede mt-6">{{ c.intro.body }}</p>
        <p class="mt-5 border-l-2 border-brand pl-5 text-base leading-relaxed text-neutral-300">
          {{ c.intro.range }}
        </p>
      </div>

      <!--
        Eight items on one full-viewport screen, so the cards stay short: a title and
        one line each. A hairline top rule per column does the separating work
        instead of borders, which would box in an already dense grid.
      -->
      <ul ref="gridRef" class="mt-14 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="(value, i) in c.values.items" :key="value.title" class="border-t border-white/10 pt-5">
          <span class="numeral text-xs text-brand">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3 class="mt-3 font-display text-lg font-bold leading-snug text-white">{{ value.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-neutral-400">{{ value.body }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
