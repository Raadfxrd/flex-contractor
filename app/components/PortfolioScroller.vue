<script setup lang="ts">
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {projects} from '~/data/projects'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement>()
const trackRef = ref<HTMLElement>()
const progressRef = ref<HTMLElement>()

/*
 * When the pinned animation is driving the track we translate it directly, so
 * the wrapper must not clip. When it is NOT driving it (reduced motion, small
 * screens, or before hydration) the wrapper stays a plain horizontal scroller
 * -- that is the accessible baseline: real scrollbar, keyboard arrows, touch
 * swipe.
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
   * off wholesale for the whole region: one threshold, crossed once.
   *
   * Created outside the matchMedia block on purpose: it must hold on mobile
   * and under reduced motion too, where there is no pin at all.
   */
  /*
   * `!!` is load-bearing. ScrollTrigger only assigns `isActive` inside its
   * update(), which create() defers -- so it reads back `undefined` here. And
   * classList.toggle(name, undefined) is spec'd to behave as if the second
   * argument were omitted: it FLIPS the class instead of forcing it off. That
   * silently disabled snapping on every page load until the first toggle
   * fired with a real boolean.
   */
  const setSnapDisabled = (off: boolean) => {
    /*
     * Both elements: globals.css sets scroll-snap-type on html AND body
     * (UAs disagree about whether the viewport reads it off the root or has it
     * propagated up from body), and the disable selector covers both.
     */
    document.documentElement.classList.toggle('snap-disabled', off)
    document.body.classList.toggle('snap-disabled', off)
  }

  snapGate = ScrollTrigger.create({
    trigger: sectionRef.value,
    /*
     * 'top 80%', not 'top center'. Between the process section's snap position
     * and this threshold, mandatory snapping is still live with the process
     * section as the only reachable snap point, so that gap is a zone the
     * scroll can get pulled back into. 80% leaves only a fifth of a viewport of
     * it while still letting the process section snap normally either way.
     */
    start: 'top 80%',
    end: 'max',
    /*
     * A one-way switch on the start threshold -- deliberately NOT keyed off
     * `self.isActive`.
     *
     * ScrollTrigger computes `isActive` as `progress > 0 && progress < 1`
     * (ScrollTrigger.js:1681). With `end: 'max'`, scrolling to the very bottom
     * of the page puts progress at exactly 1, so isActive flips back to false
     * there -- which would re-arm mandatory snapping at the one place with no
     * snap points below it, snapping the page back up to the process section.
     */
    onEnter: () => setSnapDisabled(true),
    onLeaveBack: () => setSnapDisabled(false),
    // Covers loading part-way down, and re-derives after images and the pin
    // below change the layout.
    onRefresh: (self) => setSnapDisabled(self.scroll() >= self.start),
  })

  setSnapDisabled(window.scrollY >= snapGate.start)

  mm = gsap.matchMedia()

  mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', () => {
    const track = trackRef.value!
    const section = sectionRef.value!
    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth)

    pinned.value = true

    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
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

    /*
     * Keyboard parity with the mouse.
     *
     * Each card is a link, so tabbing eventually lands on one that the pin has
     * translated off-screen. The browser's own scroll-into-view then looks for
     * the nearest scrollable ancestor: <section> is `overflow-hidden`, which is
     * still programmatically scrollable, so it silently shifts its scrollLeft
     * and the pinned layout skews.
     *
     * Instead: drive the PAGE scroll to the position whose pin progress brings
     * that card into view, and reset the ancestor's own scroll offsets back to
     * zero in case the UA got there first. Tabbing now moves the track exactly
     * as scrolling does.
     */
    const st = tween.scrollTrigger!

    const onFocusIn = (event: FocusEvent) => {
      const card = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-card-index]')
      if (!card) return

      const index = Number(card.dataset.cardIndex)
      const progress = projects.length > 1 ? index / (projects.length - 1) : 0

      window.scrollTo({top: st.start + progress * (st.end - st.start)})
      section.scrollLeft = 0
      section.scrollTop = 0
    }

    section.addEventListener('focusin', onFocusIn)

    return () => {
      section.removeEventListener('focusin', onFocusIn)
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
  document.body.classList.remove('snap-disabled')
})
</script>

<template>
  <section
      ref="sectionRef"
      class="relative flex h-screen w-full flex-col overflow-hidden bg-ink"
  >
    <div class="wrap shrink-0 pt-[calc(var(--header-h)+2rem)]">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p class="eyebrow">Selected work</p>
          <h2 class="display-2 mt-5">Portfolio</h2>
        </div>

        <div class="flex items-center gap-6">
          <p class="hidden max-w-xs text-sm text-neutral-500 sm:block">
            {{ pinned ? 'Keep scrolling to move through the work.' : 'Swipe sideways to see the work.' }}
          </p>
          <NuxtLink to="/projects" class="btn-secondary !px-5 !py-2.5 !text-[0.6875rem]">
            All projects
          </NuxtLink>
        </div>
      </div>
    </div>

    <div
        :class="[
          'flex min-h-0 flex-1 items-center',
          pinned ? 'overflow-visible' : 'snap-x snap-mandatory overflow-x-auto overflow-y-hidden',
        ]"
        :tabindex="pinned ? -1 : 0"
        role="group"
        aria-label="Selected projects"
    >
      <ul
          ref="trackRef"
          class="flex w-max list-none items-stretch gap-6 px-6 md:gap-10 md:px-10 lg:px-16"
      >
        <li
            v-for="(project, i) in projects"
            :key="project.slug"
            :data-card-index="i"
            class="group relative w-[19rem] shrink-0 snap-start md:w-[30rem]"
        >
          <NuxtLink :to="`/projects/${project.slug}`" class="block">
            <div class="relative h-[20rem] w-full overflow-hidden bg-surface md:h-[30rem]">
              <NuxtImg
                  :src="project.image"
                  :alt="project.imageAlt"
                  :loading="i === 0 ? 'eager' : 'lazy'"
                  sizes="xs:304px sm:304px md:480px lg:480px xl:480px"
                  width="480"
                  height="480"
                  class="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"/>
            </div>

            <!--
              Caption sits below the image rather than inside a hover-only
              overlay: hover does not exist on touch, so an overlay-only caption
              is invisible to every phone visitor.
            -->
            <div class="mt-5 flex items-baseline gap-4 border-t border-white/10 pt-5">
              <span class="numeral shrink-0 text-xs text-neutral-600">
                {{ String(i + 1).padStart(2, '0') }}
              </span>
              <div>
                <h3 class="display-3 leading-tight transition-colors group-hover:text-neutral-300">
                  {{ project.title }}
                </h3>
                <p class="mt-1.5 text-sm text-neutral-500">
                  {{ project.category }} · {{ project.year }}
                </p>
              </div>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>

    <!-- Progress rail: only meaningful while scroll drives the track -->
    <div v-show="pinned" class="wrap shrink-0 pb-10">
      <div class="h-px w-full bg-white/15">
        <div ref="progressRef" class="h-px w-full origin-left scale-x-0 bg-white"/>
      </div>
    </div>
  </section>
</template>
