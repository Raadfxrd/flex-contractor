<script setup lang="ts">
import {getService, services} from '~/data/services'
import {projects as allProjects} from '~/data/projects'

const route = useRoute()
const service = computed(() => getService(String(route.params.slug)))

/*
 * A slug with no matching service is a 404, not an empty page. Thrown during
 * setup so it is a real 404 status on the server response, which is what a
 * crawler needs to see -- rendering a "not found" message with a 200 leaves the
 * bad URL in the index.
 */
if (!service.value) {
  throw createError({statusCode: 404, statusMessage: 'Service not found', fatal: true})
}

const related = computed(() =>
    allProjects.filter((project) => service.value!.projects.includes(project.slug)))

const others = computed(() => services.filter((s) => s.slug !== service.value!.slug))

useSeo({
  title: `${service.value.title} | Flex Contractor`,
  description: service.value.summary,
  path: `/services/${service.value.slug}`,
  image: service.value.image,
})

/*
 * FAQPage structured data. These are genuine questions with genuine answers on
 * the page, which is the condition for marking them up -- the schema describes
 * the page, it does not replace it.
 */
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: service.value.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {'@type': 'Answer', text: faq.answer},
      })),
    }),
  }],
})
</script>

<template>
  <div v-if="service">
    <PageHeader
        :eyebrow="`Division ${service.number}`"
        :image="service.image"
        :lede="service.summary"
        :title="service.title"
        back-label="All services"
        back-to="/services"
        image-alt=""
    />

    <!-- Body + capabilities -->
    <section class="wrap band">
      <div class="grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div class="lg:col-span-7">
          <p v-for="(paragraph, i) in service.body" :key="i" class="lede mb-6 last:mb-0">
            {{ paragraph }}
          </p>

          <h2 class="eyebrow mt-14">What you receive</h2>
          <ul class="mt-6 divide-y divide-white/10 border-y border-white/10">
            <li
                v-for="item in service.deliverables"
                :key="item"
                class="flex gap-4 py-4 text-neutral-300"
            >
              <span class="mt-2 h-px w-5 shrink-0 bg-white/40" aria-hidden="true"/>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>

        <aside class="lg:col-span-5">
          <div class="border border-white/10 bg-surface p-8 md:p-10">
            <h2 class="eyebrow">Capabilities</h2>
            <ul class="mt-6 space-y-4">
              <li
                  v-for="capability in service.capabilities"
                  :key="capability"
                  class="flex gap-4 text-neutral-300"
              >
                <span class="numeral mt-0.5 shrink-0 text-xs text-neutral-600">▪</span>
                <span>{{ capability }}</span>
              </li>
            </ul>

            <NuxtLink class="btn-primary mt-10 w-full" to="/contact">
              Discuss this work
            </NuxtLink>
          </div>
        </aside>
      </div>
    </section>

    <!-- Related work -->
    <section v-if="related.length" class="border-t border-white/10">
      <div class="wrap band">
        <div class="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p class="eyebrow">Related work</p>
            <h2 class="display-2 mt-5">{{ service.title }} in practice</h2>
          </div>
          <NuxtLink class="btn-secondary !px-5 !py-2.5 !text-[0.6875rem]" to="/projects">
            All projects
          </NuxtLink>
        </div>

        <div class="mt-14 grid gap-10 md:grid-cols-2">
          <ProjectCard
              v-for="(project, i) in related"
              :key="project.slug"
              :index="i"
              :project="project"
          />
        </div>
      </div>
    </section>

    <!-- FAQs -->
    <section class="border-t border-white/10 bg-surface">
      <div class="wrap band">
        <div class="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div class="lg:col-span-4">
            <p class="eyebrow">Common questions</p>
            <h2 class="display-2 mt-5">Before you ask</h2>
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

    <!-- Other divisions -->
    <section class="border-t border-white/10">
      <div class="wrap band">
        <p class="eyebrow">Other divisions</p>
        <ul class="mt-8 divide-y divide-white/10 border-y border-white/10">
          <li v-for="other in others" :key="other.slug">
            <NuxtLink
                :to="`/services/${other.slug}`"
                class="group flex items-baseline gap-6 py-6 transition-colors hover:text-neutral-300"
            >
              <span class="numeral text-sm text-neutral-600">{{ other.number }}</span>
              <span class="display-3 flex-1">{{ other.title }}</span>
              <span aria-hidden="true" class="text-neutral-600 transition-transform group-hover:translate-x-1">→</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <CtaBand :title="`Planning ${service.title.toLowerCase()}?`"/>
  </div>
</template>
