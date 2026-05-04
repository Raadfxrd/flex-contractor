<script setup lang="ts">
import { onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Story sections data
const storyData = [
  {
    title: 'Foundations',
    description:
      'We build on solid ground. Our foundation work ensures every project stands strong and lasts for generations. Precision engineering meets attention to detail.',
    imageUrl:
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1600&h=900&fit=crop',
    imageAlt: 'Foundation work',
    index: 0,
  },
  {
    title: 'Electrical',
    description:
      'From residential wiring to industrial systems, our electrical experts ensure safety, efficiency, and compliance. Modern technology meets expert craftsmanship.',
    imageUrl:
      'https://images.unsplash.com/photo-1512207736139-c3dc16f17969?w=1600&h=900&fit=crop',
    imageAlt: 'Electrical work',
    index: 1,
    reverse: true,
  },
  {
    title: 'Structural Work',
    description:
      'The backbone of any project. Our structural engineers design and execute solutions that are both robust and elegant. We turn visions into steel-strong realities.',
    imageUrl:
      'https://images.unsplash.com/photo-1504917595217-3404ee9c6e65?w=1600&h=900&fit=crop',
    imageAlt: 'Structural work',
    index: 2,
  },
  {
    title: 'Finishing & Renovation',
    description:
      'The final touches that transform spaces into masterpieces. From paint to cabinetry, we handle every detail with perfectionism. Your dream space awaits.',
    imageUrl:
      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=1600&h=900&fit=crop',
    imageAlt: 'Finishing work',
    index: 3,
    reverse: true,
  },
]

onMounted(() => {
  // Enable smooth scrolling behavior
  if (process.client) {
    // Refresh ScrollTrigger on mount
    window.addEventListener('load', () => {
      ScrollTrigger.refresh()
    })
  }
})
</script>

<template>
  <div class="w-full bg-black">
    <!-- Hero Section -->
    <Hero />

    <!-- Story Sections -->
    <StorySection
      v-for="story in storyData"
      :key="story.index"
      :title="story.title"
      :description="story.description"
      :image-url="story.imageUrl"
      :image-alt="story.imageAlt"
      :reverse="story.reverse || false"
      :index="story.index"
    />

    <!-- Process Section -->
    <ProcessSection />

    <!-- Portfolio Section -->
    <PortfolioScroller />

    <!-- Contact Section -->
    <ContactSection />

    <!-- Footer -->
    <footer class="w-full bg-black border-t border-gray-800/30 px-6 md:px-12 py-12">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <!-- About -->
          <div>
            <h3 class="font-bold text-lg text-white mb-4">Flex Contractor</h3>
            <p class="text-gray-400 text-sm">
              Building excellence from foundation to finish.
            </p>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="font-semibold text-white mb-4">Company</h4>
            <ul class="space-y-2 text-sm">
              <li>
                <a href="#" class="text-gray-400 hover:text-accent transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-accent transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-accent transition-colors">
                  Portfolio
                </a>
              </li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div>
            <h4 class="font-semibold text-white mb-4">Contact</h4>
            <ul class="space-y-2 text-sm">
              <li class="text-gray-400">+1 (555) 123-4567</li>
              <li class="text-gray-400">info@flexcontractor.com</li>
              <li class="text-gray-400">123 Build St, City, State</li>
            </ul>
          </div>

          <!-- Social Links -->
          <div>
            <h4 class="font-semibold text-white mb-4">Follow Us</h4>
            <ul class="space-y-2 text-sm">
              <li>
                <a href="#" class="text-gray-400 hover:text-accent transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-accent transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-accent transition-colors">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Divider -->
        <div class="border-t border-gray-800/30 pt-8">
          <p class="text-center text-gray-500 text-sm">
            © 2024 Flex Contractor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Page-specific styles */
</style>

