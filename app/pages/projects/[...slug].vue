<script setup lang="ts">
import type { ContentNavigationItem } from "@nuxt/content";
import { mapContentNavigation } from "@nuxt/ui/utils/content";
import { findPageBreadcrumb } from "@nuxt/content/utils";

const route = useRoute();

const { data: page } = await useAsyncData(route.path, () =>
  queryCollection("projects").path(route.path).first(),
);
if (!page.value)
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
const { data: surround } = await useAsyncData(`${route.path}-surround`, () =>
  queryCollectionItemSurroundings("projects", route.path, {
    fields: ["description"],
  }),
);

const navigation = inject<Ref<ContentNavigationItem[]>>("navigation", ref([]));
console.log(navigation.value);
const blogNavigation = computed(
  () =>
    navigation.value.find((item) => item.path === "/projects")?.children || [],
);

const breadcrumb = computed(() =>
  mapContentNavigation(
    findPageBreadcrumb(blogNavigation?.value, page.value?.path),
  ).map(({ icon, ...link }) => link),
);

if (page.value.image) {
  defineOgImage({ url: page.value.image });
} else {
  defineOgImageComponent(
    "Project",
    {
      headline: breadcrumb.value.map((item) => item.label).join(" > "),
    },
    {
      fonts: ["Geist:400", "Geist:600"],
    },
  );
}

const title = page.value?.seo?.title || page.value?.title;
const description = page.value?.seo?.description || page.value?.description;

useSeoMeta({
  title,
  description,
  ogDescription: description,
  ogTitle: title,
});

const articleLink = computed(() => `${window?.location}`);

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
</script>

<template>
  <div
    class="pt-20 lg:pt-20 before:border before:pointer-events-none before:border-x-0 before:absolute before:inset-0 before:border-(--line-b-color-dark) relative"
  >
    <div
      class="absolute m-auto inset-x-4 top-0 lg:max-w-6xl border-(--line-b-color-dark) border-x pointer-events-none h-full lg-max:hidden"
    ></div>
    <div class="border-t border-(--line-b-color-dark) z-10">
      <div
        class="px-4 lg:px-0 lg:max-w-6xl mx-auto flex justify-between items-center relative font-mono"
      >
        <UButton
          size="md"
          icon="lucide:arrow-left"
          variant="link"
          color="primary"
          to="/projects"
          class="cursor-pointer pr-4 border-r border-(--line-b-color-dark) h-full text-xs uppercase"
        >
          Projekty
        </UButton>
        <UButton
          class="cursor-pointer border-l pl-4 border-(--line-b-color-dark) text-xs uppercase"
          size="md"
          icon="lucide:clipboard-copy"
          variant="link"
          color="primary"
          label="Kopiuj link"
          @click="copyToClipboard(articleLink, 'Link projektu skopiowany')"
        />
      </div>
    </div>
  </div>

  <UMain
    class="lg:m-0 mx-4 lg:max-w-6xl lg:mx-auto border-x border-(--line-b-color-dark) min-h-screen"
  >
    <div
      v-if="page"
      class="flex relative flex-col gap-3 overflow-hidden border-b border-(--line-b-color-dark) pt-20"
    >
      <CrossElement />
      <div class="gradient-overlay absolute -top-50 opacity-50" />
      <h1 class="text-4xl text-center font-medium max-w-3xl mx-auto">
        {{ page.title }}
      </h1>
      <p class="text-muted text-center max-w-2xl mx-auto">
        {{ page.description }}
      </p>
      <div class="flex text-xs text-muted items-center justify-center gap-2">
        <span v-if="page.date">
          {{ formatDate(page.date) }}
        </span>
      </div>

      <div class="grid gap-4 grid-flow-col justify-center mb-10">
        <UBadge v-for="tag in page.tags" color="primary" variant="subtle">{{
          tag
        }}</UBadge>
      </div>
    </div>
    <NuxtImg
      v-if="page"
      :src="page.image"
      :alt="page.title"
      class="w-full m-auto object-fit object-center border-b border-(--line-b-color-dark)"
    />
    <UContainer class="relative">
      <UPage v-if="page">
        <UPageBody class="max-w-3xl mx-auto">
          <ContentRenderer v-if="page.body" :value="page" />
        </UPageBody>
      </UPage>
    </UContainer>
  </UMain>
  <!-- Webiste preview banner -->
  <div v-if="page?.link" class="border-t border-(--line-b-color-dark) relative">
    <div class="max-w-6xl mx-auto relative">
      <div class="gradient-overlay -top-50 opacity-50"></div>
      <div
        class="flex lg:max-w-full mx-4 lg:mx-auto justify-center relative border-x border-(--line-b-color-dark) before:border before:pointer-events-none before:border-x-0 before:absolute before:inset-y-16 before:inset-x-0 before:border-(--line-b-color-dark)"
      >
        <CrossElement is-cross />
        <div class="absolute top-6 z-10 pointer-events-none">
          <MonoBagde>
            <span class="text-xs text-zinc-300 uppercase">
              Zobacz stronę na żywo
            </span>
          </MonoBagde>
        </div>
        <div class="py-16 border-x relative border-default">
          <div class="p-5.5 relative">
            <DotElement />
            <UButton
              class="relative cursor-pointer"
              color="neutral"
              size="xl"
              variant="outline"
              target="_blank"
              :to="page.link"
              icon="lucide:external-link"
            >
              <CrossElement />
              Link do strony</UButton
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="relative w-full before:border-t before:absolute before:inset-0 before:border-(--line-b-color-dark)"
  >
    <div
      class="mx-4 lg:max-w-6xl border-x border-t border-(--line-b-color-dark) h-10 lg:h-20 lg:mx-auto flex justify-center items-center pointer-events-none"
    >
      <MonoBagde>
        <span class="text-xs text-zinc-300 uppercase">/ Nawigacja /</span>
      </MonoBagde>
    </div>
  </div>
  <div
    class="border-t border-(--line-b-color-dark) overflow-hidden lg:overflow-visible"
  >
    <div class="mx-4 lg:max-w-6xl relative lg:mx-auto">
      <UContentSurround
        :ui="{
          root: 'gap-4 p-2 lg:p-0 lg:gap-0 border-x border-(--line-b-color-dark) ',
          link: 'lg:border-0 lg:gap-0 lg:first:border-r-1 ',
        }"
        :surround
      />
    </div>
  </div>
  <div
    class="fixed left-10 top-1/2 -translate-y-1/2 z-40 xl:block hidden opacity-100 translate-x-0"
  >
    <UContentToc
      highlight
      highlight-color="neutral"
      :links="page?.body?.toc?.links"
    />
  </div>
</template>
