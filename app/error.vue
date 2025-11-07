<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps({
  error: {
    type: Object as PropType<NuxtError>,
    required: true,
  },
});

useHead({
  htmlAttrs: {
    lang: "en",
  },
});

useSeoMeta({
  title: "Strona nie znaleziona",
  description: "Przykro mi, ale ta strona nie mogła zostać znaleziona.",
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
  <div>
    <AppHeader :links="navLinks" />

    <UMain>
      <UContainer>
        <UPage>
          <UError :error="error" />
        </UPage>
      </UContainer>
    </UMain>

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        shortcut="meta_k"
        :navigation="navigation"
        :links="navLinks"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>

    <UToaster />
  </div>
</template>
