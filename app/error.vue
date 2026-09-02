<script setup lang="ts">
import type {NuxtError} from '#app'

const props = defineProps<{error: NuxtError}>()

const c = useContent()
const localePath = useLocalePath()

const is404 = computed(() => props.error?.statusCode === 404)

useHead(() => ({
  title: `${is404.value ? c.value.error.notFoundTitle : c.value.error.genericTitle} | Flexcontractor B.V.`,
  meta: [{name: 'robots', content: 'noindex, follow'}],
}))
</script>

<template>
  <!--
    error.vue renders OUTSIDE the layout, so the header and footer have to be
    mounted here explicitly. Without them a 404 is a dead end with no way back
    into the site except the browser's back button.
  -->
  <div class="min-h-screen bg-ink">
    <SiteHeader/>

    <main class="wrap flex min-h-screen flex-col justify-center py-32">
      <p class="eyebrow">Error {{ error?.statusCode ?? 500 }}</p>

      <h1 class="display-1 mt-6 max-w-3xl">
        {{ is404 ? c.error.notFoundTitle : c.error.genericTitle }}
      </h1>

      <p class="lede mt-8 max-w-xl">
        {{ is404 ? c.error.notFoundBody : c.error.genericBody }}
      </p>

      <div class="mt-10 flex flex-col gap-3 sm:flex-row">
        <NuxtLink class="btn-primary" :to="localePath('/')">{{ c.error.home }}</NuxtLink>
        <NuxtLink class="btn-secondary" :to="localePath('/specialisms')">{{ c.error.specialisms }}</NuxtLink>
      </div>
    </main>

    <SiteFooter/>
  </div>
</template>
