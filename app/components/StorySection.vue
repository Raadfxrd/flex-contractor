<script setup lang="ts">
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
  /** When set, the section links through to the matching service page. */
  slug?: string
}

const props = withDefaults(defineProps<Props>(), {
  reverse: false,
  slug: undefined,
})

const sectionRef = ref<HTMLElement>()
const contentRef = ref<HTMLElement>()

const number = computed(() => String(props.index + 1).padStart(2, '0'))

let mm: gsap.MatchMedia

onMounted(() => {
  if (!sectionRef.value) return

  mm = gsap.matchMedia()

  // Gated on prefers-reduced-motion: when it does not match, the copy renders
  // in place instead of being animated in from opacity 0.
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    if (contentRef.value) {
      /*
       * Children stagger off one trigger rather than each element carrying its
       * own ScrollTrigger. On a mandatory-snap page the section arrives at the
       * top almost instantly, so several independent triggers all fire in the
       * same frame and the intended sequence collapses -- a timeline keeps it.
       */
      gsap.from(contentRef.value.children, {
        opacity: 0,
        x: props.reverse ? -40 : 40,
        duration: 0.75,
        ease: 'power3.out',
        stagger: 0.09,
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 70%',
        },
      })
    }

    const overlay = sectionRef.value!.querySelector('.story-overlay')
    if (overlay) {
      gsap.to(overlay, {
        opacity: 0.45,
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
  <section ref="sectionRef" class="section-container isolate flex items-center">
    <NuxtImg
        :src="imageUrl"
        :alt="imageAlt"
        loading="lazy"
        sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:100vw"
        class="absolute inset-0 -z-10 h-full w-full object-cover"
    />

    <div
        :class="[
          'story-overlay absolute inset-0 -z-10',
          reverse
            ? 'bg-gradient-to-l from-ink via-ink/85 to-ink/20'
            : 'bg-gradient-to-r from-ink via-ink/85 to-ink/20',
        ]"
    />

    <div class="wrap">
      <div :class="['max-w-xl', reverse ? 'ml-auto' : '']">
        <div ref="contentRef" :class="reverse ? 'text-right' : 'text-left'">
          <!--
            The ordinal is the orienting device the palette no longer has a
            colour to spend on: four sections in sequence, each one numbered.
          -->
          <p class="eyebrow">
            <span class="numeral text-white">{{ number }}</span>
            <span class="mx-3 text-neutral-700">—</span>
            <span>Capability</span>
          </p>

          <h2 class="display-2 mt-6">{{ title }}</h2>

          <div
              :class="['mt-8 h-px w-16 bg-white/30', reverse ? 'ml-auto' : '']"
              aria-hidden="true"
          />

          <p class="lede mt-8">{{ description }}</p>

          <NuxtLink
              v-if="slug"
              :to="`/services/${slug}`"
              class="btn-ghost mt-8 !text-white hover:!text-neutral-300"
          >
            <span class="border-b border-white/30 pb-1">Explore {{ title.toLowerCase() }}</span>
            <span aria-hidden="true">→</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
