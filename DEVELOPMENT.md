# Development Guide - Flex Contractor

## Overview

This document provides detailed information about the development setup, architecture, and best practices for the Flex
Contractor portfolio website.

## 🏗️ Architecture

### Component Structure

```
App (app.vue)
├── Hero
├── StorySection (4x)
│   ├── ParallaxBackground
│   ├── FadeInText
│   └── ScrollTrigger animations
├── ProcessSection
│   ├── StepIndicators
│   └── Sequential animations
├── PortfolioScroller
│   ├── HorizontalScroll
│   ├── ProjectCards
│   └── VelocityEffects
├── ContactSection
│   ├── Form elements
│   └── Validation
└── Footer
```

### State Management

Uses Vue 3 Composition API with ref() and reactive() for local state. No external state management needed as sections
are independent.

### Animation Architecture

All animations use GSAP ScrollTrigger for performance:

1. **Hero**: Entrance animations + zoom effect
2. **Story Sections**: Parallax + text fade-in
3. **Process**: Sequential step animations
4. **Portfolio**: Horizontal scroll with skew
5. **Contact**: Form focus states

## 🎬 GSAP Animation Patterns

### ScrollTrigger Pattern

```typescript
gsap.to(element, {
    property: value,
    scrollTrigger: {
        trigger: triggerElement,
        start: 'top center',      // When trigger hits viewport
        end: 'bottom center',     // Animation end point
        scrub: 0.5,              // Smooth scrub ratio
        markers: false,          // Debug markers
    }
})
```

### Common Settings

- **scrub**: 0.5 (smooth 0.5s delay)
- **ease**: power2.out (standard easing)
- **duration**: 1 (animation length)
- **delay**: Used for staggered effects

## 📝 Component Details

### Hero.vue

**Purpose**: Fullscreen hero section with hero headline

**Key Features**:

- Gradient text headline
- Animated scroll indicator
- Background zoom effect
- Staggered text animations

**Props**: None (static content)

**Animations**:

- Headline: fade-in + slide (from bottom)
- Subheading: fade-in + slide with delay
- Scroll indicator: pulsing animation

### StorySection.vue

**Purpose**: Reusable story section with parallax and text animations

**Props**:

```typescript
interface Props {
    title: string              // Section title
    description: string        // Section description
    imageUrl: string          // Background image URL
    imageAlt: string          // Image alt text
    reverse?: boolean         // Flip layout
    index: number             // Section index
}
```

**Key Features**:

- Full-screen background image
- Parallax scrolling effect
- Gradient overlay for text readability
- Reverse layout for visual variety

### ProcessSection.vue

**Purpose**: Display 3-step process with sequential animations

**Data**:

```typescript
interface Step {
    number: string    // Display number (01, 02, 03)
    title: string     // Step title
    description: string
    icon: string      // Emoji icon
}
```

**Animations**:

- Title fade-in
- Sequential step animations with stagger
- Connecting line scale animation

### PortfolioScroller.vue

**Purpose**: Horizontal scrolling portfolio gallery

**Key Features**:

- Horizontal scroll animation
- Velocity-based skewing
- Project card hover effects
- Meta information overlay

**Projects Data**:

```typescript
interface Project {
    id: number
    title: string
    category: string
    image: string
}
```

### ContactSection.vue

**Purpose**: Contact form with smooth interactions

**Form Fields**:

- Full Name (required)
- Email (required)
- Phone (optional)
- Project Type (select)
- Message (required, textarea)

**Animations**:

- Input focus effects (border color)
- Button scale on hover
- Form section animations on scroll

## 🔧 Composables

### useScrollAnimation.ts

**Purpose**: Centralized GSAP ScrollTrigger utilities

**Exports**:

```typescript
// Register GSAP plugins
registerScrollTrigger()

// Create parallax effect
createParallax(element, speed = 0.5, options = {})

// Fade and slide animation
createFadeIn(element, options = {})

// Horizontal scroll effect
createHorizontalScroll(container, content, options = {})

// Pin section during scroll
pinSection(element, options = {})

// Refresh all ScrollTriggers
refreshScroll()

// Clean up all animations
killAll()
```

