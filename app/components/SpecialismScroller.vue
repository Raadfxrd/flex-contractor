<script setup lang="ts">
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const c = useContent()
const localePath = useLocalePath()

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
   * values section) sits ABOVE this component. From here down there are none:
   * this section is pinned, and testimonials, contact and the footer all opt
   * out.
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
     * 'top 80%', not 'top center'. Between the previous section's snap position
     * and this threshold, mandatory snapping is still live with that section as
     * the only reachable snap point, so the gap is a zone the scroll can get
     * pulled back into. 80% leaves only a fifth of a viewport of it while still
     * letting the previous section snap normally either way.
     *
     * NOTE: useScrollSnap()'s wheel handler also animates the page across this
     * gap in one move, which is what stops a discrete mouse notch getting stuck
     * on the last snap point. The two work together; do not remove either.
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
     * snap points below it, snapping the page back up.
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
          if (progressRef.value) gsap.set(progressRef.value, {scaleX: self.progress})
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
  document.body.classList.remove('snap-disabled')
})
</script>

<template>
  <section ref="sectionRef" class="relative flex h-screen w-full flex-col overflow-hidden bg-ink">
    <div class="wrap shrink-0 pt-[calc(var(--header-h)+2rem)]">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p class="eyebrow">{{ c.specialisms.eyebrow }}</p>
          <h2 class="display-2 mt-5">{{ c.specialisms.title }}</h2>
        </div>

        <div class="flex items-center gap-6">
          <p class="hidden max-w-xs text-sm text-neutral-500 sm:block">
            {{ pinned ? c.specialisms.scrollHint : c.specialisms.swipeHint }}
          </p>
          <NuxtLink :to="localePath('/specialisms')" class="btn-secondary !px-5 !py-2.5 !text-[0.6875rem]">
            {{ c.actions.allSpecialisms }}
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
        :aria-label="c.specialisms.title"
    >
      <ul ref="trackRef" class="flex w-max list-none items-stretch gap-6 px-6 md:gap-8 md:px-10 lg:px-16">
        <li
            v-for="(item, i) in c.specialisms.items"
            :key="item.slug"
            class="flex w-[17rem] shrink-0 snap-start flex-col border border-white/10 bg-surface md:w-[22rem]"
        >
          <!--
            Only four of the twelve carry a photo. Rather than pad the rest with
            a placeholder, the card simply runs as type — which keeps the row
            honest about what we actually have images of.

            These sources are 1280px, so `sizes` caps well under it.
          -->
          <div v-if="item.image" class="relative h-44 w-full overflow-hidden bg-surface-2 md:h-52">
            <NuxtImg
                :src="item.image"
                :alt="item.imageAlt ?? ''"
                :loading="i === 0 ? 'eager' : 'lazy'"
                sizes="xs:272px sm:272px md:352px lg:352px xl:352px"
                width="352"
                height="208"
                class="h-full w-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent"/>
          </div>

          <div class="flex flex-1 flex-col p-6">
            <span class="numeral text-xs text-brand">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3 class="mt-3 font-display text-xl font-bold leading-tight text-white">{{ item.title }}</h3>
            <p class="mt-3 flex-1 text-sm leading-relaxed text-neutral-400">{{ item.description }}</p>

            <!--
              The specific trades stay visible. Grouping twelve narrow
              specialisms into six broad areas is what stops the site reading
              as a jobbing specialist, but somebody searching for "dakkapel"
              still needs to see the word on the page.
            -->
            <ul class="mt-5 space-y-1.5 border-t border-white/10 pt-4">
              <li v-for="line in item.includes" :key="line" class="text-xs text-neutral-500">
                {{ line }}
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>

    <!-- Progress rail: only meaningful while scroll drives the track -->
    <div v-show="pinned" class="wrap shrink-0 pb-10">
      <div class="h-px w-full bg-white/15">
        <div ref="progressRef" class="h-px w-full origin-left scale-x-0 bg-brand"/>
      </div>
    </div>
  </section>
</template>
