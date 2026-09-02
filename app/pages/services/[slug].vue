<script setup lang="ts">
const route = useRoute()
const c = useContent()
const localePath = useLocalePath()

const service = computed(() => c.value.services.items.find((s) => s.slug === route.params.slug))

/*
 * A slug with no matching service is a 404, not an empty page. Thrown during
 * setup so it is a real 404 status on the server response, which is what a
 * crawler needs to see -- rendering "not found" with a 200 leaves the bad URL
 * in the index.
 *
 * Slugs are identical across locales (they are the Dutch words in both), so a
 * URL stays valid when the visitor switches language.
 */
if (!service.value) {
  throw createError({statusCode: 404, statusMessage: 'Service not found', fatal: true})
}

const others = computed(() => c.value.services.items.filter((s) => s.slug !== service.value!.slug))

useSeo({
  title: `${service.value.title} | Flexcontractor B.V.`,
  description: service.value.summary,
  image: '/img/verbouwing.jpg',
})

/*
 * FAQPage structured data. These are genuine questions with genuine answers on
 * the page, which is the condition for marking them up -- the schema describes
 * the page, it does not replace it.
 */
useHead(() => ({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: c.value.locale,
      mainEntity: (service.value?.faqs ?? []).map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {'@type': 'Answer', text: faq.answer},
      })),
    }),
  }],
}))
</script>

<template>
  <div v-if="service">
    <PageHeader
        :back-label="c.actions.backToServices"
        :back-to="localePath('/services')"
        :eyebrow="`${c.services.eyebrow} ${service.number}`"
        :lede="service.summary"
        :title="service.title"
    />

    <section class="wrap band">
      <div class="grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div class="lg:col-span-7">
          <p v-for="(paragraph, i) in service.body" :key="i" class="lede mb-6 last:mb-0">
            {{ paragraph }}
          </p>
        </div>

        <aside class="lg:col-span-5">
          <div class="border border-white/10 bg-surface p-8 md:p-10">
            <h2 class="eyebrow">{{ c.services.includesLabel }}</h2>
            <ul class="mt-6 space-y-4">
              <li v-for="line in service.includes" :key="line" class="flex gap-4 text-neutral-300">
                <span class="mt-2 h-px w-5 shrink-0 bg-brand" aria-hidden="true"/>
                <span>{{ line }}</span>
              </li>
            </ul>

            <NuxtLink :to="localePath('/contact')" class="btn-primary mt-10 w-full">
              {{ c.actions.requestQuote }}
            </NuxtLink>
          </div>
        </aside>
      </div>
    </section>

    <section v-if="service.faqs.length" class="border-t border-white/10 bg-surface">
      <div class="wrap band">
        <div class="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div class="lg:col-span-4">
            <p class="eyebrow">{{ c.services.faqLabel }}</p>
            <h2 class="display-2 mt-5">{{ c.services.faqTitle }}</h2>
          </div>

          <dl class="divide-y divide-white/10 border-y border-white/10 lg:col-span-8">
            <div v-for="faq in service.faqs" :key="faq.question" class="py-8">
              <dt class="display-3 text-xl md:text-2xl">{{ faq.question }}</dt>
              <dd class="body-copy mt-4 max-w-2xl">{{ faq.answer }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <section class="border-t border-white/10">
      <div class="wrap band">
        <p class="eyebrow">{{ c.services.otherLabel }}</p>
        <ul class="mt-8 divide-y divide-white/10 border-y border-white/10">
          <li v-for="other in others" :key="other.slug">
            <NuxtLink
                :to="localePath(`/services/${other.slug}`)"
                class="group flex items-baseline gap-6 py-6 transition-colors hover:text-neutral-300"
            >
              <span class="numeral text-sm text-brand">{{ other.number }}</span>
              <span class="display-3 flex-1">{{ other.title }}</span>
              <span aria-hidden="true" class="text-neutral-600 transition-transform group-hover:translate-x-1">→</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <CtaBand/>
  </div>
</template>
