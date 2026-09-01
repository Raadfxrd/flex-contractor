<script setup lang="ts">
import {onMounted, onUnmounted, ref} from 'vue'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLDivElement>()
const titleRef = ref<HTMLElement>()
const subtitleRef = ref<HTMLElement>()
const formRef = ref<HTMLFormElement>()

const formData = ref({
  name: '',
  email: '',
  phone: '',
  project: '',
  message: '',
})

const submitForm = () => {
  // Form submission logic
  console.log('Form submitted:', formData.value)
  alert('Thank you for your inquiry! We will get back to you soon.')
  // Reset form
  formData.value = {name: '', email: '', phone: '', project: '', message: ''}
}

let ctx: gsap.Context

onMounted(() => {
  if (!sectionRef.value) return

  ctx = gsap.context(() => {

    // Animate title
    if (titleRef.value) {
      gsap.fromTo(
          titleRef.value,
          {opacity: 0, y: 30},
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.value,
              start: 'top 70%',
              end: 'top 50%',
              scrub: false,
              markers: false,
            },
          }
      )
    }

    // Animate subtitle
    if (subtitleRef.value) {
      gsap.fromTo(
          subtitleRef.value,
          {opacity: 0, y: 20},
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.1,
            scrollTrigger: {
              trigger: sectionRef.value,
              start: 'top 70%',
              end: 'top 50%',
              scrub: false,
              markers: false,
            },
          }
      )
    }

    // Animate form elements
    if (formRef.value) {
      gsap.fromTo(
          formRef.value,
          {opacity: 0, y: 30},
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.2,
            scrollTrigger: {
              trigger: sectionRef.value,
              start: 'top 70%',
              end: 'top 50%',
              scrub: false,
              markers: false,
            },
          }
      )
    }
  }, sectionRef.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section
      ref="sectionRef"
      class="section-container no-snap w-full h-screen flex items-center justify-center bg-gradient-to-br from-black via-dark-secondary to-black px-6 py-20"
  >
    <div class="max-w-2xl w-full space-y-12">
      <!-- Heading -->
      <div class="text-center mb-16">
        <h2 ref="titleRef" class="section-title text-6xl md:text-7xl font-bold mb-4">
          Let's Build Together
        </h2>
        <p ref="subtitleRef" class="text-gray-400 text-lg">
          Get in touch with our team to discuss your next project
        </p>
      </div>

      <!-- Contact Form -->
      <form ref="formRef" @submit.prevent="submitForm" class="space-y-6">
        <!-- Name & Email Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-300 mb-2">
              Full Name *
            </label>
            <input
                id="name"
                v-model="formData.name"
                type="text"
                required
                class="w-full px-6 py-3 bg-dark-secondary border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors duration-300"
                placeholder="John Doe"
            />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-300 mb-2">
              Email Address *
            </label>
            <input
                id="email"
                v-model="formData.email"
                type="email"
                required
                class="w-full px-6 py-3 bg-dark-secondary border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors duration-300"
                placeholder="john@example.com"
            />
          </div>
        </div>

        <!-- Phone & Project Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-300 mb-2">
              Phone Number
            </label>
            <input
                id="phone"
                v-model="formData.phone"
                type="tel"
                class="w-full px-6 py-3 bg-dark-secondary border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors duration-300"
                placeholder="+1 (555) 123-4567"
            />
          </div>
          <div>
            <label for="project" class="block text-sm font-medium text-gray-300 mb-2">
              Project Type
            </label>
            <select
                id="project"
                v-model="formData.project"
                class="w-full px-6 py-3 bg-dark-secondary border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors duration-300"
            >
              <option value="">Select a project type</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="industrial">Industrial</option>
              <option value="renovation">Renovation</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <!-- Message -->
        <div>
          <label for="message" class="block text-sm font-medium text-gray-300 mb-2">
            Message *
          </label>
          <textarea
              id="message"
              v-model="formData.message"
              required
              rows="5"
              class="w-full px-6 py-3 bg-dark-secondary border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors duration-300 resize-none"
              placeholder="Tell us about your project..."
          />
        </div>

        <!-- Submit Button -->
        <div class="pt-4">
          <button
              type="submit"
              class="w-full px-8 py-4 bg-accent hover:bg-accent/90 text-black font-bold rounded-lg transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-black"
          >
            Send Inquiry
          </button>
        </div>

        <!-- Privacy Notice -->
        <p class="text-center text-xs text-gray-500">
          We respect your privacy. Your information will be kept confidential.
        </p>
      </form>
    </div>
  </section>
</template>

<style scoped>
/* Contact section specific styles */
select {
  appearance: none;
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;
}
</style>

