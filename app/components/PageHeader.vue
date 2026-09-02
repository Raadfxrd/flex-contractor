<script setup lang="ts">
/*
 * Standard opening block for every page that is NOT the scroll-driven
 * homepage. It carries the top padding that clears the fixed header, so no
 * individual page has to remember to.
 */
withDefaults(defineProps<{
  eyebrow?: string
  title: string
  lede?: string
  /** Optional full-bleed background image. Without one the block is flat ink. */
  image?: string
  imageAlt?: string
  /*
   * Where "back" goes from this page. Detail pages are entered from an index
   * (a service from /services, a case study from /projects, a card on the
   * homepage), so they need a way out that is not the browser chrome --
   * especially on mobile, where the nav is collapsed behind a menu.
   *
   * A real link rather than router.back(): history.back() sends someone who
   * arrived from a search result or a shared URL off the site entirely, and
   * it cannot be middle-clicked or opened in a new tab.
   */
  backTo?: string
  backLabel?: string
}>(), {
  backLabel: 'Back',
})
</script>

<template>
  <section class="relative isolate overflow-hidden border-b border-white/10 bg-ink">
    <template v-if="image">
      <NuxtImg
          :src="image"
          :alt="imageAlt ?? ''"
          :aria-hidden="imageAlt ? undefined : 'true'"
          loading="eager"
          fetchpriority="high"
          sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:100vw"
          class="absolute inset-0 -z-10 h-full w-full object-cover opacity-40"
      />
      <div class="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/40"/>
    </template>

    <div class="wrap pb-16 pt-[calc(var(--header-h)+4rem)] md:pb-24 md:pt-[calc(var(--header-h)+6rem)]">
      <NuxtLink
          v-if="backTo"
          :to="backTo"
          class="group mb-10 inline-flex items-center gap-3 font-display text-xs font-semibold uppercase tracking-eyebrow text-neutral-400 transition-colors hover:text-white"
      >
        <span
            aria-hidden="true"
            class="inline-flex h-8 w-8 items-center justify-center border border-white/20 transition-colors group-hover:border-white"
        >&#8592;</span>
        {{ backLabel }}
      </NuxtLink>

      <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
      <h1 class="display-1 mt-5 max-w-4xl">{{ title }}</h1>
      <p v-if="lede" class="lede mt-8 max-w-2xl">{{ lede }}</p>
      <slot/>
    </div>
  </section>
</template>
