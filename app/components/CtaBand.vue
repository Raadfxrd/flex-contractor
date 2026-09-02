<script setup lang="ts">
import {site} from '~/data/site'

const c = useContent()
const localePath = useLocalePath()

withDefaults(defineProps<{title?: string}>(), {title: ''})
</script>

<template>
  <section class="border-t border-white/10 bg-surface">
    <div class="wrap band">
      <div class="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div class="lg:col-span-7">
          <p class="eyebrow">{{ c.cta.eyebrow }}</p>
          <h2 class="display-2 mt-5">{{ title || c.cta.title }}</h2>
          <p class="lede mt-6 max-w-xl">{{ c.cta.body }}</p>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
          <NuxtLink :to="localePath('/contact')" class="btn-primary">{{ c.actions.requestQuote }}</NuxtLink>
          <a :href="site.phoneHref" class="btn-secondary">{{ site.phone }}</a>
        </div>
      </div>
    </div>
  </section>
</template>
