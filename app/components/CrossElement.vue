<script setup lang="ts">
withDefaults(
  defineProps<{
    isCross?: boolean;
    hideBottom?: boolean;
    hideTop?: boolean;
  }>(),
  {
    hideBottom: false,
    hideTop: false,
    isCross: false,
  },
);
</script>
<template>
  <div
    class="contents *:z-10 *:size-2 *:absolute *:border-persian-green-200 *:group-hover/item:size-4 *:transition-all *:duration-300 *:ease-in-out"
  >
    <!-- Cross corners -->
    <template v-if="isCross">
      <div
        v-show="!hideTop"
        class="border-t border-l -left-2 mt-px ml-px -top-2 rotate-180"
      />
      <div
        v-show="!hideTop"
        class="border-t border-r -right-2 mt-px mr-px -top-2 rotate-180"
      />
      <div
        v-show="!hideBottom"
        class="border-b border-l -left-2 ml-px mb-px -bottom-2 rotate-180"
      />
      <div
        v-show="!hideBottom"
        class="border-b border-r -right-2 mb-px mr-px -bottom-2 rotate-180"
      />
    </template>

    <!-- Normal corners -->
    <div v-show="!hideTop" class="border-t border-l left-0 top-0" />
    <div v-show="!hideTop" class="border-t border-r right-0 top-0" />
    <div v-show="!hideBottom" class="border-b border-l left-0 bottom-0" />
    <div v-show="!hideBottom" class="border-b border-r right-0 bottom-0" />
  </div>
</template>
