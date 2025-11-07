<script setup lang="ts"></script>

<template>
  <div>
    <div class="w-full max-w-full mx-auto sm:border-x border-default">
      <AppHeader :links="navLinks" />
      <slot />
      <AppFooter />
    </div>
  </div>
</template>
