<script setup lang="ts">
import {site} from '~/data/site'

const c = useContent()

useSeo({
  title: `${c.value.careers.eyebrow} | Flexcontractor B.V.`,
  description: c.value.careers.lede,
  image: '/img/verbouwing.jpg',
})

/*
 * Deliberately empty. The live site advertises no vacancies, and an invented
 * list of open roles attached to a real, identifiable company is a false claim
 * about that company -- the same reason `site.vat` ships blank.
 *
 * The page renders the honest "nothing advertised, send your details" state
 * from this, so adding a real vacancy here is the only change needed.
 */
const roles: {title: string, location: string, type: string, summary: string}[] = []
</script>

<template>
  <div>
    <PageHeader
        :eyebrow="c.careers.eyebrow"
        :lede="c.careers.lede"
        :title="c.careers.title"
    />

    <section class="wrap band">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p class="eyebrow">{{ c.careers.openRolesEyebrow }}</p>
          <h2 class="display-2 mt-5">
            {{ roles.length ? roles.length : c.careers.noOpenings }}
          </h2>
        </div>
        <a :href="site.emailHref" class="btn-secondary">{{ c.careers.speculative }}</a>
      </div>

      <ul v-if="roles.length" class="mt-14 divide-y divide-white/10 border-y border-white/10">
        <li v-for="role in roles" :key="role.title" class="py-8">
          <div class="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
            <h3 class="display-3">{{ role.title }}</h3>
            <p class="font-display text-xs uppercase tracking-eyebrow text-neutral-500">
              {{ role.location }} · {{ role.type }}
            </p>
          </div>
          <p class="body-copy mt-4 max-w-2xl">{{ role.summary }}</p>
        </li>
      </ul>

      <p v-else class="lede mt-10 max-w-xl">
        <a :href="site.emailHref" class="text-white underline underline-offset-4">{{ site.email }}</a>
      </p>
    </section>

    <section class="border-t border-white/10 bg-surface">
      <div class="wrap band">
        <div class="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div class="lg:col-span-4">
            <p class="eyebrow">{{ c.careers.benefitsEyebrow }}</p>
            <h2 class="display-2 mt-5">{{ c.careers.benefitsTitle }}</h2>
          </div>
          <ul class="grid gap-px bg-white/10 sm:grid-cols-2 lg:col-span-8">
            <li v-for="benefit in c.careers.benefits" :key="benefit" class="bg-surface px-6 py-6 text-neutral-300">
              {{ benefit }}
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>
