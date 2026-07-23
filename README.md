# Flex Contractor

A high-end, scroll-driven portfolio website for a construction company built with **Nuxt 3**, **Vue 3**, **GSAP**, and
**Tailwind CSS**. This project delivers a cinematic, interactive storytelling experience with smooth animations and
premium scrolling interactions.

## Features

### Scroll-Driven Animations

- **GSAP ScrollTrigger** integration for smooth, performant scroll animations
- Parallax effects on background images with 0.5x speed ratio
- Staggered text animations on scroll
- Horizontal scrolling portfolio section
- Section pinning and scrubbing animations

### Design System

- **Dark theme** with charcoal/black backgrounds
- **Orange accent color** (#FFA500) for construction-inspired branding
- Clean, minimal typography using Inter font
- Large, bold headings with strong visual hierarchy
- Generous whitespace and grid-based layout

### Page Sections

1. **Hero Section**: Fullscreen hero with animated headline, subheading, and scroll indicator
2. **Story Sections (4)**: Foundations, Electrical, Structural Work, Finishing & Renovation
3. **Process Section**: 3-step visualization (Plan → Build → Deliver)
4. **Portfolio Showcase**: Horizontal scrolling gallery with hover effects
5. **Contact Section**: Clean contact form with animations
6. **Footer**: Company info, links, contact details

## 🛠Tech Stack

- **Nuxt 3** - Vue 3 full-stack framework
- **Vue 3** - Composition API for component logic
- **TypeScript** - Type-safe development
- **Tailwind CSS v3** - Utility-first CSS framework
- **GSAP 3** - Advanced animations with ScrollTrigger
- **Vite** - Fast build tool

## Quick Start

```bash
# Install dependencies
npm install

# Start development server (opens http://localhost:3000)
npm run dev

# Build for production
npm run build
```

## Project Structure

```
components/          # Reusable Vue components
  ├── Hero.vue
  ├── StorySection.vue
  ├── ProcessSection.vue
  ├── PortfolioScroller.vue
  └── ContactSection.vue
composables/        # Reusable composition functions
  ├── useScrollAnimation.ts  # GSAP ScrollTrigger utilities
  └── useSmoothScroll.ts     # Smooth scroll helpers
assets/css/         # Global styles
  └── globals.css
app/               # Nuxt app root
  ├── app.vue      # Main component
  ├── pages/
  │   └── index.vue # Homepage
  └── layouts/
      └── default.vue
```

## Color Palette

- Primary Background: `#0a0a0a`
- Secondary Background: `#1a1a1a`
- Text: `#ffffff`
- Accent: `#FFA500` (Orange)

## Key Components

All components use GSAP for animations and support responsive, mobile-first design:

- **Hero**: Gradient text, animated scroll indicator
- **StorySection**: Reusable with parallax, reverse layouts
- **ProcessSection**: Sequential animations, visual connectors
- **PortfolioScroller**: Horizontal scrolling with velocity effects
- **ContactSection**: Form with input animations

## Animation Details

- Parallax: 50% speed ratio relative to scroll
- Text Fades: Triggered at 60% viewport visibility
- Horizontal Scroll: Scrubbed 1:1 with user scroll
- Easing: power2.out for most animations
- Performance: 60fps hardware-accelerated transforms

## Responsive

- Mobile: Single column, optimized sizes
- Tablet: Medium spacing, adjusted typography
- Desktop: Full-width sections, premium styling
- All sections are fully responsive

## Deployment

```bash
# Build production-ready project
npm run build

# Preview build locally
npm run preview
```

## Development

- **TypeScript**: Full type safety
- **Composition API**: Modern Vue 3 patterns
- **Scoped Styles**: No CSS conflicts
- **Auto-imports**: Composables and components

## Resources

- [Nuxt Docs](https://nuxt.com)
- [Vue 3](https://vuejs.org)
- [GSAP](https://gsap.com)
- [Tailwind CSS](https://tailwindcss.com)

---

**Flex Contractor** - Building excellence from foundation to finish!
