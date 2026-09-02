<script setup lang="ts">
import type {Project} from '~/data/projects'

defineProps<{
  project: Project
  /** Index in the grid -- only the first two are worth loading eagerly. */
  index?: number
}>()
</script>

<template>
  <article class="group">
    <NuxtLink :to="`/projects/${project.slug}`" class="block">
      <div class="relative aspect-[4/3] overflow-hidden bg-surface">
        <NuxtImg
            :src="project.image"
            :alt="project.imageAlt"
            :loading="(index ?? 9) < 2 ? 'eager' : 'lazy'"
            sizes="xs:320px sm:600px md:400px lg:520px xl:600px"
            class="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"/>
      </div>

      <!--
        The caption sits below the image rather than inside a hover-only
        overlay: hover does not exist on touch, so an overlay-only caption is
        invisible to every phone visitor.
      -->
      <div class="mt-5 flex items-baseline justify-between gap-4 border-t border-white/10 pt-5">
        <div>
          <h3 class="display-3 transition-colors group-hover:text-neutral-300">{{ project.title }}</h3>
          <p class="mt-2 text-sm text-neutral-500">
            {{ project.category }} · {{ project.location }}
          </p>
        </div>
        <span class="numeral shrink-0 text-sm text-neutral-500">{{ project.year }}</span>
      </div>
    </NuxtLink>
  </article>
</template>
