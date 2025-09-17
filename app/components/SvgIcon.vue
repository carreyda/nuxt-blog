<template>
  <svg :class="['svg-icon', className]" aria-hidden="true">
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
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
