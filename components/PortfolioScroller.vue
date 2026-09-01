<script setup lang="ts">
import {onMounted, onUnmounted, ref} from 'vue'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Project {
  id: number
  title: string
  category: string
  image: string
}

const projects: Project[] = [
  {id: 1, title: 'Modern Office Tower', category: 'Commercial', image: '/img/office.jpg'},
  {id: 2, title: 'Residential Complex', category: 'Residential', image: '/img/residential.jpg'},
  {id: 3, title: 'Industrial Facility', category: 'Industrial', image: '/img/industrial.jpg'},
  {id: 4, title: 'Luxury Renovation', category: 'Renovation', image: '/img/luxury.jpg'},
  {id: 5, title: 'Shopping Mall', category: 'Commercial', image: '/img/shopping-mall.jpg'},
]

const sectionRef = ref<HTMLElement>()
const trackRef = ref<HTMLElement>()
const progressRef = ref<HTMLElement>()

/*
 * When the pinned animation is driving the track we translate it directly, so
 * the wrapper must not clip. When it is NOT driving it (reduced motion, or
 * before hydration) the wrapper stays a plain horizontal scroller -- that is
 * the accessible baseline: real scrollbar, keyboard arrows, touch swipe.
 */
const pinned = ref(false)

let mm: gsap.MatchMedia
let snapGate: ScrollTrigger | undefined

onMounted(() => {
  if (!sectionRef.value || !trackRef.value) return

  /*
   * Every scroll-snap point on the page (hero, the four story sections, the
   * process section) sits ABOVE this component. From here down there are none:
   * the portfolio is pinned, and contact and the footer both opt out.
   *
   * So rather than coordinating with the pin frame by frame, switch snapping
   * off wholesale for the whole region. One boundary, no race. Handing over at
   * 'top center' -- rather than when the pin engages -- leaves the process
   * section still snappable on the way in, and re-arms it on the way back up.
   *
   * Created outside the matchMedia block on purpose: it must hold on mobile
   * and under reduced motion too, where there is no pin at all.
   */
  snapGate = ScrollTrigger.create({
    trigger: sectionRef.value,
    start: 'top center',
    end: 'max',
    onToggle: (self) => {
      document.documentElement.classList.toggle('snap-disabled', self.isActive)
    },
  })

  // onToggle only fires on a state change, so seed the initial value -- a
  // reload partway down the page would otherwise start in the wrong mode.
  document.documentElement.classList.toggle('snap-disabled', snapGate.isActive)

  mm = gsap.matchMedia()

  mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', () => {
    const track = trackRef.value!
    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth)

    pinned.value = true

    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top top',
        // Travel exactly as far as the content overflows, recomputed on
        // resize via invalidateOnRefresh.
        end: () => `+=${distance()}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progressRef.value) {
            gsap.set(progressRef.value, {scaleX: self.progress})
          }
        },
      },
    })

    return () => {
      pinned.value = false
      tween.scrollTrigger?.kill()
      tween.kill()
      gsap.set(track, {clearProps: 'x'})
    }
  })
})

onUnmounted(() => {
  snapGate?.kill()
  mm?.revert()
  document.documentElement.classList.remove('snap-disabled')
})
</script>

<template>
  <section
      ref="sectionRef"
      class="relative w-full h-screen bg-black flex flex-col overflow-hidden"
  >
    <!-- Title -->
    <div class="pt-12 px-6 md:px-12 shrink-0">
      <h2 class="section-title text-4xl md:text-6xl font-bold mb-2">
        Portfolio
      </h2>
      <p class="text-gray-400 text-sm md:text-base">
        {{ pinned ? 'Keep scrolling to move through the work' : 'Swipe or scroll sideways to see the work' }}
      </p>
    </div>

    <!-- Track -->
    <div
        :class="[
          'flex-1 min-h-0 flex items-center',
          pinned ? 'overflow-visible' : 'overflow-x-auto overflow-y-hidden snap-x snap-mandatory',
        ]"
        :tabindex="pinned ? -1 : 0"
        role="group"
        aria-label="Selected projects"
    >
      <ul
          ref="trackRef"
          class="flex gap-6 md:gap-8 items-center px-6 md:px-12 w-max list-none"
      >
        <li
            v-for="(project, i) in projects"
            :key="project.id"
            class="relative shrink-0 w-[20rem] md:w-[34rem] snap-start group"
        >
          <div class="relative w-full h-[24rem] md:h-[38rem] rounded-lg overflow-hidden">
            <NuxtImg
                :src="project.image"
                :alt="`${project.title} — ${project.category} project`"
                :loading="i === 0 ? 'eager' : 'lazy'"
                sizes="xs:320px sm:320px md:544px lg:544px xl:544px"
                width="544"
                height="608"
                class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"/>
          </div>

          <!--
            Caption sits below the image rather than inside a hover-only
            overlay: hover does not exist on touch, so an overlay-only caption
            is invisible to every phone visitor.
          -->
          <div class="flex items-baseline gap-4 pt-5">
            <span class="text-xs font-mono text-gray-500 tabular-nums">
              {{ String(i + 1).padStart(2, '0') }}
            </span>
            <div>
              <h3 class="text-xl md:text-2xl font-bold text-white leading-tight">
                {{ project.title }}
              </h3>
              <span class="text-sm text-gray-400">{{ project.category }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- Progress rail: only meaningful while scroll drives the track -->
    <div v-show="pinned" class="shrink-0 px-6 md:px-12 pb-10">
      <div class="h-px w-full bg-white/15">
        <div ref="progressRef" class="h-px w-full bg-white origin-left scale-x-0"/>
      </div>
    </div>
  </section>
</template>
