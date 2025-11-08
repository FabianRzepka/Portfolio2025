<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui'

defineProps<{
  links: NavigationMenuItem[]
}>()
</script>

<template>
  <div class="group/item fixed top-2 left-1/2 z-10 mx-auto -translate-x-1/2 transform sm:top-4">
    <div
      class="*:border-persian-green-200 *:absolute *:z-10 *:size-2 *:transition-all *:duration-300 *:ease-in-out *:group-hover/item:scale-130"
    >
      <div class="top-0 left-0 border-t border-l"></div>
      <div class="top-0 right-0 border-t border-r"></div>
      <div class="bottom-0 left-0 border-b border-l"></div>
      <div class="right-0 bottom-0 border-r border-b"></div>
    </div>

    <UNavigationMenu
      :items="links"
      :ui="{
        link: 'px-2 py-1',
      }"
      color="neutral"
      variant="link"
      class="header-nav border-muted/50 w-full border px-2 font-mono shadow-lg shadow-neutral-950/5 backdrop-blur-[10px] backdrop-filter sm:px-4 lg:min-w-2xl"
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
