<script setup lang="ts">
import {site} from '~/data/site'

useSeo({
  title: 'Careers | Flex Contractor',
  description:
      'Open trade and site management roles across foundations, electrical, structural '
      + 'work and finishing. Directly employed, not agency.',
  path: '/careers',
  image: '/img/residential.jpg',
})

/*
 * PLACEHOLDER VACANCIES -- replace with real openings, or empty the array. The
 * page renders a "no current openings" state when it is empty, so it does not
 * need editing in two places.
 */
const roles = [
  {
    title: 'Site Manager — Commercial',
    location: 'Springfield, IL',
    type: 'Full time',
    summary:
        'Run commercial fit-out and frame packages from mobilisation to handover, with a '
        + 'directly employed team and one programme.',
  },
  {
    title: 'Approved Electrician',
    location: 'Bloomington, IL',
    type: 'Full time',
    summary:
        'Industrial and commercial installation, testing and certification. Competent-person '
        + 'registration supported.',
  },
  {
    title: 'Groundworker / Machine Operator',
    location: 'Decatur, IL',
    type: 'Full time',
    summary:
        'Excavation, drainage and reinforced concrete substructure across residential and '
        + 'industrial sites.',
  },
  {
    title: 'Finishing Carpenter',
    location: 'Springfield, IL',
    type: 'Full time',
    summary:
        'Bespoke joinery and second fix on high-specification residential renovation.',
  },
]

const benefits = [
  'Directly employed, not agency',
  'Paid training and certification renewal',
  'Company pension and health cover',
  'Tools, PPE and vehicle provided',
  'Overtime paid, not banked',
  'Work within an hour of home where possible',
]
</script>

<template>
  <div>
    <PageHeader
        eyebrow="Careers"
        image="/img/residential.jpg"
        image-alt=""
        lede="We employ our trades directly, which means we hire steadily rather than in
              bursts. If the role you want is not listed, send us your details anyway —
              we keep them on file."
        title="Work with us."
    />

    <section class="wrap band">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p class="eyebrow">Open roles</p>
          <h2 class="display-2 mt-5">
            {{ roles.length ? `${roles.length} positions` : 'No current openings' }}
          </h2>
        </div>
        <a :href="site.emailHref" class="btn-secondary">Send a speculative application</a>
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
          <a
              :href="`${site.emailHref}?subject=${encodeURIComponent('Application — ' + role.title)}`"
              class="mt-6 inline-flex items-center gap-2 font-display text-xs uppercase tracking-eyebrow text-white"
          >
            Apply for this role <span aria-hidden="true">→</span>
          </a>
        </li>
      </ul>

      <p v-else class="lede mt-10 max-w-xl">
        We have nothing advertised at the moment. Send your details to
        <a :href="site.emailHref" class="text-white underline underline-offset-4">{{ site.email }}</a>
        and we will get in touch when something opens.
      </p>
    </section>

    <section class="border-t border-white/10 bg-surface">
      <div class="wrap band">
        <div class="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div class="lg:col-span-4">
            <p class="eyebrow">What we offer</p>
            <h2 class="display-2 mt-5">The terms</h2>
          </div>
          <ul class="grid gap-px bg-white/10 sm:grid-cols-2 lg:col-span-8">
            <li v-for="benefit in benefits" :key="benefit" class="bg-surface px-6 py-6 text-neutral-300">
              {{ benefit }}
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>
