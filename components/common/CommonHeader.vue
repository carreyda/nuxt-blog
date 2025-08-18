<script setup lang="ts">
import { ref } from "vue";
import type { NavigationMenuItem } from "@nuxt/ui";

const items = ref<NavigationMenuItem[]>([
  {
    label: "首页",
    icon: "i-lucide-home",
    to: "/",
    children: [],
    active: true,
  },
  {
    label: "文章",
    icon: "i-lucide-book-open",
    to: "/articles",
    children: [
      {
        label: "HTML",
        icon: "i-catppuccin-html",
        description: "HTML相关的文章",
        to: "/articles/html",
      },
      {
        label: "CSS",
        icon: "i-catppuccin-css",
        description: "CSS相关的文章",
        to: "/articles/css",
      },
      {
        label: "JavaScript",
        icon: "i-catppuccin-javascript",
        description: "JavaScript相关的文章",
        to: "/articles/js",
      },
      {
        label: "TypeScript",
        icon: "i-catppuccin-typescript",
        description: "TypeScript相关的文章",
        to: "/articles/html",
      },
      {
        label: "Vue",
        icon: "i-catppuccin-vue",
        description: "Vue相关的文章",
        to: "/articles/html",
      },
      {
        label: "React",
        icon: "i-catppuccin-javascript-react",
        description: "React相关的文章",
        to: "/articles/html",
      },
    ],
  },
  {
    label: "项目",
    icon: "i-lucide-projector",
    to: "/projects",
    children: [],
  },
  {
    label: "工具",
    icon: "i-lucide-tool-case",
    to: "/tools",
    children: [],
  },
]);
</script>

<template>
  <header
    class="bg-default/75 backdrop-blur border-b border-default h-16 sticky top-0 z-50 common-header"
  >
    <div
      class="w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 h-full relative"
    >
      <div class="lg:flex-1 flex items-center gap-1.5 min-w-0">凯锐的博客</div>
      <div class="flex items-center justify-end lg:flex-1 gap-1.5">关于我</div>
    </div>
    <UNavigationMenu
      :items="items"
      class="justify-center h-16 absolute top-0 left-1/2 header-nav"
    />
  </header>
</template>

<style lang="scss">
.common-header {
  .header-nav {
    transform: translate(-50%, 0);
  }
}
</style>
