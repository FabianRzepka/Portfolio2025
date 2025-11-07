<script setup lang="ts">
import * as nuxtUiLocales from "@nuxt/ui/locale";
const colorMode = useColorMode();

const color = computed(() =>
  colorMode.value === "dark" ? "#020618" : "white",
);

useHead({
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { key: "theme-color", name: "theme-color", content: color },
  ],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: {
    lang: "pl",
  },
});

useSeoMeta({
  titleTemplate: "%s - Portfolio",
  ogImage: "https://ui.nuxt.com/assets/templates/nuxt/portfolio-light.png",
  twitterImage: "https://ui.nuxt.com/assets/templates/nuxt/portfolio-light.png",
  twitterCard: "summary_large_image",
});

const [{ data: navigation }, { data: files }] = await Promise.all([
  useAsyncData(
    "navigation",
    () => {
      return Promise.all([queryCollectionNavigation("projects")]);
    },
    {
      transform: (data) => data.flat(),
    },
  ),
  useLazyAsyncData(
    "search",
    () => {
      return Promise.all([queryCollectionSearchSections("projects")]);
    },
    {
      server: false,
      transform: (data) => data.flat(),
    },
  ),
]);
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
        :files="files"
        :navigation="navigation"
        shortcut="meta_k"
        :colorMode="false"
        :links="navLinks"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
  </UApp>
</template>
