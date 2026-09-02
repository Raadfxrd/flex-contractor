<script setup lang="ts">
const c = useContent()

useSeo({
  title: `${c.value.specialisms.eyebrow} | Flexcontractor B.V.`,
  description: c.value.specialisms.lede,
  image: '/img/trap-en-vloer.jpg',
})
</script>

<template>
  <div>
    <PageHeader
        :eyebrow="c.specialisms.eyebrow"
        :lede="c.specialisms.lede"
        :title="c.specialisms.title"
        image="/img/installaties.jpg"
        image-alt=""
    />

    <section class="wrap band">
      <p class="lede max-w-3xl border-l-2 border-brand pl-6">{{ c.intro.range }}</p>

      <ul class="mt-16 grid gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-3">
        <li v-for="(item, i) in c.specialisms.items" :key="item.slug" class="flex flex-col bg-ink">
          <div v-if="item.image" class="relative aspect-[16/10] w-full overflow-hidden bg-surface">
            <!-- 1280px sources: `sizes` caps at 600 so the 2x request stays inside them. -->
            <NuxtImg
                :src="item.image"
                :alt="item.imageAlt ?? ''"
                :loading="i < 2 ? 'eager' : 'lazy'"
                sizes="xs:400px sm:600px md:400px lg:440px xl:440px"
                class="h-full w-full object-cover"
            />
          </div>

          <div class="flex flex-1 flex-col p-8">
            <span class="numeral text-xs text-brand">{{ String(i + 1).padStart(2, '0') }}</span>
            <h2 class="display-3 mt-3">{{ item.title }}</h2>
            <p class="body-copy mt-4 flex-1">{{ item.description }}</p>

            <ul class="mt-6 space-y-2 border-t border-white/10 pt-5">
              <li v-for="line in item.includes" :key="line" class="flex gap-3 text-sm text-neutral-400">
                <span class="mt-2 h-px w-3 shrink-0 bg-brand" aria-hidden="true"/>
                <span>{{ line }}</span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </section>

    <CtaBand/>
  </div>
</template>
