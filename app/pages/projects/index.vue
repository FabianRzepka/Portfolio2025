<script lang="ts" setup>
const { data: page } = await useAsyncData('project-page', () => {
  return queryCollection('pages').path('/projects').first()
})

console.log(page)
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  })
}
const { data: posts } = await useAsyncData('blogs', () => queryCollection('projects').order('date', 'DESC').all())
if (!posts.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'projects posts not found',
    fatal: true,
  })
}
useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description,
})
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
    <Motion
      v-for="(post, index) in posts"
      :in-view-options="{ once: true }"
      :initial="{ opacity: 0, transform: 'translateY(10px)' }"
      :key="index"
      :transition="{ delay: 0.2 * index }"
      :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
    >
      <UBlogPost
        v-bind="post"
        :to="post.path"
        :ui="{
          root: 'md:grid md:grid-cols-2 group overflow-hiden transition-all duration-300 bg-zinc-800/20',
          image:
            'group-hover/blog-post:scale-105 rounded-lg shadow-lg border-4 border-muted border-0 border-r-1 border-(--line-b-color-dark) ring-default',
        }"
        orientation="horizontal"
        variant="naked"
      />
      <LineSpacer v-if="posts && index !== posts.length - 1" :inner-border="false" />
    </Motion>
  </UMain>
</template>
