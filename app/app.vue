<template>
  <div id="app" class="w-full bg-black">
    <NuxtRouteAnnouncer/>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
/*
 * Registered here rather than via `css:` in nuxt.config on purpose: routing it
 * through nuxt.config made the build emit per-module stylesheet links (which
 * 404 when served from .output) instead of bundling into entry.css.
 */
import '../assets/css/globals.css'
</script>
