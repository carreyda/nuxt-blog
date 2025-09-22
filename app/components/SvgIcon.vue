<template>
  <svg :class="['svg-icon w-4 h-4', className]" aria-hidden="true">
    <use :href="`#icon-${name}`" />
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  name: string;
  className?: string;
}>();
</script>

<style scoped>
.svg-icon {
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
