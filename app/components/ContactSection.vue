<script setup lang="ts">
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {site} from '~/data/site'

gsap.registerPlugin(ScrollTrigger)

const c = useContent()

const sectionRef = ref<HTMLElement>()
const contentRef = ref<HTMLElement>()

let mm: gsap.MatchMedia

onMounted(() => {
  if (!sectionRef.value) return
  mm = gsap.matchMedia()
  // Gated on prefers-reduced-motion: when it does not match nothing runs,
  // so content renders in place rather than stranded at opacity 0.
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    if (!contentRef.value) return
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
    gsap.set(contentRef.value.children, {opacity: 0, y: 28})

    gsap.to(contentRef.value.children, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12,
      scrollTrigger: {trigger: sectionRef.value, start: 'top 70%'},
    })
  })
})

onUnmounted(() => mm?.revert())
</script>

<template>
  <!--
    `min-h-screen`, not `h-screen`. The form is five fields tall: at a fixed
    100vh on a short viewport (a phone in landscape, or any browser with large
    text) the content overflowed and collided with the footer below it.
  -->
  <section
      ref="sectionRef"
      class="flex min-h-screen w-full items-center border-t border-white/10 bg-gradient-to-b from-surface-2 to-ink py-24"
  >
    <div class="wrap">
      <div class="grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div ref="contentRef" class="lg:col-span-5">
          <p class="eyebrow">{{ c.contact.eyebrow }}</p>
          <h2 class="display-2 mt-6">{{ c.contact.title }}</h2>
          <p class="lede mt-6 max-w-md">{{ c.contact.lede }}</p>

          <dl class="mt-12 space-y-6 border-t border-white/10 pt-10">
            <div>
              <dt class="eyebrow-muted">{{ c.contact.phoneLabel }}</dt>
              <dd class="mt-2">
                <a :href="site.phoneHref" class="text-lg text-white transition-colors hover:text-brand">
                  {{ site.phone }}
                </a>
              </dd>
            </div>
            <div>
              <dt class="eyebrow-muted">{{ c.contact.emailLabel }}</dt>
              <dd class="mt-2">
                <a :href="site.emailHref" class="break-words text-lg text-white transition-colors hover:text-brand">
                  {{ site.email }}
                </a>
              </dd>
            </div>
            <div>
              <dt class="eyebrow-muted">{{ c.contact.hoursLabel }}</dt>
              <dd class="mt-2 text-lg text-neutral-400">{{ site.hours }}</dd>
            </div>
          </dl>
        </div>

        <div class="lg:col-span-7">
          <ContactForm/>
        </div>
      </div>
    </div>
  </section>
</template>
