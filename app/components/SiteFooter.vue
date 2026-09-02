<script setup lang="ts">
import {addressLines, site} from '~/data/site'

const c = useContent()
const localePath = useLocalePath()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-white/10 bg-ink">
    <div class="wrap py-16 md:py-20">
      <div class="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5">
        <div class="col-span-2 lg:col-span-2">
          <NuxtImg
              src="/logo-white.png"
              :alt="site.name"
              width="200"
              height="186"
              format="webp"
              loading="lazy"
              sizes="xs:128px sm:128px md:128px lg:128px xl:128px"
              class="h-11 w-auto"
          />
          <p class="eyebrow mt-5">{{ c.footer.tagline }}</p>
          <p class="body-copy mt-4 max-w-xs">
            {{ c.intro.body }}
          </p>

          <!--
            Registration numbers are guarded: `vat` ships empty on purpose (see
            the header note in app/data/site.ts), and an empty "BTW" label is
            worse than no label at all.
          -->
          <dl v-if="site.kvk || site.vat" class="mt-8 space-y-1 text-sm">
            <div v-if="site.kvk" class="flex gap-2">
              <dt class="sr-only">{{ c.about.kvkLabel }}</dt>
              <dd class="text-neutral-500">KvK {{ site.kvk }}</dd>
            </div>
            <div v-if="site.vat" class="flex gap-2">
              <dt class="sr-only">{{ c.about.vatLabel }}</dt>
              <dd class="text-neutral-500">BTW {{ site.vat }}</dd>
            </div>
          </dl>
        </div>

        <div>
          <h2 class="eyebrow-muted">{{ c.footer.servicesLabel }}</h2>
          <ul class="mt-5 space-y-3">
            <li v-for="service in c.services.items" :key="service.slug">
              <NuxtLink
                  :to="localePath(`/services/${service.slug}`)"
                  class="text-sm text-neutral-400 transition-colors hover:text-white"
              >
                {{ service.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h2 class="eyebrow-muted">{{ c.footer.companyLabel }}</h2>
          <ul class="mt-5 space-y-3">
            <li>
              <NuxtLink :to="localePath('/specialisms')" class="text-sm text-neutral-400 transition-colors hover:text-white">
                {{ c.nav.specialisms }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/about')" class="text-sm text-neutral-400 transition-colors hover:text-white">
                {{ c.nav.about }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/careers')" class="text-sm text-neutral-400 transition-colors hover:text-white">
                {{ c.nav.careers }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/contact')" class="text-sm text-neutral-400 transition-colors hover:text-white">
                {{ c.nav.contact }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h2 class="eyebrow-muted">{{ c.footer.contactLabel }}</h2>
          <ul class="mt-5 space-y-3 text-sm">
            <li>
              <a :href="site.phoneHref" class="text-neutral-400 transition-colors hover:text-white">
                {{ site.phone }}
              </a>
            </li>
            <li>
              <a :href="site.emailHref" class="break-words text-neutral-400 transition-colors hover:text-white">
                {{ site.email }}
              </a>
            </li>
            <li>
              <address class="not-italic text-neutral-400">
                <span v-for="line in addressLines" :key="line" class="block">{{ line }}</span>
              </address>
            </li>
          </ul>

          <h2 class="eyebrow-muted mt-8">{{ c.footer.followLabel }}</h2>
          <ul class="mt-4 flex gap-4">
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

      <div class="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-xs text-neutral-500">
          © {{ year }} {{ site.legalName }}. {{ c.footer.rights }}
        </p>
        <NuxtLink :to="localePath('/privacy')" class="text-xs text-neutral-500 transition-colors hover:text-white">
          {{ c.footer.privacy }}
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>
