<script lang="ts" setup>
const { data: page } = await useAsyncData('project-page', () => {
  return queryCollection('pages').path('/projects').first()
})
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
  <UPage v-if="page">
    <UPageHero
      :description="page.description"
      :title="page.title"
      :ui="{
        title: '!mx-0 text-left',
        description: '!mx-0 text-left',
        links: 'justify-start',
      }"
    >
      <!-- <template #links>
        <div v-if="page.links" class="flex items-center gap-2">
          <UButton
            :label="page.links[0]?.label"
            :to="global.meetingLink"
            v-bind="page.links[0]"
          />
          <UButton :to="`mailto:${global.email}`" v-bind="page.links[1]" />
        </div>
      </template> -->
    </UPageHero>
    <UPageSection
      :ui="{
        container: '!pt-0',
      }"
    >
      <UBlogPosts orientation="vertical">
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
              root: 'md:grid md:grid-cols-2 group overflow-visible transition-all duration-300',
              image: 'group-hover/blog-post:scale-105 rounded-lg shadow-lg border-4 border-muted ring-2 ring-default',
              header: index % 2 === 0 ? 'sm:-rotate-1 overflow-visible' : 'sm:rotate-1 overflow-visible',
            }"
            orientation="horizontal"
            variant="naked"
          />
        </Motion>
      </UBlogPosts>
    </UPageSection>
  </UPage>
</template>
