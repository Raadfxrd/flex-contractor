<script setup lang="ts">
import {getProject, projects} from '~/data/projects'
import {getService} from '~/data/services'

const route = useRoute()
const project = computed(() => getProject(String(route.params.slug)))

// A slug with no matching project must answer 404, not render an empty shell.
if (!project.value) {
  throw createError({statusCode: 404, statusMessage: 'Project not found', fatal: true})
}

const relatedServices = computed(() =>
    project.value!.services.map(getService).filter(Boolean))

/*
 * "Next project" wraps around, so the last case study leads somewhere instead
 * of dead-ending.
 */
const next = computed(() => {
  const index = projects.findIndex((p) => p.slug === project.value!.slug)
  return projects[(index + 1) % projects.length]!
})

useSeo({
  title: `${project.value.title} | Flex Contractor`,
  description: project.value.summary,
  path: `/projects/${project.value.slug}`,
  image: project.value.image,
  type: 'article',
})
</script>

<template>
  <div v-if="project">
    <PageHeader
        :eyebrow="`${project.category} · ${project.year}`"
        :image="project.image"
        :image-alt="project.imageAlt"
        :lede="project.summary"
        :title="project.title"
        back-label="All projects"
        back-to="/projects"
    >
      <dl class="mt-14 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 md:grid-cols-4">
        <div>
          <dt class="eyebrow">Client</dt>
          <dd class="mt-2 text-white">{{ project.client }}</dd>
        </div>
        <div>
          <dt class="eyebrow">Location</dt>
          <dd class="mt-2 text-white">{{ project.location }}</dd>
        </div>
        <div>
          <dt class="eyebrow">Duration</dt>
          <dd class="mt-2 text-white">{{ project.duration }}</dd>
        </div>
        <div>
          <dt class="eyebrow">Scale</dt>
          <dd class="mt-2 text-white">{{ project.size }}</dd>
        </div>
      </dl>
    </PageHeader>

    <!-- Challenge / solution / outcome -->
    <section class="wrap band">
      <div class="grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div class="space-y-14 lg:col-span-8">
          <div v-for="block in [
            {label: 'The challenge', body: project.challenge},
            {label: 'What we did', body: project.solution},
            {label: 'The outcome', body: project.outcome},
          ]" :key="block.label">
            <h2 class="eyebrow">{{ block.label }}</h2>
            <p class="lede mt-5">{{ block.body }}</p>
          </div>
        </div>

        <aside class="lg:col-span-4">
          <div class="border border-white/10 bg-surface p-8">
            <h2 class="eyebrow">Divisions involved</h2>
            <ul class="mt-6 space-y-4">
              <li v-for="service in relatedServices" :key="service!.slug">
                <NuxtLink
                    :to="`/services/${service!.slug}`"
                    class="group flex items-baseline gap-4 text-white transition-colors hover:text-neutral-300"
                >
                  <span class="numeral text-xs text-neutral-600">{{ service!.number }}</span>
                  <span class="flex-1">{{ service!.title }}</span>
                  <span aria-hidden="true" class="text-neutral-600 transition-transform group-hover:translate-x-1">→</span>
                </NuxtLink>
              </li>
            </ul>

            <NuxtLink class="btn-secondary mt-10 w-full" to="/contact">
              Start a similar project
            </NuxtLink>
          </div>
        </aside>
      </div>
    </section>

    <!-- Headline figures -->
    <section class="border-y border-white/10 bg-surface">
      <div class="wrap py-16">
        <FactGrid :facts="project.facts"/>
      </div>
    </section>

    <!-- Gallery -->
    <section v-if="project.gallery.length" class="wrap band">
      <h2 class="eyebrow">On site</h2>
      <div class="mt-8 grid gap-6 md:grid-cols-2">
        <NuxtImg
            v-for="shot in project.gallery"
            :key="shot.src"
            :alt="shot.alt"
            :src="shot.src"
            class="aspect-[4/3] w-full bg-surface object-cover"
            loading="lazy"
            sizes="xs:320px sm:600px md:520px lg:620px xl:620px"
        />
      </div>
    </section>

    <!--
      Rendered only when the project carries a quote, so deleting one from the
      data removes the block rather than leaving an empty section. The seeded
      quotes are FABRICATED placeholder copy -- see the note at the top of
      app/data/projects.ts before this goes anywhere near production.
    -->
    <section v-if="project.testimonial" class="border-t border-white/10">
      <div class="wrap band">
        <blockquote class="max-w-4xl">
          <p class="display-2 !text-3xl md:!text-4xl">"{{ project.testimonial.quote }}"</p>
          <footer class="mt-8 text-sm text-neutral-500">
            {{ project.testimonial.name }} — {{ project.testimonial.role }}
          </footer>
        </blockquote>
      </div>
    </section>

    <!-- Next project -->
    <section class="border-t border-white/10">
      <NuxtLink :to="`/projects/${next.slug}`" class="group block">
        <div class="wrap band flex flex-wrap items-end justify-between gap-6">
          <div>
            <p class="eyebrow">Next project</p>
            <h2 class="display-2 mt-5 transition-colors group-hover:text-neutral-300">
              {{ next.title }}
            </h2>
            <p class="mt-3 text-sm text-neutral-500">{{ next.category }} · {{ next.location }}</p>
          </div>
          <span aria-hidden="true" class="text-3xl text-neutral-600 transition-transform group-hover:translate-x-2">→</span>
        </div>
      </NuxtLink>
    </section>

    <CtaBand/>
  </div>
</template>
