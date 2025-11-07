<script setup lang="ts">
const img = useImage();
import type { IndexCollectionItem } from "@nuxt/content";

defineProps<{
  page: IndexCollectionItem;
}>();

const { data: posts } = await useAsyncData("index-blogs", () =>
  queryCollection("projects").order("date", "DESC").limit(3).all(),
);
if (!posts.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "posts not found",
    fatal: true,
  });
}
</script>

<template>
  <div class="relative pb-14 pt-14">
    <h2
      class="text-pretty tracking-tight text-highlighted text-center text-xl sm:text-xl lg:text-2xl font-medium"
    >
      {{ page.blog.title }}
    </h2>
    <div
      class="text-balance text-center mt-2 text-sm sm:text-md lg:text-sm text-muted"
    >
      {{ page.blog.description }}
    </div>
  </div>

  <UBlogPosts
    orientation="vertical"
    class="gap-4 grid lg:grid-cols-3 lg:gap-y-4 px-4 lg:px-0 border-t border-(--line-b-color-dark)"
  >
    <UBlogPost
      v-for="(post, index) in posts"
      class="lg:not-last:border-r border-r card lg:not-first:border-l border-l border-t lg:border-t-0 border-b lg:border-b-0 border-(--line-b-color-dark) group/item"
      :key="index"
      orientation="vertical"
      variant="naked"
      v-bind="post"
      :ui="{
        image: 'p-1 group-hover/blog-post:scale-150',
      }"
      :to="post.path"
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
