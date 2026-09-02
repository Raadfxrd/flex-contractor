<script setup lang="ts">
import {services} from '~/data/services'

useSeo({
  title: 'Services | Flex Contractor',
  description:
      'Foundations and groundworks, electrical systems, structural work, and finishing '
      + 'and renovation — delivered as single packages or as a full main-contractor build.',
  path: '/services',
  image: '/img/structural.jpg',
})
</script>

<template>
  <div>
    <PageHeader
        eyebrow="What we do"
        image="/img/structural.jpg"
        image-alt=""
        lede="Four divisions, all directly employed. Take one as a standalone package or
              take the whole build — the programme and the point of contact are the same
              either way."
        title="Services"
    />

    <section class="wrap band">
      <ul class="grid gap-px bg-white/10 md:grid-cols-2">
        <li v-for="service in services" :key="service.slug" class="bg-ink">
          <NuxtLink
              :to="`/services/${service.slug}`"
              class="group flex h-full flex-col p-8 transition-colors hover:bg-surface md:p-10"
          >
            <p class="eyebrow">
              <span class="numeral text-white">{{ service.number }}</span>
              <span class="mx-3 text-neutral-700">—</span>
              <span>Division</span>
            </p>

            <h2 class="display-3 mt-6 transition-colors group-hover:text-neutral-300">
              {{ service.title }}
            </h2>

            <p class="body-copy mt-4 flex-1">{{ service.summary }}</p>

            <ul class="mt-8 space-y-2 border-t border-white/10 pt-6">
              <li
                  v-for="capability in service.capabilities.slice(0, 3)"
                  :key="capability"
                  class="text-sm text-neutral-500"
              >
                {{ capability }}
              </li>
            </ul>

            <span
                class="mt-8 inline-flex items-center gap-2 font-display text-xs uppercase tracking-eyebrow text-white">
              Read more <span aria-hidden="true">→</span>
            </span>
          </NuxtLink>
        </li>
      </ul>
    </section>

    <CtaBand/>
  </div>
</template>
