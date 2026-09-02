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
 * Skip the page transition when only the language changes.
 *
 * THE BUG THIS FIXES. `useContent()` is reactive to `locale`, so the moment the
 * route changes the page that is STILL ON SCREEN re-renders in the new
 * language. With `mode: 'out-in'` that page then sits there, fully visible, for
 * the length of its leave transition before being torn down and rebuilt hidden
 * for its entry animation. Measured at roughly 50ms of the new copy at full
 * opacity, then gone, then fading back in -- which is the flicker.
 *
 * Dropping the transition collapses that window: the swap lands inside a single
 * frame, so the re-rendered outgoing page is never painted. Measured across six
 * runs, peak opacity of the new copy before it is hidden went from 1.00 to 0.00.
 *
 * The page does still remount and replay its reveals. That is fine and no
 * longer produces a flash.
 *
 * TWO THINGS THAT LOOK LIKE THEY SHOULD HELP AND DO NOT, both measured:
 *
 *   - Assigning `to.meta.pageTransition` in a route middleware. That is the
 *     documented way to vary a transition per navigation and it had no effect
 *     here. `<NuxtPage>`'s own `transition` prop takes precedence over route
 *     meta and over the app-level default, so this lives on the prop.
 *
 *   - Giving <NuxtPage> a locale-independent `page-key` so `/` and `/en` count
 *     as one page. It does not stop the remount, and with the transition
 *     already suppressed it changes nothing measurable at all.
 *
 * `undefined`, not `true`, on the normal path: that falls through to the fade
 * configured in nuxt.config instead of replacing it with a bare `true`.
 * Ordinary navigation still cross-fades.
 */
const router = useRouter()

const baseName = (name: unknown) => String(name ?? '').split('___')[0]

const suppressTransition = ref(false)

if (import.meta.client) {
  /*
   * Set in `beforeEach`, i.e. BEFORE the route updates, so the prop is already
   * false by the time <NuxtPage> renders the new route. Deriving it from
   * `route.name` in a computed instead is measurably too late: the computed and
   * the route update land in the same flush, the Transition wrapper is still
   * mounted, and the flash comes back.
   *
   * @nuxtjs/i18n names localised routes `<base>___<locale>`, so the same base
   * with a different suffix is the same page in the other language.
   */
  router.beforeEach((to, from) => {
    suppressTransition.value = Boolean(from.name)
        && to.name !== from.name
        && baseName(to.name) === baseName(from.name)
  })
}
</script>

<template>
  <div id="app" class="w-full bg-ink">
    <NuxtRouteAnnouncer/>
    <NuxtLayout>
      <NuxtPage :transition="suppressTransition ? false : undefined"/>
    </NuxtLayout>
  </div>
</template>
