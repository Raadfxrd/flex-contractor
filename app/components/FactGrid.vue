<script setup lang="ts">
/*
 * Headline figures. Tabular numerals matter here -- without them the digits
 * are proportionally spaced and the values do not line up down the columns,
 * which is the single most common tell of an unconsidered stat row.
 */
defineProps<{
  facts: readonly { value: string, label: string }[]
  bordered?: boolean
}>()
</script>

<template>
  <dl
      :class="[
        'grid grid-cols-2 gap-px lg:grid-cols-4',
        bordered ? 'border border-white/10 bg-white/10' : '',
      ]"
  >
    <div
        v-for="fact in facts"
        :key="fact.label"
        :class="['px-6 py-8', bordered ? 'bg-ink' : '']"
    >
      <dt class="sr-only">{{ fact.label }}</dt>
      <dd>
        <span class="numeral block text-4xl font-bold leading-none tracking-tight text-white md:text-5xl">
          {{ fact.value }}
        </span>
        <span class="mt-3 block text-sm text-neutral-500">{{ fact.label }}</span>
      </dd>
    </div>
  </dl>
</template>
