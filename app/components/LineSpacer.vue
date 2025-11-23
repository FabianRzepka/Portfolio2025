<script lang="ts" setup>
withDefaults(
  defineProps<{
    lineBg?: boolean
    innerBorder?: boolean
  }>(),
  {
    lineBg: true,
    innerBorder: true,
  },
)
</script>
<template>
  <div
    class="relative w-full border-x-0 before:absolute before:inset-0 before:border-y before:border-(--line-b-color-dark)"
  >
    <div
      class="h-14 p-1.5 lg:mx-auto lg:max-w-6xl"
      :class="{ 'mx-4 border border-(--line-b-color-dark)': innerBorder }"
    >
      <div class="line-bg flex size-full" :class="{ 'line-bg': lineBg }"></div>
    </div>
  </div>
</template>
<style scoped>
.line-bg {
  --line: var(--line-b-color-dark);
  --bg: transparent;
  opacity: 0.3;
  background: repeating-linear-gradient(45deg, var(--line), var(--line) 2px, var(--bg) 2px, var(--bg) 9px);
}
</style>
