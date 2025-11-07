<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

defineProps<{
  links: NavigationMenuItem[];
}>();
</script>

<template>
  <div
    class="fixed top-2 sm:top-4 mx-auto left-1/2 transform -translate-x-1/2 z-10 group/item"
  >
    <div
      class="*:z-10 *:size-2 *:absolute *:border-persian-green-200 *:group-hover/item:scale-130 *:transition-all *:duration-300 *:ease-in-out"
    >
      <div class="border-t border-l left-0 top-0"></div>
      <div class="border-t border-r right-0 top-0"></div>
      <div class="border-b border-l left-0 bottom-0"></div>
      <div class="border-b border-r right-0 bottom-0"></div>
    </div>

    <UNavigationMenu
      :items="links"
      variant="link"
      color="neutral"
      class="header-nav font-mono backdrop-filter backdrop-blur-[10px] lg:min-w-2xl w-full px-2 sm:px-4 border border-muted/50 shadow-lg shadow-neutral-950/5"
      :ui="{
        link: 'px-2 py-1',
      }"
    >
      <template #list-trailing>
        <UContentSearchButton />
      </template>
    </UNavigationMenu>
  </div>
</template>
<style>
.header-nav {
  background: linear-gradient(0deg, #ebeafb00, #eaf3fb0d), #18181bd4;
  box-shadow: 1px 1px #9df1fc33 inset;
}
</style>
