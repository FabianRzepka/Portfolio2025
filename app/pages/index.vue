<script lang="ts" setup>
import { motion } from 'motion-v'
const { data: page } = await useAsyncData('index', () => {
  return queryCollection('index').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found [ERROR]',
    fatal: true,
  })
}

useSeoMeta({
  title: page.value?.seo.title || page.value?.title,
  ogTitle: page.value?.seo.title || page.value?.title,
  description: page.value?.seo.description || page.value?.description,
  ogDescription: page.value?.seo.description || page.value?.description,
})
</script>

<template>
  <UPage v-if="page">
    <LandingHero :page />
    <LineSpacer />
    <div
      class="relative mx-auto grid w-full max-w-6xl items-center justify-center gap-4 px-4 lg:grid-cols-2 lg:gap-4 lg:px-0"
    >
      <div
        class="border-accent-3 lg-max:hidden pointer-events-none absolute inset-x-4 h-full border-x border-(--line-b-color-dark) lg:inset-0 lg:w-full lg:max-w-6xl"
      ></div>
      <LandingAbout
        :page
        class="hover:bg-persian-green-500/5 group/item h-full border-r border-b border-l border-(--line-b-color-dark) bg-zinc-800/20 p-4 transition-all duration-200 ease-in-out lg:border-b-0 lg:border-l-0"
      />
      <LandingWorkExperience
        :page
        class="hover:bg-persian-green-500/5 group/item h-full border-t border-r border-l border-(--line-b-color-dark) bg-zinc-800/20 p-4 transition-all duration-200 ease-in-out lg:border-t-0 lg:border-r-0"
      />
    </div>
    <LineSpacer />
    <div class="relative mx-auto w-full max-w-6xl border-x border-(--line-b-color-dark)">
      <motion.div
        :initial="{ opacity: 0, scale: 0.95 }"
        :while-in-view="{ opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } }"
        class="gradient-overlay absolute -top-50 opacity-50"
      />
      <LazyLandingBlog :page />
    </div>

    <!-- <LandingTestimonials :page /> -->
    <!-- <LandingFAQ :page /> -->
  </UPage>
</template>
