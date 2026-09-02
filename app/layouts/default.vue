<script setup lang="ts">
import {site} from '~/data/site'

const c = useContent()

/*
 * Site-wide structured data. Search engines read this to decide whether the
 * business can appear in local results at all -- a contractor without it is
 * competing on the organic list only.
 *
 * The name, address, phone and KvK number here are REAL, which is exactly why
 * `site.vat` is left empty rather than filled with something plausible: this
 * block is the most consequential place an invented identifier could end up.
 */
const {siteUrl} = useRuntimeConfig().public
const origin = String(siteUrl).replace(/\/$/, '')

useHead(() => ({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'GeneralContractor',
      '@id': `${origin}/#business`,
      name: site.name,
      legalName: site.legalName,
      description: c.value.meta.description,
      slogan: c.value.footer.tagline,
      url: origin,
      telephone: site.phone,
      email: site.email,
      foundingDate: String(site.founded),
      image: `${origin}/img/keuken.jpg`,
      logo: `${origin}/logo.png`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.address.street,
        postalCode: site.address.postalCode,
        addressLocality: site.address.locality,
        addressRegion: site.address.region,
        addressCountry: site.address.country,
      },
      areaServed: site.serviceArea.map((name) => ({'@type': 'City', name})),
      sameAs: site.social.map((channel) => channel.href),
      ...(site.kvk ? {identifier: {'@type': 'PropertyValue', name: 'KvK', value: site.kvk}} : {}),
    }),
  }],
}))
</script>

<template>
  <div class="min-h-screen bg-ink">
    <a class="skip-link btn-primary !py-2 !text-xs" href="#main">{{ c.actions.skipToContent }}</a>

    <SiteHeader/>

    <main id="main">
      <slot/>
    </main>

    <SiteFooter/>
  </div>
</template>
