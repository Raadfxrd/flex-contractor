<script setup lang="ts">
const {locale, locales} = useI18n()

/*
 * The language currently ON SCREEN, which deliberately lags the one in the URL.
 * See app/composables/useContent.ts for why.
 *
 * Resolved here at setup, not lazily inside a computed: it calls `useI18n()`
 * underneath, and vue-i18n throws if that runs outside a setup context.
 */
const displayLocale = useDisplayLocale()

/*
 * `lang` is set here rather than in nuxt.config.ts, where a hardcoded value
 * would apply to every route and label the Dutch pages as English.
 *
 * It follows the DISPLAYED locale, not the URL's: for the length of the
 * transition the words on screen are still the old language, and `lang` should
 * describe what is actually there.
 */
const language = computed(() => {
  const match = (locales.value as {code: string, language?: string}[])
      .find((l) => l.code === displayLocale.value)
  return match?.language ?? displayLocale.value
})

useHead(() => ({htmlAttrs: {lang: language.value}}))

/*
 * The page transition lives here rather than in nuxt.config because its
 * `onAfterLeave` hook needs the Nuxt context to reach `displayLocale`.
 *
 * That hook is the whole mechanism. With `mode: 'out-in'` Vue runs it once the
 * outgoing page has finished leaving and before the incoming one is created --
 * exactly the moment at which it is safe to change language. The old page never
 * repaints in the new words, and the new page is built with them from the
 * start, hidden, ready for its reveal.
 */
const pageTransition = {
  name: 'page',
  mode: 'out-in' as const,
  onAfterLeave: () => {
    displayLocale.value = locale.value
  },
}

/*
 * Safety net. If the transition is ever skipped -- reduced motion, a config
 * change, a hook that does not fire -- `onAfterLeave` never runs and the site
 * would sit showing the previous language indefinitely. This catches up shortly
 * after the leave would have finished; when the hook does its job it is a no-op.
 */
watch(locale, (next) => {
  setTimeout(() => {
    displayLocale.value = next
  }, 400)
})
</script>

<template>
  <div id="app" class="w-full bg-ink">
    <NuxtRouteAnnouncer/>
    <NuxtLayout>
      <NuxtPage :transition="pageTransition"/>
    </NuxtLayout>
  </div>
</template>
