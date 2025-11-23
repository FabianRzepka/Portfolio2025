<script lang="ts" setup>
withDefaults(
  defineProps<{
    isCross?: boolean
    hideBottom?: boolean
    hideTop?: boolean
  }>(),
  {
    hideBottom: false,
    hideTop: false,
    isCross: false,
  },
)
</script>
<template>
  <div
    class="*:border-persian-green-200 contents *:absolute *:z-2 *:size-2 *:transition-all *:duration-300 *:ease-in-out *:group-hover/item:size-4"
  >
    <!-- Cross corners -->
    <template v-if="isCross">
      <div v-show="!hideTop" class="-top-2 -left-2 mt-px ml-px rotate-180 border-t border-l" />
      <div v-show="!hideTop" class="-top-2 -right-2 mt-px mr-px rotate-180 border-t border-r" />
      <div v-show="!hideBottom" class="-bottom-2 -left-2 mb-px ml-px rotate-180 border-b border-l" />
      <div v-show="!hideBottom" class="-right-2 -bottom-2 mr-px mb-px rotate-180 border-r border-b" />
    </template>

    <!-- Normal corners -->
    <div v-show="!hideTop" class="top-0 left-0 border-t border-l" />
    <div v-show="!hideTop" class="top-0 right-0 border-t border-r" />
    <div v-show="!hideBottom" class="bottom-0 left-0 border-b border-l" />
    <div v-show="!hideBottom" class="right-0 bottom-0 border-r border-b" />
  </div>
</template>
