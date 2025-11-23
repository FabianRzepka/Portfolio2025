<script lang="ts" setup>
import { motion } from 'motion-v'
import { LazyMediaModal } from '#components'
const { data: page } = await useAsyncData('media-page', () => {
  return queryCollection('pages').path('/media').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  })
}
const { data: media } = await useAsyncData('media', () => queryCollection('media').all())
if (!media.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'media not found',
    fatal: true,
  })
}
useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description,
})

const container = {
  show: {
    transition: { delay: 0.4, staggerChildren: 0.15 },
  },
}

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
}
const overlay = useOverlay()

const modal = overlay.create(LazyMediaModal)

async function open(post: any) {
  modal.open({
    post: post,
  })
}
</script>

<template>
  <AppHeaderSpacer>
    <UButton
      color="primary"
      icon="lucide:arrow-left"
      size="md"
      to="/"
      variant="link"
      class="h-full shrink-0 cursor-pointer border-r border-(--line-b-color-dark) pr-4 text-xs uppercase"
    >
      Strona główna
    </UButton>
    <div class="flex h-full w-full"></div>
  </AppHeaderSpacer>
  <UMain v-if="page" class="mx-4 min-h-screen border-x border-(--line-b-color-dark) lg:m-0 lg:mx-auto lg:max-w-6xl">
    <div
      class="relative flex flex-col gap-2 overflow-hidden border-b border-(--line-b-color-dark) px-4 py-18 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-24 lg:text-left"
    >
      <CrossElement />
      <div class="gradient-overlay absolute -top-50 opacity-50" />
      <h1 class="text-3xl font-semibold tracking-tight text-pretty lg:text-4xl">
        {{ page.title }}
      </h1>
      <p class="text-muted">
        {{ page.description }}
      </p>
    </div>
    <motion.div
      :in-view-options="{ once: true }"
      :variants="container"
      initial="hidden"
      while-in-view="show"
      class="grid flex-col gap-4 border-t border-(--line-b-color-dark) p-4 px-4 lg:grid-cols-3 lg:gap-y-4"
    >
      <motion.div
        v-for="post in media"
        :key="post.id"
        :variants="item"
        class="h-full border border-t-0 border-(--line-b-color-dark) last:border-b-0 lg:border-y-0 lg:not-first:border-l lg:not-last:border-r lg:first:border-l-0 lg:last:border-r-0"
      >
        <div @click="open(post)" class="group relative overflow-hidden hover:cursor-pointer">
          <CrossElement />
          <UBadge color="primary" class="absolute right-2 bottom-2 z-1 font-bold">
            {{ post.images.length + 1 }}
          </UBadge>
          <NuxtImg
            :src="post.coverImage"
            format="webp"
            class="transtion-scale duration-200 ease-out group-hover:scale-105"
          />
        </div>
      </motion.div>
    </motion.div>
  </UMain>
</template>
