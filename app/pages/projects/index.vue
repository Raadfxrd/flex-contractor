<script setup lang="ts">
import {projectCategories, projects} from '~/data/projects'
import {companyStats} from '~/data/site'

useSeo({
  title: 'Projects | Flex Contractor',
  description:
      'Commercial, residential, industrial and renovation projects delivered across '
      + 'Amsterdam and Noord-Holland — with the constraints, the approach and the '
      + 'outcome for each.',
  path: '/projects',
  image: '/img/office.jpg',
})

/*
 * The filter lives in the query string, not in local state. It survives a
 * reload, it can be linked to and shared, and the back button steps through
 * filters the way a visitor expects it to.
 */
const route = useRoute()
const router = useRouter()

const active = computed(() => {
  const requested = String(route.query.category ?? 'All')
  return (projectCategories as readonly string[]).includes(requested) ? requested : 'All'
})

const filtered = computed(() =>
    active.value === 'All'
        ? projects
        : projects.filter((project) => project.category === active.value))

const setCategory = (category: string) => {
  router.replace({query: category === 'All' ? {} : {category}})
}
</script>

<template>
  <div>
    <PageHeader
        eyebrow="Selected work"
        image="/img/office.jpg"
        image-alt=""
        lede="Every project below lists what made it difficult, what we did about it, and
              what the client ended up with. The interesting part of a build is rarely the
              photograph."
        title="Projects"
    />

    <section class="wrap band">
      <FactGrid :facts="companyStats" bordered/>

      <!-- Filters -->
      <div class="mt-16 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
        <button
            v-for="category in projectCategories"
            :key="category"
            :aria-pressed="active === category"
            :class="[
              'border px-5 py-2.5 font-display text-xs uppercase tracking-eyebrow transition-colors',
              active === category
                ? 'border-white bg-white text-ink'
                : 'border-white/15 text-neutral-400 hover:border-white/40 hover:text-white',
            ]"
            type="button"
            @click="setCategory(category)"
        >
          {{ category }}
        </button>
      </div>

      <!-- aria-live so a filter change is announced, not just rendered. -->
      <p class="sr-only" aria-live="polite">
        Showing {{ filtered.length }} {{ filtered.length === 1 ? 'project' : 'projects' }}.
      </p>

      <div class="mt-12 grid gap-12 md:grid-cols-2 md:gap-x-10 md:gap-y-16">
        <ProjectCard
            v-for="(project, i) in filtered"
            :key="project.slug"
            :index="i"
            :project="project"
        />
      </div>

      <p v-if="!filtered.length" class="lede mt-12">
        No projects in this category yet.
      </p>
    </section>

    <CtaBand/>
  </div>
</template>
