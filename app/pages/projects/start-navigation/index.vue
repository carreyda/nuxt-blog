<template>
  <div>
    <header class="navigation-header">起点导航</header>
    <main class="navigation-main">
      <div class="mian-card-list">
        <div
          v-for="item in bookmarksData"
          :key="item.name"
          class="list-classification"
        >
          <p class="classification-first-title">{{ item.name }}</p>
          <div v-for="sub in item.children" :key="sub.name">
            <div v-if="item.multiLevel">
              <p>{{ sub.name }}</p>
              <div class="list-wrap flex">
                <div v-for="el in sub?.children" :key="el.name" class="card">
                  <div class="card-content">
                    <p>{{ el.name }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="list-wrap flex">
              <div class="card">
                <p>{{ sub.name }}</p>
              </div>
            </div>
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

<style>
.card {
  width: 300px;
  height: 150px;
  margin: 0 24px 32px 0;
  padding: 1px;
  position: relative;
  box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.06);
  background: linear-gradient(180deg, #fafafa, #ebedf0);
  border-radius: 8px;
  cursor: pointer;
  transition: box-shadow 0.2s linear;
}
.card-content {
  width: 100%;
  height: 200px;
  background: linear-gradient(rgb(255, 240, 240) 0%, rgb(250, 250, 250) 100%);
  background: linear-gradient(rgb(229, 255, 247) 0%, rgb(250, 250, 250) 100%);
  background: linear-gradient(rgb(240, 246, 255) 0%, rgb(250, 250, 250) 100%);
  background: linear-gradient(rgb(249, 240, 255) 0%, rgb(250, 250, 250) 100%);
  background: linear-gradient(rgb(250, 244, 222) 0%, rgb(250, 250, 250) 100%);
}
</style>
