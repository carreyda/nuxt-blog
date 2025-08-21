<template>
  <div>
    <header>起点导航</header>
    <main>
      <div>
        <div v-for="item in bookmarksData" :key="item.name">
          {{ item.name }}
          <div v-for="sub in item.children" :key="sub.name">
            <div v-if="sub.children.length > 0">
              <div v-for="el in sub.children" :key="el.name">
                {{ el.name }}
              </div>
            </div>
            <div v-else>{{ sub.name }}</div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import bookmarks from "@/assets/data/bookmarks.json";

const bookmarksData = computed(() => bookmarks);
</script>
