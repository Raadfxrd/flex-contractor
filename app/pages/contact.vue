<script setup lang="ts">
import {site} from '~/data/site'

useSeo({
  title: 'Contact | Flex Contractor',
  description:
      `Call ${site.phone}, email ${site.email}, or send project details through the form. `
      + 'We reply within one working day.',
  path: '/contact',
  image: '/img/hero.jpg',
})
</script>

<template>
  <div>
    <PageHeader
        eyebrow="Contact"
        lede="Tell us where the site is and what stage you are at — drawings, a rough
              scope, or three lines describing the idea are all enough to start."
        title="Let's build together."
    />

    <section class="wrap band">
      <div class="grid gap-14 lg:grid-cols-12 lg:gap-20">
        <!--
          Direct contact details come FIRST in the source order and sit at the
          top on narrow screens. Someone who wants to phone should not have to
          scroll past a six-field form to find the number.
        -->
        <div class="lg:col-span-4">
          <dl class="space-y-8">
            <div class="border-t border-white/10 pt-6">
              <dt class="eyebrow">Phone</dt>
              <dd class="mt-2">
                <a :href="site.phoneHref" class="text-lg text-white transition-colors hover:text-neutral-300">
                  {{ site.phone }}
                </a>
              </dd>
            </div>
            <div class="border-t border-white/10 pt-6">
              <dt class="eyebrow">Email</dt>
              <dd class="mt-2">
                <a :href="site.emailHref"
                   class="break-words text-lg text-white transition-colors hover:text-neutral-300">
                  {{ site.email }}
                </a>
              </dd>
            </div>
            <div class="border-t border-white/10 pt-6">
              <dt class="eyebrow">Office</dt>
              <dd class="mt-2">
                <address class="text-lg not-italic text-neutral-300">
                  {{ site.address.street }}<br>
                  {{ site.address.locality }}, {{ site.address.region }} {{ site.address.postalCode }}
                </address>
              </dd>
            </div>
            <div class="border-t border-white/10 pt-6">
              <dt class="eyebrow">Hours</dt>
              <dd class="mt-2 text-lg text-neutral-300">{{ site.hours }}</dd>
            </div>
            <div class="border-t border-white/10 pt-6">
              <dt class="eyebrow">Service area</dt>
              <dd class="mt-2 text-neutral-400">{{ site.serviceArea.join(' · ') }}</dd>
            </div>
          </dl>
        </div>

        <div class="lg:col-span-8">
          <h2 class="eyebrow">Send project details</h2>
          <div class="mt-8">
            <ContactForm/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
