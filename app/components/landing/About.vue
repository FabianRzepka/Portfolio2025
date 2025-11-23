<script lang="ts" setup>
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()
</script>

<template>
  <UPageSection
    :title="page.about.title"
    :ui="{
      container: '!p-0',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'text-left mt-3 text-sm sm:text-md lg:text-sm text-muted',
    }"
  >
    <div
      class="text-persian-green-100 pointer-events-none absolute inset-0 mx-auto max-w-4xl font-[none] text-5xl font-normal select-none"
    >
      <CrossElement />
    </div>
    <template #description>
      <Motion
        :in-view-options="{ once: true }"
        :initial="{ opacity: 0, transform: 'translateY(20px)' }"
        :transition="{ delay: 0.2 }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
      >
        {{ page.about.description }}
      </Motion>
    </template>
  </UPageSection>
</template>

<style scoped></style>
