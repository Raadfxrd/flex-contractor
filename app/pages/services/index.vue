<script setup lang="ts">
const c = useContent()
const localePath = useLocalePath()

useSeo({
  title: `${c.value.services.title} | Flexcontractor B.V.`,
  description: c.value.services.lede,
  image: '/img/verbouwing.jpg',
})
</script>

<template>
  <div>
    <PageHeader
        :eyebrow="c.services.eyebrow"
        :lede="c.services.lede"
        :title="c.services.title"
        image="/img/hero.jpg"
        image-alt=""
    />

    <section class="wrap band">
      <p class="lede max-w-3xl border-l-2 border-brand pl-6">{{ c.intro.range }}</p>

      <ul class="mt-16 grid gap-px bg-white/10 md:grid-cols-2">
        <li v-for="service in c.services.items" :key="service.slug" class="bg-ink">
          <NuxtLink
              :to="localePath(`/services/${service.slug}`)"
              class="group flex h-full flex-col p-8 transition-colors hover:bg-surface md:p-10"
          >
            <p class="eyebrow">
              <span class="numeral">{{ service.number }}</span>
              <span class="mx-3 text-neutral-700">—</span>
              <span>{{ c.services.eyebrow }}</span>
            </p>

            <h2 class="display-3 mt-6 transition-colors group-hover:text-brand">{{ service.title }}</h2>
            <p class="body-copy mt-4 flex-1">{{ service.summary }}</p>

            <ul class="mt-8 space-y-2 border-t border-white/10 pt-6">
              <li v-for="line in service.includes.slice(0, 3)" :key="line" class="text-sm text-neutral-500">
                {{ line }}
              </li>
            </ul>

            <span class="mt-8 inline-flex items-center gap-2 font-display text-xs uppercase tracking-eyebrow text-white">
              {{ c.actions.readMore }} <span aria-hidden="true">→</span>
            </span>
          </NuxtLink>
        </li>
      </ul>
    </section>

    <CtaBand/>
  </div>
</template>
