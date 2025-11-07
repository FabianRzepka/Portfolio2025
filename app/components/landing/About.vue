<script setup lang="ts">
import type { IndexCollectionItem } from "@nuxt/content";

defineProps<{
  page: IndexCollectionItem;
}>();
</script>

<template>
  <UPageSection
    :title="page.about.title"
    :description="page.about.description"
    :ui="{
      container: '!p-0',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'text-left mt-3 text-sm sm:text-md lg:text-sm text-muted',
    }"
  >
    <div
      class="absolute select-none inset-0 max-w-4xl mx-auto font-normal font-[none] text-5xl text-persian-green-100 pointer-events-none"
    >
      <CrossElement />
    </div>
  </UPageSection>
</template>

<style scoped></style>
