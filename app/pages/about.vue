<script setup lang="ts">
import {companyStats, site} from '~/data/site'
import {services} from '~/data/services'

useSeo({
  title: 'About | Flex Contractor',
  description:
      `A general contractor working across Amsterdam and Noord-Holland since ${site.founded}, `
      + 'with directly employed trades across foundations, electrical, structural work and finishing.',
  path: '/about',
  image: '/img/industrial.jpg',
})

const principles = [
  {
    title: 'Directly employed trades',
    body:
        'Our groundworkers, electricians, steel erectors and finishers are on our payroll, '
        + 'not assembled per project. It is why the programme survives contact with the site.',
  },
  {
    title: 'Priced before, not during',
    body:
        'The parts of a job most likely to become a variation are the parts we survey hardest '
        + 'before tender. A cheap number that moves is not a cheap number.',
  },
  {
    title: 'One point of contact',
    body:
        'A named site manager from mobilisation to handover, with a written weekly report you '
        + 'do not have to chase.',
  },
  {
    title: 'Safety as a programme item',
    body:
        'Method statements are written by the people doing the work, not copied forward from '
        + 'the last project with the name changed.',
  },
]
</script>

<template>
  <div>
    <PageHeader
        eyebrow="About"
        image="/img/industrial.jpg"
        image-alt=""
        :lede="`A general contractor working across Amsterdam and Noord-Holland since ${site.founded}.
                Four divisions, ${companyStats[2].value} trades on staff, and one programme
                per project.`"
        title="Built by the people who build."
    />

    <section class="wrap band">
      <FactGrid :facts="companyStats" bordered/>
    </section>

    <section class="border-t border-white/10 bg-surface">
      <div class="wrap band">
        <div class="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div class="lg:col-span-4">
            <p class="eyebrow">How we operate</p>
            <h2 class="display-2 mt-5">Four commitments</h2>
          </div>

          <dl class="divide-y divide-white/10 border-y border-white/10 lg:col-span-8">
            <div v-for="principle in principles" :key="principle.title" class="py-8">
              <dt class="display-3 text-xl md:text-2xl">{{ principle.title }}</dt>
              <dd class="body-copy mt-4 max-w-2xl">{{ principle.body }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <section class="wrap band">
      <div class="grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div class="lg:col-span-5">
          <p class="eyebrow">Credentials</p>
          <h2 class="display-2 mt-5">On paper</h2>
        </div>

        <dl class="space-y-8 lg:col-span-7">
          <!--
            KvK and BTW ship empty on purpose — see the header note in
            app/data/site.ts. Guarded so the section simply omits them rather
            than rendering a label with nothing after it.
          -->
          <div v-if="site.kvk" class="border-t border-white/10 pt-6">
            <dt class="eyebrow">Chamber of Commerce</dt>
            <dd class="numeral mt-2 text-lg text-white">KvK {{ site.kvk }}</dd>
          </div>
          <div v-if="site.vat" class="border-t border-white/10 pt-6">
            <dt class="eyebrow">VAT identification</dt>
            <dd class="numeral mt-2 text-lg text-white">{{ site.vat }}</dd>
          </div>
          <div class="border-t border-white/10 pt-6">
            <dt class="eyebrow">Certification</dt>
            <dd class="mt-2 text-lg text-white">{{ site.certifications.join(' · ') }}</dd>
          </div>
          <div class="border-t border-white/10 pt-6">
            <dt class="eyebrow">Insurance</dt>
            <dd class="mt-2 text-lg text-white">{{ site.insurance }}</dd>
          </div>
          <div class="border-t border-white/10 pt-6">
            <dt class="eyebrow">Trading since</dt>
            <dd class="numeral mt-2 text-lg text-white">{{ site.founded }}</dd>
          </div>
          <div class="border-t border-white/10 pt-6">
            <dt class="eyebrow">Service area</dt>
            <dd class="mt-2 text-lg text-white">{{ site.serviceArea.join(' · ') }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <section class="border-t border-white/10">
      <div class="wrap band">
        <p class="eyebrow">Divisions</p>
        <ul class="mt-8 divide-y divide-white/10 border-y border-white/10">
          <li v-for="service in services" :key="service.slug">
            <NuxtLink
                :to="`/services/${service.slug}`"
                class="group flex flex-wrap items-baseline gap-x-6 gap-y-2 py-6 transition-colors hover:text-neutral-300"
            >
              <span class="numeral text-sm text-neutral-600">{{ service.number }}</span>
              <span class="display-3">{{ service.title }}</span>
              <span class="w-full text-sm text-neutral-500 md:w-auto md:flex-1">{{ service.summary }}</span>
              <span aria-hidden="true" class="text-neutral-600 transition-transform group-hover:translate-x-1">→</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <CtaBand/>
  </div>
</template>
