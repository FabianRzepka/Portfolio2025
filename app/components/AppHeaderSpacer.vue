<template>
  <div
    class="relative pt-20 before:pointer-events-none before:absolute before:inset-0 before:border before:border-x-0 before:border-(--line-b-color-dark) lg:pt-20"
  >
    <div
      class="lg-max:hidden pointer-events-none absolute inset-x-4 top-0 m-auto h-full border-x border-(--line-b-color-dark) lg:max-w-6xl"
    ></div>
    <div class="z-10 border-t border-(--line-b-color-dark)">
      <div class="relative mx-auto flex items-center justify-between px-4 font-mono lg:max-w-6xl lg:px-0">
        <slot />
      </div>
    </div>
  </div>
</template>
