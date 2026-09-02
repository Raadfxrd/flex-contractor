<script setup lang="ts">
import {services} from '~/data/services'
import {site} from '~/data/site'

/*
 * This form previously console.log()ed and then alert()ed "Thank you for your
 * inquiry! We will get back to you soon." -- a prospect believed they had made
 * contact and nobody ever heard from them. That is worse than having no form,
 * so the two failure modes are now distinct and both are honest:
 *
 *   - delivery configured but the send failed  -> "could not send, try again"
 *   - delivery not configured on the server    -> tell the visitor plainly and
 *                                                 surface the phone and email
 *
 * Neither path ever claims a message was received when it was not.
 */
type Status = 'idle' | 'submitting' | 'success' | 'error' | 'unavailable'

const status = ref<Status>('idle')
const errorMessage = ref('')
const fieldErrors = ref<Record<string, string>>({})

const form = reactive({
  name: '',
  email: '',
  phone: '',
  projectType: '',
  message: '',
  // Honeypot. Real people never see it, so anything in it is a bot.
  companyWebsite: '',
})

const validate = () => {
  const errors: Record<string, string> = {}

  if (!form.name.trim()) errors.name = 'Please tell us your name.'
  if (!form.email.trim()) {
    errors.email = 'We need an email address to reply to.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
    errors.email = 'That does not look like a complete email address.'
  }
  if (!form.message.trim()) {
    errors.message = 'Please tell us a little about the project.'
  } else if (form.message.trim().length < 20) {
    errors.message = 'A sentence or two helps us route this to the right team.'
  }

  fieldErrors.value = errors
  return Object.keys(errors).length === 0
}

const submit = async () => {
  if (status.value === 'submitting') return

  if (!validate()) {
    // Move focus to the first problem rather than leaving the visitor to hunt.
    const first = Object.keys(fieldErrors.value)[0]
    document.getElementById(first ?? '')?.focus()
    return
  }

  status.value = 'submitting'
  errorMessage.value = ''

  try {
    await $fetch('/api/contact', {method: 'POST', body: {...form}})
    status.value = 'success'
  } catch (error: any) {
    if (error?.data?.code === 'not_configured') {
      status.value = 'unavailable'
    } else {
      status.value = 'error'
      errorMessage.value = error?.data?.message
          || 'Something went wrong sending your message. Please try again.'
    }
  }
}

const reset = () => {
  Object.assign(form, {
    name: '', email: '', phone: '', projectType: '', message: '', companyWebsite: '',
  })
  fieldErrors.value = {}
  status.value = 'idle'
}
</script>

<template>
  <div>
    <!-- Success -->
    <div v-if="status === 'success'" class="border border-white/15 bg-surface p-8 md:p-10">
      <p class="eyebrow">Message sent</p>
      <h3 class="display-3 mt-4">Thank you — we have it.</h3>
      <p class="body-copy mt-4">
        Someone from the team will reply within one working day. If it is urgent,
        call us on
        <a :href="site.phoneHref" class="text-white underline underline-offset-4">{{ site.phone }}</a>.
      </p>
      <button type="button" class="btn-secondary mt-8" @click="reset">Send another message</button>
    </div>

    <!-- Delivery not wired up on the server -->
    <div v-else-if="status === 'unavailable'" class="border border-white/15 bg-surface p-8 md:p-10">
      <p class="eyebrow">Form unavailable</p>
      <h3 class="display-3 mt-4">This form is not connected yet.</h3>
      <p class="body-copy mt-4">
        Your message was <strong class="text-white">not</strong> sent. Please reach us directly
        in the meantime — we will pick it up straight away.
      </p>
      <div class="mt-8 flex flex-col gap-3 sm:flex-row">
        <a :href="site.phoneHref" class="btn-primary">{{ site.phone }}</a>
        <a :href="site.emailHref" class="btn-secondary">{{ site.email }}</a>
      </div>
    </div>

    <form v-else novalidate @submit.prevent="submit">
      <!--
        Honeypot: positioned off-screen rather than display:none, because some
        bots skip hidden inputs. aria-hidden and tabindex keep it away from
        assistive tech and the tab order.
      -->
      <div class="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label for="company-website">Company website</label>
        <input
            id="company-website"
            v-model="form.companyWebsite"
            type="text"
            tabindex="-1"
            autocomplete="off"
        >
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <div>
          <label class="field-label" for="name">Full name *</label>
          <input
              id="name"
              v-model="form.name"
              :class="['field', fieldErrors.name ? 'field-error' : '']"
              :aria-invalid="!!fieldErrors.name"
              :aria-describedby="fieldErrors.name ? 'name-error' : undefined"
              autocomplete="name"
              placeholder="Jordan Rivera"
              type="text"
          >
          <p v-if="fieldErrors.name" id="name-error" class="mt-2 text-sm text-red-400">
            {{ fieldErrors.name }}
          </p>
        </div>

        <div>
          <label class="field-label" for="email">Email address *</label>
          <input
              id="email"
              v-model="form.email"
              :class="['field', fieldErrors.email ? 'field-error' : '']"
              :aria-invalid="!!fieldErrors.email"
              :aria-describedby="fieldErrors.email ? 'email-error' : undefined"
              autocomplete="email"
              placeholder="jordan@company.com"
              type="email"
          >
          <p v-if="fieldErrors.email" id="email-error" class="mt-2 text-sm text-red-400">
            {{ fieldErrors.email }}
          </p>
        </div>

        <div>
          <label class="field-label" for="phone">Phone number</label>
          <input
              id="phone"
              v-model="form.phone"
              autocomplete="tel"
              class="field"
              placeholder="+31 6 12345678"
              type="tel"
          >
        </div>

        <div>
          <label class="field-label" for="projectType">Project type</label>
          <select id="projectType" v-model="form.projectType" class="field">
            <option value="">Select a project type</option>
            <option v-for="service in services" :key="service.slug" :value="service.slug">
              {{ service.title }}
            </option>
            <option value="other">Something else</option>
          </select>
        </div>

        <div class="md:col-span-2">
          <label class="field-label" for="message">About the project *</label>
          <textarea
              id="message"
              v-model="form.message"
              :class="['field resize-y', fieldErrors.message ? 'field-error' : '']"
              :aria-invalid="!!fieldErrors.message"
              :aria-describedby="fieldErrors.message ? 'message-error' : undefined"
              placeholder="Location, rough size, and what stage you are at."
              rows="6"
          />
          <p v-if="fieldErrors.message" id="message-error" class="mt-2 text-sm text-red-400">
            {{ fieldErrors.message }}
          </p>
        </div>
      </div>

      <!-- aria-live so the failure is announced, not just displayed. -->
      <p
          v-if="status === 'error'"
          class="mt-6 border border-red-400/40 bg-red-400/5 px-4 py-3 text-sm text-red-300"
          role="alert"
      >
        {{ errorMessage }}
      </p>

      <div class="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button :disabled="status === 'submitting'" class="btn-primary disabled:opacity-60" type="submit">
          {{ status === 'submitting' ? 'Sending…' : 'Send enquiry' }}
        </button>
        <p class="text-xs text-neutral-500">
          We reply within one working day. See our
          <NuxtLink to="/privacy" class="text-neutral-400 underline underline-offset-4 hover:text-white">
            privacy policy
          </NuxtLink>
          .
        </p>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* Native select arrows are drawn in the UA's own light-mode palette. */
select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a3a3a3' stroke-width='1.75'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1.15rem;
  padding-right: 3rem;
}
</style>
