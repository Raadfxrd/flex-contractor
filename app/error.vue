<script setup lang="ts">
import type {NuxtError} from '#app'

const props = defineProps<{ error: NuxtError }>()

const is404 = computed(() => props.error?.statusCode === 404)

useHead({
  title: is404.value ? 'Page not found | Flex Contractor' : 'Something went wrong | Flex Contractor',
  meta: [{name: 'robots', content: 'noindex, follow'}],
})
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
        {{ is404 ? 'That page is not here.' : 'Something went wrong.' }}
      </h1>

      <p class="lede mt-8 max-w-xl">
        {{
          is404
              ? 'The page may have moved, or the link may be out of date. The work, the services and the contact details are all still where they were.'
              : 'An unexpected error occurred on our side. Please try again, or call us directly.'
        }}
      </p>

      <div class="mt-10 flex flex-col gap-3 sm:flex-row">
        <NuxtLink class="btn-primary" to="/">Back to home</NuxtLink>
        <NuxtLink class="btn-secondary" to="/projects">Browse projects</NuxtLink>
      </div>
    </main>

    <SiteFooter/>
  </div>
</template>
