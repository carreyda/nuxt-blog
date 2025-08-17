<script setup lang="ts">
import { ref } from "vue";
import type { NavigationMenuItem } from "@nuxt/ui";

const items = ref<NavigationMenuItem[]>([
  {
    label: "首页",
    icon: "i-lucide-book-open",
    to: "/",
    children: [],
    active: true,
  },
  {
    label: "文章",
    icon: "i-lucide-database",
    to: "/articles",
    children: [],
  },
  {
    label: "项目",
    icon: "i-lucide-box",
    to: "/projects",
    children: [],
  },
  {
    label: "工具",
    icon: "i-lucide-box",
    to: "/tools",
    children: [],
  },
]);
</script>

<template>
  <UNavigationMenu :items="items" class="w-full justify-center common-header" />
</template>

<style lang="scss">
.common-header {
  width: 100vw;
  height: 60px;
  line-height: 60px;
}
</style>
