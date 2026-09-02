<script lang="ts" setup>
const c = useContent()

useSeo({
  title: c.value.meta.title,
  description: c.value.meta.description,
  image: '/img/keuken.jpg',
})

/*
 * Only the specialisms that carry a photo become full-screen story panels.
 * Deriving them from the same array the scroller uses means a specialism and
 * its panel cannot drift apart, and adding a photo to another specialism is
 * all it takes to promote it.
 */
const featured = computed(() =>
    c.value.specialisms.items.filter((s) => s.image).slice(0, 4))
</script>

<template>
  <div class="w-full bg-ink">
    <Hero/>

    <StorySection
        v-for="(item, i) in featured"
        :key="item.slug"
        :description="item.description"
        :image-alt="item.imageAlt ?? ''"
        :image-url="item.image!"
        :index="i"
        :reverse="i % 2 === 1"
        :title="item.title"
    />

    <ValuesSection/>

    <SpecialismScroller/>

    <TestimonialsSection/>

    <ContactSection/>
  </div>
</template>
