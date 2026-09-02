<script setup lang="ts">
import {site} from '~/data/site'

withDefaults(defineProps<{
  title?: string
  body?: string
}>(), {
  title: 'Tell us about the project',
  body: 'Send the drawings, the site address, or three lines describing the idea. '
      + 'We will come back within one working day.',
})
</script>

<template>
  <section class="border-t border-white/10 bg-surface">
    <div class="wrap band">
      <div class="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div class="lg:col-span-7">
          <p class="eyebrow">Next step</p>
          <h2 class="display-2 mt-5">{{ title }}</h2>
          <p class="lede mt-6 max-w-xl">{{ body }}</p>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
          <NuxtLink to="/contact" class="btn-primary">Request a quote</NuxtLink>
          <a :href="site.phoneHref" class="btn-secondary">{{ site.phone }}</a>
        </div>
      </div>
    </div>
  </section>
</template>
