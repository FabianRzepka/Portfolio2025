<script lang="ts" setup>
const img = useImage()
import type { IndexCollectionItem } from '@nuxt/content'

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
</script>

<template>
  <div class="relative pt-14 pb-14">
    <h2 class="text-highlighted text-center text-xl font-medium tracking-tight text-pretty sm:text-xl lg:text-2xl">
      {{ page.blog.title }}
    </h2>
    <div class="sm:text-md text-muted mt-2 text-center text-sm text-balance lg:text-sm">
      {{ page.blog.description }}
    </div>
  </div>

  <UBlogPosts
    orientation="vertical"
    class="grid gap-4 border-t border-(--line-b-color-dark) px-4 lg:grid-cols-3 lg:gap-y-4 lg:px-0"
  >
    <UBlogPost
      v-for="(post, index) in posts"
      v-bind="post"
      :key="index"
      :to="post.path"
      :ui="{
        image: 'p-1 group-hover/blog-post:scale-150',
      }"
      orientation="vertical"
      variant="naked"
      class="card group/item border border-t-0 border-(--line-b-color-dark) last:border-b-0 lg:border-y-0 lg:not-first:border-l lg:not-last:border-r lg:first:border-l-0 lg:last:border-r-0"
    >
      <template #badge>
        <CrossElement />
      </template>
    </UBlogPost>
  </UBlogPosts>
</template>
<style>
.card img {
  transform-origin: 6% 2% !important;
}
</style>
