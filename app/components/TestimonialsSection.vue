<script setup lang="ts">
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const c = useContent()

const sectionRef = ref<HTMLElement>()
const gridRef = ref<HTMLElement>()

let mm: gsap.MatchMedia

onMounted(() => {
  if (!sectionRef.value) return
  mm = gsap.matchMedia()
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    if (!gridRef.value) return
    gsap.from(gridRef.value.children, {
      opacity: 0, y: 28, duration: 0.7, ease: 'power3.out', stagger: 0.12,
      scrollTrigger: {trigger: sectionRef.value, start: 'top 75%'},
    })
  })
})

onUnmounted(() => mm?.revert())
</script>

<template>
  <section ref="sectionRef" class="border-t border-white/10 bg-ink">
    <div class="wrap band">
      <div class="max-w-2xl">
        <p class="eyebrow">{{ c.testimonials.eyebrow }}</p>
        <h2 class="display-2 mt-5">{{ c.testimonials.title }}</h2>
        <!--
          Shown only on locales where these are translations. The quotes are
          real statements made in Dutch; rendering an English version without
          saying so would put words in the client's mouth.
        -->
        <p v-if="c.testimonials.note" class="mt-4 text-sm italic text-neutral-500">
          {{ c.testimonials.note }}
        </p>
      </div>

      <div ref="gridRef" class="mt-14 grid gap-px bg-white/10 md:grid-cols-3">
        <figure v-for="item in c.testimonials.items" :key="item.name" class="flex flex-col bg-ink p-8">
          <span class="font-display text-5xl leading-none text-brand" aria-hidden="true">&ldquo;</span>
          <blockquote class="mt-4 flex-1">
            <p class="text-base leading-relaxed text-neutral-300">{{ item.quote }}</p>
          </blockquote>
          <figcaption class="mt-8 border-t border-white/10 pt-5 font-display text-xs uppercase tracking-eyebrow text-white">
            {{ item.name }}
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>
