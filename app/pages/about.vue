<script setup lang="ts">
import {site} from '~/data/site'

const c = useContent()
const localePath = useLocalePath()

useSeo({
  title: `${c.value.about.eyebrow} | Flexcontractor B.V.`,
  description: c.value.about.lede,
  image: '/img/afwerking.jpg',
})
</script>

<template>
  <div>
    <PageHeader
        :eyebrow="c.about.eyebrow"
        :lede="c.about.lede"
        :title="c.about.title"
    />

    <section class="border-b border-white/10 bg-surface">
      <div class="wrap band">
        <div class="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div class="lg:col-span-4">
            <p class="eyebrow">{{ c.values.eyebrow }}</p>
            <h2 class="display-2 mt-5">{{ c.values.title }}</h2>
          </div>

          <dl class="divide-y divide-white/10 border-y border-white/10 lg:col-span-8">
            <div v-for="value in c.values.items" :key="value.title" class="py-6">
              <dt class="display-3 text-xl md:text-2xl">{{ value.title }}</dt>
              <dd class="body-copy mt-2">{{ value.body }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <section class="wrap band">
      <div class="grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div class="lg:col-span-5">
          <p class="eyebrow">{{ c.about.credentialsEyebrow }}</p>
          <h2 class="display-2 mt-5">{{ c.about.credentialsTitle }}</h2>
        </div>

        <dl class="space-y-8 lg:col-span-7">
          <!--
            KvK is real; BTW ships empty on purpose (see the header note in
            app/data/site.ts). Both are guarded so the section omits a missing
            one rather than rendering a label with nothing after it.
          -->
          <div v-if="site.kvk" class="border-t border-white/10 pt-6">
            <dt class="eyebrow-muted">{{ c.about.kvkLabel }}</dt>
            <dd class="numeral mt-2 text-lg text-white">KvK {{ site.kvk }}</dd>
          </div>
          <div v-if="site.vat" class="border-t border-white/10 pt-6">
            <dt class="eyebrow-muted">{{ c.about.vatLabel }}</dt>
            <dd class="numeral mt-2 text-lg text-white">{{ site.vat }}</dd>
          </div>
          <div class="border-t border-white/10 pt-6">
            <dt class="eyebrow-muted">{{ c.about.certificationLabel }}</dt>
            <dd class="mt-2 text-lg text-white">{{ site.certifications.join(' · ') }}</dd>
          </div>
          <div class="border-t border-white/10 pt-6">
            <dt class="eyebrow-muted">{{ c.about.insuranceLabel }}</dt>
            <dd class="mt-2 text-lg text-white">{{ site.insurance }}</dd>
          </div>
          <div class="border-t border-white/10 pt-6">
            <dt class="eyebrow-muted">{{ c.about.foundedLabel }}</dt>
            <dd class="numeral mt-2 text-lg text-white">{{ site.founded }}</dd>
          </div>
          <div class="border-t border-white/10 pt-6">
            <dt class="eyebrow-muted">{{ c.about.areaLabel }}</dt>
            <dd class="mt-2 text-lg text-white">{{ site.serviceArea.join(' · ') }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <section class="border-t border-white/10">
      <div class="wrap band">
        <p class="eyebrow">{{ c.services.eyebrow }}</p>
        <ul class="mt-8 divide-y divide-white/10 border-y border-white/10">
          <li v-for="service in c.services.items" :key="service.slug">
            <NuxtLink
                :to="localePath(`/services/${service.slug}`)"
                class="group flex flex-wrap items-baseline gap-x-6 gap-y-2 py-6 transition-colors hover:text-neutral-300"
            >
              <span class="numeral text-sm text-brand">{{ service.number }}</span>
              <span class="display-3">{{ service.title }}</span>
              <span class="w-full text-sm text-neutral-500 md:w-auto md:flex-1">{{ service.summary }}</span>
              <span aria-hidden="true" class="text-neutral-600 transition-transform group-hover:translate-x-1">→</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <CtaBand/>
  </div>
</template>
