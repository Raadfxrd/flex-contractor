<script setup lang="ts">
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {site} from '~/data/site'

gsap.registerPlugin(ScrollTrigger)

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

    gsap.from(contentRef.value.children, {
      opacity: 0,
      y: 28,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: {trigger: sectionRef.value, start: 'top 70%'},
    })
  })
})

onUnmounted(() => mm?.revert())
</script>

<template>
  <!--
    `min-h-screen`, not `h-screen`. The form is five fields tall: at 100vh on a
    short viewport (a phone in landscape, or any browser with large text) the
    content overflowed a fixed-height box and collided with the footer below it.
    `.no-snap` keeps it out of the snap sequence for the same reason.
  -->
  <section
      ref="sectionRef"
      class="no-snap flex min-h-screen w-full items-center border-t border-white/10 bg-gradient-to-b from-surface-2 to-ink py-24"
  >
    <div class="wrap">
      <div class="grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div ref="contentRef" class="lg:col-span-5">
          <p class="eyebrow">Contact</p>
          <h2 class="display-2 mt-6">Let's build together.</h2>
          <p class="lede mt-6 max-w-md">
            Tell us where the site is and what stage you are at. We will come back
            within one working day.
          </p>

          <dl class="mt-12 space-y-6 border-t border-white/10 pt-10">
            <div>
              <dt class="eyebrow">Phone</dt>
              <dd class="mt-2">
                <a :href="site.phoneHref" class="text-lg text-white transition-colors hover:text-neutral-300">
                  {{ site.phone }}
                </a>
              </dd>
            </div>
            <div>
              <dt class="eyebrow">Email</dt>
              <dd class="mt-2">
                <a :href="site.emailHref" class="text-lg text-white transition-colors hover:text-neutral-300">
                  {{ site.email }}
                </a>
              </dd>
            </div>
            <div>
              <dt class="eyebrow">Office hours</dt>
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
