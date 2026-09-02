<script setup lang="ts">
import {addressLines, site} from '~/data/site'

const c = useContent()

useSeo({
  title: `${c.value.contact.eyebrow} | Flexcontractor B.V.`,
  description: c.value.contact.lede,
})
</script>

<template>
  <div>
    <PageHeader :eyebrow="c.contact.eyebrow" :lede="c.contact.lede" :title="c.contact.title"/>

    <section class="wrap band">
      <div class="grid gap-14 lg:grid-cols-12 lg:gap-20">
        <!--
          Direct contact details come FIRST in the source order and sit at the
          top on narrow screens. Someone who wants to phone should not have to
          scroll past a five-field form to find the number.
        -->
        <div class="lg:col-span-4">
          <dl class="space-y-8">
            <div class="border-t border-white/10 pt-6">
              <dt class="eyebrow">{{ c.contact.phoneLabel }}</dt>
              <dd class="mt-2">
                <a :href="site.phoneHref" class="text-lg text-white transition-colors hover:text-brand">
                  {{ site.phone }}
                </a>
              </dd>
            </div>
            <div class="border-t border-white/10 pt-6">
              <dt class="eyebrow">{{ c.contact.emailLabel }}</dt>
              <dd class="mt-2">
                <a :href="site.emailHref" class="break-words text-lg text-white transition-colors hover:text-brand">
                  {{ site.email }}
                </a>
              </dd>
            </div>
            <div class="border-t border-white/10 pt-6">
              <dt class="eyebrow">{{ c.contact.officeLabel }}</dt>
              <dd class="mt-2">
                <address class="text-lg not-italic text-neutral-300">
                  <span v-for="line in addressLines" :key="line" class="block">{{ line }}</span>
                </address>
              </dd>
            </div>
            <div class="border-t border-white/10 pt-6">
              <dt class="eyebrow">{{ c.contact.hoursLabel }}</dt>
              <dd class="mt-2 text-lg text-neutral-300">{{ site.hours }}</dd>
            </div>
            <div class="border-t border-white/10 pt-6">
              <dt class="eyebrow">{{ c.contact.areaLabel }}</dt>
              <dd class="mt-2 text-neutral-400">{{ site.serviceArea.join(' · ') }}</dd>
            </div>
          </dl>
        </div>

        <div class="lg:col-span-8">
          <h2 class="eyebrow">{{ c.contact.formTitle }}</h2>
          <div class="mt-8">
            <ContactForm/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
