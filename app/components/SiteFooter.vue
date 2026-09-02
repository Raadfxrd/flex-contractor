<script setup lang="ts">
import {addressLines, primaryNav, site} from '~/data/site'
import {services} from '~/data/services'

const year = new Date().getFullYear()
</script>

<template>
  <!--
    `.no-snap` is load-bearing on the homepage: the footer is taller than the
    viewport on small screens, and a mandatory snap point on a block you cannot
    see the bottom of traps the scroll.
  -->
  <footer class="no-snap border-t border-white/10 bg-ink">
    <div class="wrap py-16 md:py-20">
      <div class="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5">
        <!-- Identity -->
        <div class="col-span-2 lg:col-span-2">
          <p class="font-display text-base uppercase tracking-[0.14em] text-white">
            <span class="font-extrabold">Flex</span><span class="font-medium text-neutral-400"> Contractor</span>
          </p>
          <p class="body-copy mt-4 max-w-xs">{{ site.tagline }}. Building across
            {{ site.serviceArea.slice(0, 3).join(', ') }} and the surrounding region
            since {{ site.founded }}.</p>

          <!--
            Registration numbers are guarded: `kvk` and `vat` ship empty on
            purpose (see the header note in app/data/site.ts), and an empty
            "KvK" label is worse than no label at all.
          -->
          <dl v-if="site.kvk || site.vat" class="mt-8 space-y-1 text-sm">
            <div v-if="site.kvk" class="flex gap-2">
              <dt class="sr-only">Chamber of Commerce number</dt>
              <dd class="text-neutral-500">KvK {{ site.kvk }}</dd>
            </div>
            <div v-if="site.vat" class="flex gap-2">
              <dt class="sr-only">VAT number</dt>
              <dd class="text-neutral-500">BTW {{ site.vat }}</dd>
            </div>
          </dl>
        </div>

        <!-- Services -->
        <div>
          <h2 class="eyebrow">Services</h2>
          <ul class="mt-5 space-y-3">
            <li v-for="service in services" :key="service.slug">
              <NuxtLink
                  :to="`/services/${service.slug}`"
                  class="text-sm text-neutral-400 transition-colors hover:text-white"
              >
                {{ service.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h2 class="eyebrow">Company</h2>
          <ul class="mt-5 space-y-3">
            <li v-for="item in primaryNav" :key="item.to">
              <NuxtLink :to="item.to" class="text-sm text-neutral-400 transition-colors hover:text-white">
                {{ item.label }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="text-sm text-neutral-400 transition-colors hover:text-white">
                Contact
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h2 class="eyebrow">Get in touch</h2>
          <ul class="mt-5 space-y-3 text-sm">
            <li>
              <a :href="site.phoneHref" class="text-neutral-400 transition-colors hover:text-white">
                {{ site.phone }}
              </a>
            </li>
            <li>
              <a :href="site.emailHref" class="text-neutral-400 transition-colors hover:text-white">
                {{ site.email }}
              </a>
            </li>
            <li>
              <address class="not-italic text-neutral-400">
                <span v-for="line in addressLines" :key="line" class="block">{{ line }}</span>
              </address>
            </li>
          </ul>

          <ul class="mt-6 flex gap-4">
            <li v-for="channel in site.social" :key="channel.label">
              <a
                  :href="channel.href"
                  rel="noopener noreferrer"
                  target="_blank"
                  class="text-sm text-neutral-500 transition-colors hover:text-white"
              >
                {{ channel.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
          class="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-xs text-neutral-500">
          © {{ year }} {{ site.legalName }}. All rights reserved.
        </p>
        <NuxtLink to="/privacy" class="text-xs text-neutral-500 transition-colors hover:text-white">
          Privacy policy
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>
