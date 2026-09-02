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
</script>

<template>
  <div id="app" class="w-full bg-ink">
    <NuxtRouteAnnouncer/>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
