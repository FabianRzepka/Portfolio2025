<script lang="ts" setup>
import * as nuxtUiLocales from '@nuxt/ui/locale'
const colorMode = useColorMode()

const color = computed(() => (colorMode.value === 'dark' ? '#020618' : 'white'))

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0' },
    { key: 'theme-color', name: 'theme-color', content: color },
  ],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: {
    lang: 'pl',
  },
})

useSeoMeta({
  titleTemplate: '%s - Portfolio',
  twitterCard: 'summary_large_image',
})

const [{ data: navigation }, { data: files }] = await Promise.all([
  useAsyncData(
    'navigation',
    () => {
      return Promise.all([queryCollectionNavigation('projects')])
    },
    {
      transform: (data) => data.flat(),
    },
  ),
  useLazyAsyncData(
    'search',
    () => {
      return Promise.all([queryCollectionSearchSections('projects')])
    },
    {
      server: false,
      transform: (data) => data.flat(),
    },
  ),
])
</script>

<template>
  <UApp :locale="nuxtUiLocales['pl']">
    <NuxtLayout>
      <UMain class="relative">
        <NuxtPage />
      </UMain>
    </NuxtLayout>
    <ClientOnly>
      <LazyUContentSearch
        :colorMode="false"
        :files="files"
        :fuse="{ resultLimit: 42 }"
        :links="navLinks"
        :navigation="navigation"
        shortcut="meta_k"
      />
    </ClientOnly>
  </UApp>
</template>
