<script setup lang="ts">
import {site} from '~/data/site'

const c = useContent()
const localePath = useLocalePath()

/*
 * This form once console.log()ed and then alert()ed a thank-you -- a prospect
 * believed they had made contact and nobody ever heard from them. That is worse
 * than having no form, so the failure modes are distinct and all honest:
 *
 *   - delivery configured but the send failed  -> "could not send, try again"
 *   - delivery not configured on the server    -> say so plainly, and surface
 *                                                 the phone number and email
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
  const t = c.value.form.errors

  if (!form.name.trim()) errors.name = t.name
  if (!form.email.trim()) {
    errors.email = t.emailMissing
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
    errors.email = t.emailInvalid
  }
  if (!form.message.trim()) {
    errors.message = t.messageMissing
  } else if (form.message.trim().length < 20) {
    errors.message = t.messageShort
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
      errorMessage.value = error?.data?.message || c.value.form.errors.generic
    }
  }
}

const reset = () => {
  Object.assign(form, {name: '', email: '', phone: '', projectType: '', message: '', companyWebsite: ''})
  fieldErrors.value = {}
  status.value = 'idle'
}
</script>

<template>
  <div>
    <div v-if="status === 'success'" class="border border-white/15 bg-surface p-8 md:p-10">
      <p class="eyebrow">{{ c.form.success.eyebrow }}</p>
      <h3 class="display-3 mt-4">{{ c.form.success.title }}</h3>
      <p class="body-copy mt-4">
        {{ c.form.success.body }}
        <a :href="site.phoneHref" class="text-white underline underline-offset-4">{{ site.phone }}</a>.
      </p>
      <button type="button" class="btn-secondary mt-8" @click="reset">{{ c.form.success.again }}</button>
    </div>

    <div v-else-if="status === 'unavailable'" class="border border-white/15 bg-surface p-8 md:p-10">
      <p class="eyebrow">{{ c.form.unavailable.eyebrow }}</p>
      <h3 class="display-3 mt-4">{{ c.form.unavailable.title }}</h3>
      <p class="body-copy mt-4">{{ c.form.unavailable.body }}</p>
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
        <input id="company-website" v-model="form.companyWebsite" type="text" tabindex="-1" autocomplete="off">
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <div>
          <label class="field-label" for="name">{{ c.form.name }}</label>
          <input
              id="name" v-model="form.name" type="text" autocomplete="name"
              :class="['field', fieldErrors.name ? 'field-error' : '']"
              :aria-invalid="!!fieldErrors.name"
              :aria-describedby="fieldErrors.name ? 'name-error' : undefined"
              :placeholder="c.form.namePlaceholder"
          >
          <p v-if="fieldErrors.name" id="name-error" class="mt-2 text-sm text-red-400">{{ fieldErrors.name }}</p>
        </div>

        <div>
          <label class="field-label" for="email">{{ c.form.email }}</label>
          <input
              id="email" v-model="form.email" type="email" autocomplete="email"
              :class="['field', fieldErrors.email ? 'field-error' : '']"
              :aria-invalid="!!fieldErrors.email"
              :aria-describedby="fieldErrors.email ? 'email-error' : undefined"
              :placeholder="c.form.emailPlaceholder"
          >
          <p v-if="fieldErrors.email" id="email-error" class="mt-2 text-sm text-red-400">{{ fieldErrors.email }}</p>
        </div>

        <div>
          <label class="field-label" for="phone">{{ c.form.phone }}</label>
          <input
              id="phone" v-model="form.phone" type="tel" autocomplete="tel"
              class="field" :placeholder="c.form.phonePlaceholder"
          >
        </div>

        <div>
          <label class="field-label" for="projectType">{{ c.form.projectType }}</label>
          <select id="projectType" v-model="form.projectType" class="field">
            <option value="">{{ c.form.projectTypePlaceholder }}</option>
            <option v-for="service in c.services.items" :key="service.slug" :value="service.slug">
              {{ service.title }}
            </option>
            <option value="other">{{ c.form.other }}</option>
          </select>
        </div>

        <div class="md:col-span-2">
          <label class="field-label" for="message">{{ c.form.message }}</label>
          <textarea
              id="message" v-model="form.message" rows="6"
              :class="['field resize-y', fieldErrors.message ? 'field-error' : '']"
              :aria-invalid="!!fieldErrors.message"
              :aria-describedby="fieldErrors.message ? 'message-error' : undefined"
              :placeholder="c.form.messagePlaceholder"
          />
          <p v-if="fieldErrors.message" id="message-error" class="mt-2 text-sm text-red-400">{{ fieldErrors.message }}</p>
        </div>
      </div>

      <!-- role=alert so the failure is announced, not just displayed. -->
      <p
          v-if="status === 'error'"
          class="mt-6 border border-red-400/40 bg-red-400/5 px-4 py-3 text-sm text-red-300"
          role="alert"
      >
        {{ errorMessage }}
      </p>

      <div class="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button :disabled="status === 'submitting'" class="btn-primary disabled:opacity-60" type="submit">
          {{ status === 'submitting' ? c.form.submitting : c.form.submit }}
        </button>
        <p class="text-xs text-neutral-500">
          {{ c.form.privacyNote }}
          <NuxtLink :to="localePath('/privacy')" class="text-neutral-400 underline underline-offset-4 hover:text-white">
            {{ c.form.privacyLink }}
          </NuxtLink>.
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
