<script lang="ts" setup>
interface Post {
  coverImage: string
  images: string[]
  title: string
}

const { post } = defineProps<{ post: Post}>()

const emit = defineEmits<{ close: [boolean] }>()
</script>

<template>
  <UModal

      :close="{ onClick: () => emit('close', true) }"
    :title="post.title"
    :ui="{
      content: 'max-w-4xl sm:max-h-[calc(100dvh-1rem)]',
    }"
  >
    <template #body>
      <CrossElement />
      <div class="mb-10 flex">
        <UCarousel
          v-slot="{ item }"
          :items="[post.coverImage, ...post.images]"
          arrows
          dots
          class="mx-auto w-full max-w-lg"
        >
          <img :src="item" loading="eager" class="w-full rounded-lg" />
        </UCarousel>
      </div>
    </template>
  </UModal>
</template>
