<script setup lang="ts">
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {CheckIcon, ClipboardIcon, WrenchScrewdriverIcon} from '@heroicons/vue/24/outline'
import type {Component} from 'vue'

gsap.registerPlugin(ScrollTrigger)

interface Step {
  number: string
  title: string
  description: string
  icon: Component
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Plan',
    description:
        'We survey, price and programme before anyone lifts a tool — including the '
        + 'parts of the job most likely to become a variation later.',
    icon: ClipboardIcon,
  },
  {
    number: '02',
    title: 'Build',
    description:
        'Directly employed trades working to one programme, with a named site manager '
        + 'and a weekly written report you do not have to ask for.',
    icon: WrenchScrewdriverIcon,
  },
  {
    number: '03',
    title: 'Deliver',
    description:
        'Snagging opens at first fix rather than at handover, so completion is a short '
        + 'list of recent items instead of a rediscovery.',
    icon: CheckIcon,
  },
]

const sectionRef = ref<HTMLDivElement>()
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
     * One timeline off one trigger. The previous version gave every step its
     * own ScrollTrigger with a hand-tuned `delay`, which on a snapping page all
     * resolved in the same frame -- the stagger never actually read.
     */
    const tl = gsap.timeline({
      defaults: {ease: 'power3.out'},
      scrollTrigger: {trigger: sectionRef.value, start: 'top 75%'},
    })

    if (headerRef.value) {
      tl.from(headerRef.value.children, {opacity: 0, y: 24, duration: 0.7, stagger: 0.1})
    }

    const connector = sectionRef.value!.querySelector('.step-connector')
    if (connector) {
      tl.from(connector, {scaleX: 0, duration: 0.9, ease: 'power2.inOut'}, '-=0.35')
    }

    if (gridRef.value) {
      tl.from(gridRef.value.children, {opacity: 0, y: 28, duration: 0.7, stagger: 0.12}, '-=0.55')
    }
  })
})

onUnmounted(() => mm?.revert())
</script>

<template>
  <section
      ref="sectionRef"
      class="section-container flex flex-col justify-center bg-gradient-to-b from-ink to-surface-2"
  >
    <div class="wrap">
      <div ref="headerRef" class="max-w-2xl">
        <p class="eyebrow">How we work</p>
        <h2 class="display-2 mt-6">Three stages, no surprises.</h2>
        <p class="lede mt-6">
          The same sequence on a single-room renovation and on a fourteen-storey frame.
          Only the duration changes.
        </p>
      </div>

      <div class="relative mt-16 md:mt-24">
        <!--
          The connector is a hairline that scales from the left as the section
          arrives. It sits behind the numerals and is decorative, so it is
          aria-hidden.
        -->
        <div
            class="step-connector absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-white/40 via-white/15 to-transparent"
            aria-hidden="true"
        />

        <ol ref="gridRef" class="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
          <li v-for="step in steps" :key="step.number" class="pt-8">
            <div class="flex items-center gap-4">
              <span class="numeral text-5xl font-bold leading-none text-white md:text-6xl">
                {{ step.number }}
              </span>
              <component :is="step.icon" class="h-5 w-5 text-neutral-600" aria-hidden="true"/>
            </div>

            <h3 class="display-3 mt-6">{{ step.title }}</h3>
            <p class="body-copy mt-4 max-w-sm">{{ step.description }}</p>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
