<script setup lang="ts">
/*
 * `lang` is set here, from the active i18n locale, rather than in
 * nuxt.config.ts. A hardcoded value there applies to every route, so it would
 * label the Dutch pages as English and a screen reader would read them with
 * English pronunciation rules.
 */
const {locale, locales} = useI18n()

const language = computed(() => {
  const match = (locales.value as {code: string, language?: string}[])
      .find((l) => l.code === locale.value)
  return match?.language ?? locale.value
})

useHead(() => ({htmlAttrs: {lang: language.value}}))

/*
 * A locale-independent identity for each page.
 *
 * `<NuxtPage>` keys on the route by default, so `/` and `/en` count as two
 * different pages and switching language remounts the whole tree -- which hides
 * every animated element and replays its reveal. Combined with `useContent()`
 * being reactive to `locale`, that is the flicker: the copy swaps to the new
 * language, disappears, then animates back in.
 *
 * Keying on the route's base name instead makes `/` and `/en` the same page, so
 * Vue patches the text in place. Nothing unmounts, no animation re-runs, the
 * words simply change.
 *
 * This only works with `pageTransition: false` in nuxt.config -- a
 * `<Transition>` tears the component down on every route change no matter what
 * the key says. Both are required; either alone leaves the remount in place.
 *
 * Params are part of the key so two different services stay distinct pages;
 * `services-slug` alone would stop `/services/verbouwing` remounting into
 * `/services/renovatie` and its reveals would never run.
 *
 * @nuxtjs/i18n names localised routes `<base>___<locale>`.
 */
const pageKey = (route: {name?: unknown, params?: Record<string, unknown>}) => {
  const base = String(route.name ?? '').split('___')[0]
  const params = Object.entries(route.params ?? {})
      .map(([k, v]) => `${k}=${String(v)}`)
      .sort()
      .join('&')
  return params ? `${base}?${params}` : base
}
</script>

<template>
  <div id="app" class="w-full bg-ink">
    <NuxtRouteAnnouncer/>
    <NuxtLayout>
      <NuxtPage :page-key="pageKey"/>
    </NuxtLayout>
  </div>
</template>
