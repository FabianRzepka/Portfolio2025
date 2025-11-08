<script lang="ts" setup>
const { footer } = useAppConfig()
</script>

<template>
  <LineSpacer />
  <UFooter
    :ui="{
      container:
        ' lg:mx-auto border-x border-(--line-b-color-dark) relative overflow-hidden lg:overflow-visible font-mono',
      left: 'text-muted text-xs',
    }"
    class="bg-default z-10 px-4 lg:px-0"
  >
    <DotElement />
    <template #left>
      {{ footer.credits }}
    </template>

    <template #right>
      <template v-if="footer?.links">
        <UButton
          v-for="(link, index) of footer?.links"
          v-bind="{ size: 'xs', color: 'neutral', variant: 'ghost', ...link }"
          :key="index"
        />
      </template>
    </template>
  </UFooter>
</template>
