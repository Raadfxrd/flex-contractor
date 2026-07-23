<script lang="ts" setup>
import {onMounted, onUnmounted} from 'vue'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import Hero from '../../components/Hero.vue'
import StorySection from '../../components/StorySection.vue'
import ProcessSection from '../../components/ProcessSection.vue'
import PortfolioScroller from '../../components/PortfolioScroller.vue'
import ContactSection from '../../components/ContactSection.vue'
import ScrollToTopButton from '../../components/ScrollToTopButton.vue'

// Register plugins
gsap.registerPlugin(ScrollTrigger)

// Story sections data
const storyData = [
  {
    title: 'Foundations',
    description:
        'We build on solid ground. Our foundation work ensures every project stands strong and lasts for generations. Precision engineering meets attention to detail.',
    imageUrl:
        '/img/foundations.jpg',
    imageAlt: 'Foundation work',
    index: 0,
  },
  {
    title: 'Electrical',
    description:
        'From residential wiring to industrial systems, our electrical experts ensure safety, efficiency, and compliance. Modern technology meets expert craftsmanship.',
    imageUrl:
        '/img/electrical.jpg',
    imageAlt: 'Electrical work',
    index: 1,
    reverse: true,
  },
  {
    title: 'Structural Work',
    description:
        'The backbone of any project. Our structural engineers design and execute solutions that are both robust and elegant. We turn visions into steel-strong realities.',
    imageUrl:
        '/img/structural.jpg',
    imageAlt: 'Structural work',
    index: 2,
  },
  {
    title: 'Finishing & Renovation',
    description:
        'The final touches that transform spaces into masterpieces. From paint to cabinetry, we handle every detail with perfectionism. Your dream space awaits.',
    imageUrl:
        '/img/renovation.avif',
    imageAlt: 'Finishing work',
    index: 3,
    reverse: true,
  },
]

const setSnapEnabled = (enabled: boolean) => {
  document.documentElement.classList.toggle('snap-disabled', !enabled)
  document.body.classList.toggle('snap-disabled', !enabled)
}

let snapEnabled = true

const updateSnapMode = () => {
  const portfolioSection = document.getElementById('portfolio-section')
  if (!portfolioSection) return

  const portfolioTop = portfolioSection.offsetTop
  const scrollY = window.scrollY
  const reEnableThreshold = portfolioTop - window.innerHeight * 0.5

  if (snapEnabled && scrollY >= portfolioTop) {
    snapEnabled = false
  } else if (!snapEnabled && scrollY < reEnableThreshold) {
    snapEnabled = true
  }

  setSnapEnabled(snapEnabled)
}

const handleWindowLoad = () => {
  ScrollTrigger.refresh()
  updateSnapMode()
}

onMounted(() => {
  // Refresh ScrollTrigger on mount and window load
  window.addEventListener('load', handleWindowLoad)
  window.addEventListener('scroll', updateSnapMode, {passive: true})
  updateSnapMode()
})

onUnmounted(() => {
  window.removeEventListener('load', handleWindowLoad)
  window.removeEventListener('scroll', updateSnapMode)
  setSnapEnabled(true)
})
</script>

<template>
  <div class="w-full bg-black">
    <!-- Scroll to Top Button -->
    <ScrollToTopButton/>

    <!-- Hero Section -->
    <Hero/>

    <!-- Story Sections -->
    <StorySection
        v-for="story in storyData"
        :key="story.index"
        :description="story.description"
        :image-alt="story.imageAlt"
        :image-url="story.imageUrl"
        :index="story.index"
        :reverse="story.reverse || false"
        :title="story.title"
    />

    <!-- Process Section -->
    <ProcessSection id="process-section"/>

    <!-- Portfolio Section -->
    <PortfolioScroller id="portfolio-section" class="section-container"/>

    <!-- Contact Section -->
    <ContactSection/>

    <!-- Footer -->
    <footer class="w-full bg-black border-t border-gray-800/30 px-6 md:px-12 py-12 no-snap">
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
                <a class="text-gray-400 hover:text-accent transition-colors" href="#">
                  About Us
                </a>
              </li>
              <li>
                <a class="text-gray-400 hover:text-accent transition-colors" href="#">
                  Services
                </a>
              </li>
              <li>
                <a class="text-gray-400 hover:text-accent transition-colors" href="#">
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
                <a class="text-gray-400 hover:text-accent transition-colors" href="#">
                  LinkedIn
                </a>
              </li>
              <li>
                <a class="text-gray-400 hover:text-accent transition-colors" href="#">
                  Instagram
                </a>
              </li>
              <li>
                <a class="text-gray-400 hover:text-accent transition-colors" href="#">
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
