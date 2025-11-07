<script setup lang="ts">
const { footer } = useAppConfig();
</script>

<template>
  <div
    class="relative w-full before:border border-x-0 before:absolute before:inset-0 before:border-(--line-b-color-dark)"
  >
    <div
      class="max-w-6xl h-10 lg:h-20 mx-auto px-2 py-2 flex justify-between border border-(--line-b-color-dark)"
    ></div>
  </div>
  <UFooter
    class="z-10 bg-default"
    :ui="{
      container:
        'border-x border-(--line-b-color-dark) relative overflow-hidden lg:overflow-visible font-mono',
      left: 'text-muted text-xs',
    }"
  >
    <DotElement />
    <template #left>
      {{ footer.credits }}
    </template>

    <template #right>
      <template v-if="footer?.links">
        <UButton
          v-for="(link, index) of footer?.links"
          :key="index"
          v-bind="{ size: 'xs', color: 'neutral', variant: 'ghost', ...link }"
        />
      </template>
    </template>
  </UFooter>
</template>
