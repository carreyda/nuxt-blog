<template>
  <div class="w-screen h-screen overflow-hidden flex flex-col start-navigation">
    <header class="w-screen h-16 navigation-header">
      <UContainer>
        <div class="flex items-center header-content">
          <SvgIcon name="start-navigation-logo" />
          <p>起点导航</p>
        </div></UContainer
      >
    </header>
    <main class="flex-1 pt-4 navigation-main">
      <UContainer>
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
                <div class="list-wrap flex flex-wrap">
                  <NuxtLink
                    v-for="el in sub?.children"
                    :key="el.name"
                    class="middle-card"
                    :to="el.url"
                    target="_blank"
                  >
                    <div class="">
                      <img :src="el.icon" alt="" />
                      <p>{{ el.name }}</p>
                    </div>
                  </NuxtLink>
                </div>
              </div>
              <div v-else class="list-wrap flex">
                <NuxtLink class="middle-card" :to="sub.url" target="_blank">
                  <div class="">
                    <img :src="sub.icon" alt="" />
                    <p>{{ sub.name }}</p>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import bookmarks from "@/app/assets/data/bookmarks.json";

const bookmarksData = computed(() => bookmarks);
</script>

<style lang="scss" scoped>
.middle-card {
  background: #fbfafa;
  border: 1px solid #dee3e3;
  border-radius: 8px;
  box-sizing: border-box;
  color: #163e40;
  cursor: pointer;
  font-family: mengyuan;
  font-size: 18px;
  height: 88px;
  letter-spacing: 0;
  padding: 16px 24px;
  position: relative;
  text-decoration: none;
  transition: all 0.3s linear;
  width: 297px;
  margin: 10px;
  img {
    width: 32px;
    height: 32px;
  }
}
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
