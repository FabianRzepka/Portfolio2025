<script lang="ts" setup>
import { motion } from 'motion-v'
import type { ContentNavigationItem } from '@nuxt/content'
import { mapContentNavigation } from '@nuxt/ui/utils/content'
import { findPageBreadcrumb } from '@nuxt/content/utils'

const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => queryCollection('projects').path(route.path).first())
if (!page.value)
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  })
const { data: surround } = await useAsyncData(`${route.path}-surround`, () =>
  queryCollectionItemSurroundings('projects', route.path, {
    fields: ['description'],
  }),
)

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation', ref([]))
const blogNavigation = computed(() => navigation.value.find((item) => item.path === '/projects')?.children || [])

const breadcrumb = computed(() =>
  mapContentNavigation(findPageBreadcrumb(blogNavigation?.value, page.value?.path)).map(({ icon, ...link }) => link),
)

if (page.value.image) {
  defineOgImage({ url: page.value.image })
} else {
  defineOgImageComponent(
    'Project',
    {
      headline: breadcrumb.value.map((item) => item.label).join(' > '),
    },
    {
      fonts: ['Geist:400', 'Geist:600'],
    },
  )
}

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  description,
  ogDescription: description,
  ogTitle: title,
})

const articleLink = computed(() => `${window?.location}`)

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>

<template>
  <AppHeaderSpacer>
    <UButton
      color="primary"
      icon="lucide:arrow-left"
      size="md"
      to="/projects"
      variant="link"
      class="h-full cursor-pointer border-r border-(--line-b-color-dark) pr-4 text-xs uppercase"
    >
      Projekty
    </UButton>
    <div class="flex h-full w-full"></div>
    <UButton
      @click="copyToClipboard(articleLink, 'Link projektu skopiowany')"
      color="primary"
      icon="lucide:clipboard-copy"
      label="Kopiuj link"
      size="md"
      variant="link"
      class="cursor-pointer border-l border-(--line-b-color-dark) pl-4 text-xs uppercase"
    />
  </AppHeaderSpacer>
  <UMain class="mx-4 min-h-screen border-x border-(--line-b-color-dark) lg:m-0 lg:mx-auto lg:max-w-6xl">
    <div v-if="page" class="relative flex flex-col gap-3 overflow-hidden border-b border-(--line-b-color-dark) pt-20">
      <CrossElement />
      <motion.div
        :initial="{ opacity: 0, scale: 0.95 }"
        :while-in-view="{ opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } }"
        class="gradient-overlay absolute -top-50 opacity-50"
      />

      <h1 class="mx-auto max-w-3xl text-center text-3xl font-medium lg:text-4xl">
        {{ page.title }}
      </h1>
      <p class="text-muted mx-auto max-w-2xl text-center">
        {{ page.description }}
      </p>
      <div class="text-muted flex items-center justify-center gap-2 text-xs">
        <span v-if="page.date">
          {{ formatDate(page.date) }}
        </span>
      </div>

      <div class="mb-10 grid grid-flow-col justify-center gap-4">
        <UBadge v-for="tag in page.tags" color="primary" variant="subtle">{{ tag }}</UBadge>
      </div>
    </div>
    <NuxtImg
      v-if="page"
      :alt="page.title"
      :src="page.image"
      class="object-fit m-auto w-full border-b border-(--line-b-color-dark) object-center"
    />
    <UContainer class="relative">
      <UPage v-if="page">
        <UPageBody class="mx-auto max-w-3xl">
          <ContentRenderer v-if="page.body" :value="page" />
        </UPageBody>
      </UPage>
    </UContainer>
  </UMain>
  <!-- Webiste preview banner -->
  <div v-if="page?.link" class="relative border-t border-(--line-b-color-dark)">
    <div class="relative mx-auto max-w-6xl">
      <div class="gradient-overlay -top-50 opacity-50"></div>
      <div
        class="relative mx-4 flex justify-center border-x border-(--line-b-color-dark) before:pointer-events-none before:absolute before:inset-x-0 before:inset-y-16 before:border before:border-x-0 before:border-(--line-b-color-dark) lg:mx-auto lg:max-w-full"
      >
        <CrossElement is-cross />
        <div class="pointer-events-none absolute top-6 z-10">
          <MonoBagde>
            <span class="text-xs text-zinc-300 uppercase">Zobacz stronę na żywo</span>
          </MonoBagde>
        </div>
        <div class="border-default relative border-x py-16">
          <div class="relative p-5.5">
            <DotElement />
            <UButton
              :to="page.link"
              color="neutral"
              icon="lucide:external-link"
              size="xl"
              target="_blank"
              variant="outline"
              class="relative cursor-pointer"
            >
              <CrossElement />
              Link do strony
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="relative w-full before:absolute before:inset-0 before:border-t before:border-(--line-b-color-dark)">
    <div
      class="pointer-events-none mx-4 flex h-10 items-center justify-center border-x border-t border-(--line-b-color-dark) lg:mx-auto lg:h-20 lg:max-w-6xl"
    >
      <MonoBagde>
        <span class="text-xs text-zinc-300 uppercase">/ Nawigacja /</span>
      </MonoBagde>
    </div>
  </div>
  <div class="overflow-hidden border-t border-(--line-b-color-dark) lg:overflow-visible">
    <div class="relative mx-4 lg:mx-auto lg:max-w-6xl">
      <UContentSurround
        :surround
        :ui="{
          root: 'gap-4 p-2 lg:p-0 lg:gap-0 border-x border-(--line-b-color-dark) ',
          link: 'lg:border-0 lg:gap-0 lg:first:border-r-1 ',
        }"
      />
    </div>
  </div>
  <div class="fixed top-1/2 left-10 z-40 hidden translate-x-0 -translate-y-1/2 opacity-100 xl:block">
    <UContentToc :links="page?.body?.toc?.links" highlight highlight-color="neutral" />
  </div>
</template>
