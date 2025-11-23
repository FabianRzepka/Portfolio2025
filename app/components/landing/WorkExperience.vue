<script lang="ts" setup>
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()
</script>

<template>
  <UPageSection
    :title="page.experience.title"
    :ui="{
      container: '!p-0 gap-4 sm:gap-4',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'mt-2',
    }"
  >
    <div
      class="text-persian-green-100 pointer-events-none absolute inset-0 mx-auto max-w-4xl font-[none] text-5xl font-normal select-none"
    >
      <CrossElement />
    </div>
    <template #description>
      <div class="flex flex-col gap-2">
        <Motion
          v-for="(experience, index) in page.experience.items"
          :in-view-options="{ once: true }"
          :initial="{ opacity: 0, transform: 'translateY(20px)' }"
          :key="index"
          :transition="{ delay: 0.2 + 0.2 * index }"
          :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
          class="text-muted flex flex-col gap-2 text-nowrap"
        >
          <p class="text-left text-sm text-white">
            {{ experience.date }}
          </p>

          <ULink :to="experience.company.url" target="_blank" class="flex items-center gap-1">
            <span class="text-sm">
              {{ experience.position }}
            </span>
            <div class="inline-flex items-center gap-1" :style="{ color: experience.company.color }">
              <span class="font-medium">{{ experience.company.name }}</span>
              <UIcon :name="experience.company.logo" />
            </div>
          </ULink>
        </Motion>
      </div>
    </template>
  </UPageSection>
</template>

<style scoped></style>
