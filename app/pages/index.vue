<script lang="ts" setup>
import {services} from '~/data/services'
import {site} from '~/data/site'

/*
 * Scroll snapping is opt-in per page, and this is the page that opts in.
 * Every other route is an ordinary document; a global snap made them jump.
 */
useScrollSnap()

useSeo({
  title: `${site.name} | ${site.tagline}`,
  description: site.description,
  path: '/',
  image: '/img/hero.jpg',
})

/*
 * The four story panels are generated from services.ts rather than a second
 * hand-maintained array, so a service and its homepage panel cannot drift
 * apart -- and each panel links through to its own page.
 */
const storyData = computed(() => services.map((service, index) => ({
  slug: service.slug,
  title: service.title,
  description: service.summary,
  imageUrl: service.image,
  imageAlt: service.imageAlt,
  index,
  reverse: index % 2 === 1,
})))
</script>

<template>
  <div class="w-full bg-ink">
    <Hero/>

    <StorySection
        v-for="story in storyData"
        :key="story.slug"
        :description="story.description"
        :image-alt="story.imageAlt"
        :image-url="story.imageUrl"
        :index="story.index"
        :reverse="story.reverse"
        :slug="story.slug"
        :title="story.title"
    />

    <ProcessSection/>

    <PortfolioScroller/>

    <ContactSection/>
  </div>
</template>
