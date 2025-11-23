<script lang="ts" setup>
import { motion } from 'motion-v'
import type { IndexCollectionItem } from '@nuxt/content'
import { UBlogPosts } from '#components'

defineProps<{
  page: IndexCollectionItem
}>()

const { data: posts } = await useAsyncData('index-blogs', () =>
  queryCollection('projects').order('date', 'DESC').limit(3).all(),
)
if (!posts.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'posts not found',
    fatal: true,
  })
}
const MotionUBlogPosts = motion.create(UBlogPosts)
const container = {
  show: {
    transition: { delay: 0.4, staggerChildren: 0.15 },
  },
}

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
}
</script>

<template>
  <motion.div
    :in-view-options="{ once: true }"
    :initial="{ opacity: 0, y: -20 }"
    :transition="{ delay: 0.4, duration: 0.6 }"
    :while-in-view="{ opacity: 1, y: 0 }"
    class="relative pt-14 pb-14"
  >
    <h2 class="text-highlighted text-center text-xl font-medium tracking-tight text-pretty sm:text-xl lg:text-2xl">
      {{ page.blog.title }}
    </h2>
    <div class="sm:text-md text-muted mt-2 text-center text-sm text-balance lg:text-sm">
      {{ page.blog.description }}
    </div>
  </motion.div>
  <MotionUBlogPosts
    :in-view-options="{ once: true }"
    :variants="container"
    initial="hidden"
    orientation="vertical"
    while-in-view="show"
    class="grid gap-4 border-t border-(--line-b-color-dark) px-4 lg:grid-cols-3 lg:gap-y-4 lg:px-0"
  >
    <motion.div
      v-for="(post, index) in posts"
      :variants="item"
      class="h-full border border-t-0 border-(--line-b-color-dark) last:border-b-0 lg:border-y-0 lg:not-first:border-l lg:not-last:border-r lg:first:border-l-0 lg:last:border-r-0"
    >
      <UBlogPost
        v-bind="post"
        :key="index"
        :to="post.path"
        :ui="{
          image: 'p-1 group-hover/blog-post:scale-150 border-0 ',
        }"
        orientation="vertical"
        prefetch-on="visibility"
        variant="naked"
        class="card group/item h-full bg-zinc-800/20"
      >
        <template #badge>
          <CrossElement />
        </template>
      </UBlogPost>
    </motion.div>
  </MotionUBlogPosts>
</template>
<style>
.card img {
  transform-origin: 6% 2% !important;
}
</style>
