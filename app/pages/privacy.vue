<script setup lang="ts">
import {site} from '~/data/site'

useSeo({
  title: 'Privacy policy | Flex Contractor',
  description: `How ${site.legalName} handles the information you send through this website.`,
  path: '/privacy',
  noindex: true,
})

/*
 * PLACEHOLDER POLICY. It accurately describes what the code in this repository
 * actually does today -- the contact endpoint, the honeypot, the rate limiter --
 * but it is not legal advice and has not been reviewed. Have it checked against
 * your jurisdiction before launch, and update it the moment you add analytics,
 * a chat widget, or any third-party embed.
 */
const updated = 'September 2026'
</script>

<template>
  <div>
    <PageHeader
        eyebrow="Legal"
        :lede="`How we handle the information you send us. Last updated ${updated}.`"
        title="Privacy policy"
    />

    <section class="wrap-narrow band">
      <div class="space-y-12">
        <div>
          <h2 class="display-3">What we collect</h2>
          <p class="body-copy mt-4">
            Only what you type into the contact form: your name, email address, an optional
            phone number, an optional project type, and your message. We do not use
            analytics, advertising or tracking cookies on this site, and there are no
            third-party embeds on any page.
          </p>
        </div>

        <div>
          <h2 class="display-3">Why we collect it</h2>
          <p class="body-copy mt-4">
            To reply to your enquiry and, if it becomes a project, to carry out the work.
            That is the only purpose. We do not sell it, share it for marketing, or add you
            to a mailing list.
          </p>
        </div>

        <div>
          <h2 class="display-3">How it reaches us</h2>
          <p class="body-copy mt-4">
            Submissions are sent to our email inbox through a transactional email provider.
            Your message is not written to a database on this website. Our server keeps a
            short-lived record of request timing per IP address to limit automated abuse of
            the form; it holds no message content and is discarded within minutes.
          </p>
        </div>

        <div>
          <h2 class="display-3">How long we keep it</h2>
          <p class="body-copy mt-4">
            Enquiries that do not lead to work are deleted from our inbox within twelve
            months. Records relating to projects we carried out are retained for as long as
            our insurance and statutory obligations require.
          </p>
        </div>

        <div>
          <h2 class="display-3">Your rights</h2>
          <p class="body-copy mt-4">
            You can ask us what we hold about you, ask for it to be corrected, or ask us to
            delete it. Write to
            <a :href="site.emailHref" class="text-white underline underline-offset-4">{{ site.email }}</a>
            and we will respond within thirty days.
          </p>
        </div>

        <div>
          <h2 class="display-3">Contact</h2>
          <address class="body-copy mt-4 not-italic">
            {{ site.legalName }}<br>
            {{ site.address.street }}<br>
            {{ site.address.locality }}, {{ site.address.region }} {{ site.address.postalCode }}<br>
            <a :href="site.emailHref" class="text-white underline underline-offset-4">{{ site.email }}</a>
          </address>
        </div>
      </div>
    </section>
  </div>
</template>