### useSmoothScroll.ts

**Purpose**: Smooth scroll utilities

**Exports**:

```typescript
// Smooth scroll to target
scrollTo(target
:
string | number, duration
:
number
)

// Get current scroll position
getScrollPosition()
:
number

// Disable body scroll
disableScroll()

// Enable body scroll
enableScroll()
```

## 🎨 Tailwind CSS Customization

### Custom Colors

```typescript
colors: {
    dark: '#0a0a0a',              // Primary background
        'dark-secondary'
:
    '#1a1a1a',  // Secondary background
        accent
:
    '#FFA500',            // Orange accent
        'accent-gold'
:
    '#D4AF37',     // Gold alternative
}
```

### Custom Spacing

```typescript
spacing: {
    'section'
:
    '100vh',  // Fullscreen sections
}
```

## 📱 Responsive Breakpoints

All components use Tailwind breakpoints:

- `sm`: 640px
- `md`: 768px (tablet)
- `lg`: 1024px
- `xl`: 1280px

## 🚀 Performance Optimization

### Best Practices

1. **Image Optimization**
    - Use WebP format where possible
    - Lazy load below-the-fold images
    - Use appropriate image sizes

2. **Code Splitting**
    - Nuxt handles automatic code splitting
    - Route-based splitting included
    - Component lazy loading available

3. **Animation Performance**
    - Use transform and opacity only
    - Avoid animations on expensive properties
    - Disable ScrollTrigger markers in production

4. **Bundle Size**
    - Tree-shake unused GSAP plugins
    - Minimize CSS classes
    - Remove dev-only code

## 🧪 Testing

### Manual Testing Checklist

- [ ] Hero animation on page load
- [ ] Scroll trigger activates at correct viewport position
- [ ] Parallax effect smooth and 60fps
- [ ] Story sections fade in properly
- [ ] Process steps animate sequentially
- [ ] Portfolio horizontal scroll works
- [ ] Contact form validates and submits
- [ ] Mobile responsive on all breakpoints
- [ ] Animations smooth on slow devices
- [ ] No console errors

### Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: Latest

## 🐛 Debugging

### Enable ScrollTrigger Markers

In production components, temporarily add:

```typescript
scrollTrigger: {
    // ...
    markers: true,  // Shows trigger zones
}
```

### Check ScrollTrigger Status

```typescript
// In browser console
gsap.globalTimeline.getChildren()
ScrollTrigger.getAll()
```

### Performance Profiling

1. Open DevTools Performance tab
2. Record while scrolling
3. Look for Long Tasks (>50ms)
4. Check FPS (aim for 60fps)

## 📦 Deployment

### Pre-deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] No console errors in production build
- [ ] Images optimized
- [ ] Animations smooth on target devices
- [ ] Form submission working
- [ ] All links functional
- [ ] Meta tags updated
- [ ] Analytics tracking in place

### Environment Variables

```env
# .env.production
NUXT_PUBLIC_API_BASE=https://api.flexcontractor.com
```

## 🔄 Continuous Integration

### GitHub Actions Setup

```yaml
name: Build and Deploy

on: [ push ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run build
      - run: npm run preview  # Test build
```

## 📚 Resources

- [Nuxt 3 Best Practices](https://nuxt.com/docs/guide/concepts/auto-imports)
- [GSAP ScrollTrigger Guide](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [Vue 3 Performance](https://vuejs.org/guide/best-practices/)
- [Tailwind CSS Design System](https://tailwindcss.com/docs/customization)

## 🤝 Contributing

### Code Style

- Use TypeScript for type safety
- Scoped styles for CSS isolation
- Consistent naming conventions
- Comments for complex logic

### Adding New Features

1. Create feature branch
2. Implement with TypeScript
3. Add corresponding styles
4. Test across breakpoints
5. Submit pull request

## 📞 Support

For questions about development:

- Check existing component implementations
- Review GSAP documentation
- Consult Nuxt/Vue 3 docs
- Profile with browser DevTools

---

**Last Updated**: May 4, 2026

