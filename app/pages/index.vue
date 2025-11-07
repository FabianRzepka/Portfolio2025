<script setup lang="ts">
const { data: page } = await useAsyncData("index", () => {
  return queryCollection("index").first();
});
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found [ERROR]",
    fatal: true,
  });
}

useSeoMeta({
  title: page.value?.seo.title || page.value?.title,
  ogTitle: page.value?.seo.title || page.value?.title,
  description: page.value?.seo.description || page.value?.description,
  ogDescription: page.value?.seo.description || page.value?.description,
});
</script>

<template>
  <UPage v-if="page">
    <LandingHero :page />
    <div
      class="relative w-full before:border border-x-0 before:absolute before:inset-0 before:border-(--line-b-color-dark)"
    >
      <div
        class="mx-4 lg:max-w-6xl h-10 lg:h-14 lg:mx-auto px-2 py-2 flex justify-between border border-(--line-b-color-dark)"
      ></div>
    </div>
    <div
      class="w-full max-w-6xl mx-auto relative justify-center items-center grid lg:grid-cols-2 gap-4 lg:gap-4 px-4 lg:px-0"
    >
      <div
        class="absolute inset-x-4 lg:inset-0 lg:w-full lg:max-w-6xl border-(--line-b-color-dark) border-x border-accent-3 pointer-events-none h-full lg-max:hidden"
      ></div>
      <LandingAbout
        class="border-r border-l border-b lg:border-b-0 lg:border-l-0 border-(--line-b-color-dark) p-4 h-full transition-all ease-in-out duration-200 hover:bg-persian-green-500/5 group/item"
        :page
      />
      <LandingWorkExperience
        class="border-l border-t border-r lg:border-t-0 lg:border-r-0 border-(--line-b-color-dark) p-4 h-full transition-all ease-in-out duration-200 hover:bg-persian-green-500/5 group/item"
        :page
      />
    </div>
    <div
      class="relative w-full before:border border-x-0 before:absolute before:inset-0 before:border-(--line-b-color-dark)"
    >
      <div
        class="max-w-6xl h-10 lg:h-14 mx-auto px-2 py-2 flex justify-between border border-(--line-b-color-dark)"
      ></div>
    </div>
    <div
      class="w-full border-x border-(--line-b-color-dark) max-w-6xl mx-auto relative"
    >
      <div class="gradient-overlay -top-50"></div>
      <LazyLandingBlog :page />
    </div>

    <!-- <LandingTestimonials :page /> -->
    <!-- <LandingFAQ :page /> -->
  </UPage>
</template>
