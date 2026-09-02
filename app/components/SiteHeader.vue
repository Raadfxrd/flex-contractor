<script setup lang="ts">
import {site} from '~/data/site'

const route = useRoute()
const c = useContent()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const {locale} = useI18n()

const nav = computed(() => [
  {label: c.value.nav.services, to: localePath('/services')},
  {label: c.value.nav.specialisms, to: localePath('/specialisms')},
  {label: c.value.nav.about, to: localePath('/about')},
  {label: c.value.nav.careers, to: localePath('/careers')},
])

/** The other locale — this site has exactly two, so "the other one" is well defined. */
const otherLocale = computed(() => (locale.value === 'nl' ? 'en' : 'nl'))

/*
 * The homepage opens on a full-bleed photographic hero, so the header sits
 * transparently over it and only takes a background once the hero has scrolled
 * past. Every other page starts on a solid ground, so the header is opaque from
 * the first frame -- otherwise the logo floats over the page heading.
 *
 * Compared against the localised home path, not '/': in English the homepage is
 * '/en', and a bare '/' test would make the header opaque over the English hero.
 */
const isHome = computed(() => route.path === localePath('/'))
const scrolled = ref(false)
const menuOpen = ref(false)

const solid = computed(() => !isHome.value || scrolled.value || menuOpen.value)

const onScroll = () => {
  scrolled.value = window.scrollY > window.innerHeight * 0.6
}

/*
 * Escape closes the panel and puts focus back on the button that opened it.
 * Without the focus return, dismissing the menu drops the caret at the top of
 * the document and a keyboard user has to tab back through the header.
 */
const toggleRef = ref<HTMLButtonElement>()

const closeMenu = () => {
  menuOpen.value = false
  toggleRef.value?.focus()
}

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && menuOpen.value) closeMenu()
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, {passive: true})
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
})

// Any navigation closes the panel -- including a link to the page you are on.
watch(() => route.fullPath, () => {
  menuOpen.value = false
})
</script>

<template>
  <header
      :class="[
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-out-expo',
        solid ? 'border-b border-white/10 bg-ink/90 backdrop-blur-md' : 'border-b border-transparent',
      ]"
  >
    <div class="wrap flex h-[var(--header-h)] items-center justify-between gap-6">
      <!--
        The WHITE logo: the header sits on ink, or transparently over a darkened
        photograph, so the black variant is invisible in both states. Only the
        green tagline survives, which reads as a broken image.

        Still 200px wide, which is fine at this height (36-40px renders well
        under 2x) but not enough for any larger use -- an SVG would be better.
      -->
      <NuxtLink :to="localePath('/')" class="flex items-center" :aria-label="`${site.name} — home`">
        <NuxtImg
            src="/logo-white.png"
            :alt="site.name"
            width="200"
            height="186"
            format="webp"
            sizes="xs:104px sm:104px md:112px lg:112px xl:112px"
            class="h-9 w-auto md:h-10"
        />
      </NuxtLink>

      <nav class="hidden items-center gap-8 lg:flex" aria-label="Primary">
        <NuxtLink
            v-for="item in nav"
            :key="item.to"
            :to="item.to"
            class="font-display text-xs uppercase tracking-eyebrow text-neutral-400 transition-colors hover:text-white"
            active-class="!text-brand"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-3">
        <!--
          Language toggle. A real link to the same page in the other locale, not
          a client-side state flip: each language has its own indexable URL, so
          this has to be navigable, shareable and crawlable.
        -->
        <NuxtLink
            :to="switchLocalePath(otherLocale)"
            class="hidden font-display text-xs uppercase tracking-eyebrow text-neutral-400 transition-colors hover:text-white sm:inline"
            :hreflang="otherLocale"
        >
          {{ otherLocale === 'en' ? 'EN' : 'NL' }}
        </NuxtLink>

        <span class="hidden h-4 w-px bg-white/15 sm:block" aria-hidden="true"/>

        <!--
          The phone number is a link, not text, and it is in the header on every
          page. For a contractor it is the highest-intent action on the site.
        -->
        <a
            :href="site.phoneHref"
            class="hidden font-display text-xs uppercase tracking-eyebrow text-neutral-400 transition-colors hover:text-white md:inline"
        >
          {{ site.phone }}
        </a>

        <NuxtLink :to="localePath('/contact')" class="btn-primary hidden !px-5 !py-2.5 !text-[0.6875rem] sm:inline-flex">
          {{ c.actions.requestQuote }}
        </NuxtLink>

        <button
            ref="toggleRef"
            type="button"
            :class="[
              '-mr-1 inline-flex h-11 w-11 items-center justify-center border text-white transition-colors lg:hidden',
              menuOpen ? 'border-white/40 bg-white/5' : 'border-transparent',
            ]"
            :aria-expanded="menuOpen"
            aria-controls="mobile-menu"
            :aria-label="menuOpen ? c.actions.closeMenu : c.actions.openMenu"
            @click="menuOpen ? closeMenu() : (menuOpen = true)"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
            <path v-if="!menuOpen" stroke-linecap="round" d="M3 6h18M3 12h18M3 18h18"/>
            <path v-else stroke-linecap="round" d="M5 5l14 14M19 5L5 19"/>
          </svg>
        </button>
      </div>
    </div>

    <Transition
        enter-active-class="transition-opacity duration-200"
        leave-active-class="transition-opacity duration-150"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
    >
      <div
          v-if="menuOpen"
          id="mobile-menu"
          class="fixed inset-x-0 top-[var(--header-h)] bottom-0 z-40 overflow-y-auto overscroll-contain border-t border-white/10 bg-ink lg:hidden"
      >
        <nav class="wrap flex flex-col py-8" aria-label="Primary (mobile)">
          <NuxtLink
              v-for="item in nav"
              :key="item.to"
              :to="item.to"
              class="border-b border-white/10 py-5 font-display text-2xl font-bold tracking-tight text-white"
          >
            {{ item.label }}
          </NuxtLink>

          <NuxtLink :to="localePath('/contact')" class="btn-primary mt-8 w-full">
            {{ c.actions.requestQuote }}
          </NuxtLink>

          <a :href="site.phoneHref" class="btn-secondary mt-3 w-full">{{ site.phone }}</a>

          <NuxtLink :to="switchLocalePath(otherLocale)" :hreflang="otherLocale" class="btn-ghost mt-6 self-start">
            {{ c.actions.switchLanguage }}
          </NuxtLink>

          <button class="btn-ghost mt-2 self-start" type="button" @click="closeMenu">
            <span aria-hidden="true">&#10005;</span> {{ c.actions.closeMenu }}
          </button>
        </nav>
      </div>
    </Transition>
  </header>
</template>
