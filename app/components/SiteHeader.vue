<script setup lang="ts">
import {primaryNav, site} from '~/data/site'

const route = useRoute()

/*
 * The homepage opens on a full-bleed photographic hero, so the header sits
 * transparently over it and only takes a background once the hero has scrolled
 * past. Every other page starts on a solid ground, so the header is opaque from
 * the first frame -- otherwise the wordmark floats over the page heading.
 */
const isHome = computed(() => route.path === '/')
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
      <!-- Wordmark -->
      <NuxtLink
          to="/"
          class="font-display text-base uppercase tracking-[0.14em] text-white"
          :aria-label="`${site.name} — home`"
      >
        <span class="font-extrabold">Flex</span><span class="font-medium text-neutral-400"> Contractor</span>
      </NuxtLink>

      <!-- Desktop navigation -->
      <nav class="hidden items-center gap-8 lg:flex" aria-label="Primary">
        <NuxtLink
            v-for="item in primaryNav"
            :key="item.to"
            :to="item.to"
            class="font-display text-xs uppercase tracking-eyebrow text-neutral-400 transition-colors hover:text-white"
            active-class="!text-white"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-3">
        <!--
          The phone number is a link, not text, and it is in the header on every
          page. For a contractor it is the highest-intent action on the site and
          it used to be reachable only by scrolling seven viewports to the footer.
        -->
        <a
            :href="site.phoneHref"
            class="hidden font-display text-xs uppercase tracking-eyebrow text-neutral-400 transition-colors hover:text-white md:inline"
        >
          {{ site.phone }}
        </a>

        <NuxtLink to="/contact" class="btn-primary hidden !px-5 !py-2.5 !text-[0.6875rem] sm:inline-flex">
          Request a quote
        </NuxtLink>

        <!--
          Mobile menu toggle. It is also the close button: the icon swaps to an
          X in place, so the control that opened the panel is exactly where a
          visitor looks to shut it. Bordered while open so it reads as a
          pressed, dismissable control rather than as decoration.
        -->
        <button
            ref="toggleRef"
            type="button"
            :class="[
              '-mr-1 inline-flex h-11 w-11 items-center justify-center border text-white transition-colors lg:hidden',
              menuOpen ? 'border-white/40 bg-white/5' : 'border-transparent',
            ]"
            :aria-expanded="menuOpen"
            aria-controls="mobile-menu"
            :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
            @click="menuOpen ? closeMenu() : (menuOpen = true)"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
               aria-hidden="true">
            <path v-if="!menuOpen" stroke-linecap="round" d="M3 6h18M3 12h18M3 18h18"/>
            <path v-else stroke-linecap="round" d="M5 5l14 14M19 5L5 19"/>
          </svg>
        </button>
      </div>
    </div>

    <!--
      Full-screen panel rather than a dropdown. `overscroll-contain` keeps a
      wheel or swipe over the panel from scrolling the page behind it, which
      matters more than usual here because the page behind may be mid-snap.
    -->
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
              v-for="item in primaryNav"
              :key="item.to"
              :to="item.to"
              class="border-b border-white/10 py-5 font-display text-2xl font-bold tracking-tight text-white"
          >
            {{ item.label }}
          </NuxtLink>

          <NuxtLink to="/contact" class="btn-primary mt-8 w-full">Request a quote</NuxtLink>

          <a :href="site.phoneHref" class="btn-secondary mt-3 w-full">{{ site.phone }}</a>

          <!--
            A second, explicit way out at the end of the panel. On a tall phone
            the X in the header is a thumb-stretch away once you have scrolled
            the menu, and Escape is not available without a keyboard.
          -->
          <button class="btn-ghost mt-8 self-start" type="button" @click="closeMenu">
            <span aria-hidden="true">&#10005;</span> Close menu
          </button>
        </nav>
      </div>
    </Transition>
  </header>
</template>
