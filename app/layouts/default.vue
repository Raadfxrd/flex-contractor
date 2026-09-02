<script setup lang="ts">
import {site} from '~/data/site'

/*
 * Site-wide structured data. Search engines read this to decide whether the
 * business can appear in local results at all -- a general contractor without
 * it is competing on the organic list only.
 *
 * The values come from app/data/site.ts, which is still placeholder. Publishing
 * invented NAP (name/address/phone) data here is actively harmful, so replacing
 * it is on the launch checklist in README.md.
 */
const {siteUrl} = useRuntimeConfig().public
const origin = String(siteUrl).replace(/\/$/, '')

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'GeneralContractor',
      '@id': `${origin}/#business`,
      name: site.name,
      legalName: site.legalName,
      description: site.description,
      url: origin,
      telephone: site.phone,
      email: site.email,
      foundingDate: String(site.founded),
      image: `${origin}/img/hero.jpg`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.address.street,
        addressLocality: site.address.locality,
        addressRegion: site.address.region,
        postalCode: site.address.postalCode,
        addressCountry: site.address.country,
      },
      areaServed: site.serviceArea.map((name) => ({'@type': 'City', name})),
      sameAs: site.social.map((channel) => channel.href),
    }),
  }],
})
</script>

<template>
  <div class="min-h-screen bg-ink">
    <a class="skip-link btn-primary !py-2 !text-xs" href="#main">Skip to content</a>

    <SiteHeader/>

    <main id="main">
      <slot/>
    </main>

    <SiteFooter/>
  </div>
</template>
