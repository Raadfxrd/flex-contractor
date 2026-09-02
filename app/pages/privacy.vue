<script setup lang="ts">
import {addressLines, site} from '~/data/site'

const c = useContent()

useSeo({
  title: `${c.value.privacy.title} | Flexcontractor B.V.`,
  description: c.value.privacy.sections[0]?.body ?? '',
  noindex: true,
})

/*
 * PLACEHOLDER POLICY. It accurately describes what the code in this repository
 * actually does -- the contact endpoint, the honeypot, the rate limiter -- but
 * it is NOT legal advice and has not been reviewed by anyone qualified.
 *
 * Written for the Dutch/EU position: the AVG, a one-month response window, and
 * the Autoriteit Persoonsgegevens as supervisory authority.
 *
 * Two things to settle before launch:
 *   1. Where the transactional email provider stores and processes messages.
 *      Resend is US-based, which makes it an international transfer that needs
 *      naming here and a processor agreement behind it.
 *   2. Whether a verwerkersovereenkomst is in place with that provider.
 */
</script>

<template>
  <div>
    <PageHeader
        :eyebrow="c.privacy.eyebrow"
        :lede="`${c.privacy.updated}`"
        :title="c.privacy.title"
    />

    <section class="wrap-narrow band">
      <div class="space-y-12">
        <div v-for="section in c.privacy.sections" :key="section.heading">
          <h2 class="display-3">{{ section.heading }}</h2>
          <p class="body-copy mt-4">{{ section.body }}</p>
        </div>

        <div>
          <h2 class="display-3">{{ c.privacy.contactHeading }}</h2>
          <address class="body-copy mt-4 not-italic">
            {{ site.legalName }}<br>
            <span v-for="line in addressLines" :key="line">{{ line }}<br></span>
            <a :href="site.emailHref" class="text-white underline underline-offset-4">{{ site.email }}</a>
          </address>
        </div>
      </div>
    </section>
  </div>
</template>
