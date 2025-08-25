<script setup lang="ts">
import { ref, computed } from "vue";
import type { NavigationMenuItem } from "@nuxt/ui";
const colorMode = useColorMode();
console.log("colorMode:", colorMode);

const items = ref<NavigationMenuItem[]>([
  {
    label: "首页",
    icon: "i-lucide-home",
    to: "/",
    children: [],
  },
  {
    label: "文章",
    icon: "i-lucide-book-open",
    to: "/articles",
    children: [
      {
        label: "HTML",
        icon: "i-catppuccin-html",
        description: "",
        to: "/articles/html",
      },
      {
        label: "CSS",
        icon: "i-catppuccin-css",
        description: "",
        to: "/articles/css",
      },
      {
        label: "JavaScript",
        icon: "i-catppuccin-javascript",
        description: "",
        to: "/articles/js",
      },
      {
        label: "TypeScript",
        icon: "i-catppuccin-typescript",
        description: "",
        to: "/articles/html",
      },
      {
        label: "Vue",
        icon: "i-catppuccin-vue",
        description: "",
        to: "/articles/html",
      },
      {
        label: "React",
        icon: "i-catppuccin-javascript-react",
        description: "",
        to: "/articles/html",
      },
    ],
  },
  {
    label: "项目",
    icon: "i-lucide-projector",
    to: "/projects",
    children: [
      {
        label: "起点导航",
        icon: "i-streamline-ultimate-color:website-build",
        description: "",
        to: "/projects/start-navigation",
      },
      {
        label: "蓝图天气",
        icon: "i-streamline-ultimate-color:weather-sun",
        description: "",
        to: "/projects/blueprint-weather",
      },
      {
        label: "光明新闻",
        icon: "i-streamline-ultimate-color:newspaper-fold",
        description: "",
        to: "/",
      },
      {
        label: "幸运日历",
        icon: "i-streamline-ultimate-color:calendar-date",
        description: "",
        to: "/",
      },
      {
        label: "心弦音乐",
        icon: "i-streamline-ultimate-color:music-note-1",
        description: "",
        to: "/",
      },
      {
        label: "锦绣诗文",
        icon: "i-streamline-ultimate-color:book-open-bookmark",
        description: "",
        to: "/",
      },
    ],
  },
  {
    label: "工具",
    icon: "i-lucide-tool-case",
    to: "/tools",
    children: [],
  },
]);

// 当前是否暗色
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(_isDark) {
    colorMode.preference = _isDark ? "dark" : "light";
  },
});
</script>

<template>
  <header
    class="bg-default/75 backdrop-blur border-b border-default h-16 sticky top-0 z-50 common-header"
  >
    <div
      class="w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 h-full relative"
    >
      <a
        href="/"
        class="lg:flex-1 flex items-center gap-1.5 min-w-0 text-primary"
      >
        {{'<Carreyda />'}}
      </a>
      <div class="flex items-center justify-end lg:flex-1 gap-1.5">
        <ClientOnly v-if="!colorMode?.forced">
          <USwitch
            v-model="isDark"
            unchecked-icon="i-lucide-sun"
            checked-icon="i-lucide-moon"
          />
        </ClientOnly>
      </div>
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
