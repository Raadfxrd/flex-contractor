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

onMounted(() => {
  if (!sectionRef.value || !trackRef.value) return

  /*
   * No snap gate here any more. This component used to own a ScrollTrigger
   * whose only job was toggling `.snap-disabled` on <html> and <body>, because
   * a pin and the mandatory-snap engine fight over scroll position. Snapping is
   * gone, so the pin is now the only thing driving the scroll in this region.
   */
  mm = gsap.matchMedia()

  /*
   * The query MUST match the `pin` screen in tailwind.config.ts exactly -- that
   * is where the reasoning for both halves lives. The height half is the one
   * that is easy to drop: a viewport too short to hold a whole card row under
   * the heading pins anyway and silently clips the bottom off every card.
   */
  mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px) and (min-height: 860px)', () => {
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

onUnmounted(() => mm?.revert())
</script>

<template>
  <!--
    Every `pin:` utility below is the full-viewport, pinned layout; the base
    utilities are the carousel fallback. `pin` is a custom screen defined in
    tailwind.config.ts and it is deliberately height-aware as well as
    width-aware -- see the note there.

    Full-viewport ONLY when pinned. Otherwise the height has to follow the
    content: a card measures 579px, so a fixed viewport height plus
    `overflow-hidden` cut the bottom off every card in the row -- 85px lost at
    391x696, 118px at 1024x768, 52px at 1366x768.

    The top padding clears the fixed header only when pinned, since that is the
    only time this section sits at the top of the viewport. Anywhere else it is
    just a gap in the middle of a scrolling page.
  -->
  <section ref="sectionRef" class="pin:h-svh relative flex w-full flex-col overflow-hidden bg-ink">
    <div class="wrap shrink-0 pt-20 pin:pt-[calc(var(--header-h)+2rem)]">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p class="eyebrow">{{ c.specialisms.eyebrow }}</p>
          <h2 class="display-2 mt-5">{{ c.specialisms.title }}</h2>
        </div>

        <div class="flex flex-wrap items-center gap-4 pin:gap-6">
          <!--
            Shown on every width. It used to be `hidden sm:block`, which hid it
            on precisely the screens that have no other affordance: the progress
            rail below is pinned-only, and a touch row gives no hint that it
            scrolls sideways until you happen to try.
          -->
          <p class="max-w-xs text-sm text-neutral-500">
            {{ pinned ? c.specialisms.scrollHint : c.specialisms.swipeHint }}
          </p>
          <NuxtLink :to="localePath('/specialisms')" class="btn-secondary !px-5 !py-2.5 !text-[0.6875rem]">
            {{ c.actions.allSpecialisms }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <!--
      `scroll-pl-*` on the fallback scroller mirrors the track's own `px-*`, and
      carries the same numbers as `.wrap`. A `snap-start` child aligns to the
      container's snapport, and the snapport ignores padding unless
      scroll-padding says otherwise -- so the carousel snapped the first card
      flush to x=0 while the heading above it sat on the 1.5rem page gutter.
    -->
    <div
        :class="[
          'flex py-10 pin:min-h-0 pin:flex-1 pin:items-center pin:py-0',
          pinned
            ? 'overflow-visible'
            : 'snap-x snap-mandatory scroll-pl-6 overflow-x-auto overflow-y-hidden md:scroll-pl-10 lg:scroll-pl-16',
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
