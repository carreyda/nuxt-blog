<template>
  <div class="carreyda-blog w-screen h-screen overflow-hidden flex flex-col">
    <CommonHeader />
    <main class="blog-main flex-1">
      <div class="github-snake">
        <!-- 利用github的代码提交记录绘制一个贪吃蛇小游戏 -->
        <!-- <div v-html="githubCommitDataSvg"></div> -->
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import CommonHeader from "@/components/common/CommonHeader.vue";
import { ref } from "vue";

// github提交记录数据
const githubCommitData = ref<any[]>([]);
const githubCommitDataLoading = ref<boolean>(true);
const githubCommitDataEmpty = ref<boolean>(true);
const cellSize = 10;
const cellGap = 2;
const cellColors = [
  "#ebedf0", // level 0 (no contributions)
  "#033a16", // level 1
  "#196c2e", // level 2
  "#2ea043", // level 3
  "#56d364", // level 4
];
const githubCommitDataSvg = ref<string>("");

// 发起请求获取github的代码提交记录
const getGithubCommitData = async () => {
  try {
    // 使用 allorigins 代理
    const proxyUrl = "https://api.allorigins.win/get?url=";
    const targetUrl =
      "https://github-user-contribution.platane.workers.dev/github-user-contribution/carreyda";
    const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`网络请求错误: ${response.status}`);
    }
    const actualData = JSON.parse(data.contents);
    githubCommitData.value = [...actualData];
    githubCommitDataLoading.value = false;
    renderGithubCommitData();
  } catch (error) {
    console.error("获取数据失败:", error);
  }
};

// 生成svg渲染github提交记录
const renderGithubCommitData = () => {
  if (!githubCommitData.value || githubCommitData.value.length === 0) {
    // 如果没有数据，直接返回
    githubCommitDataEmpty.value = true;
    return;
  }
  const maxWeek = Math.max(...githubCommitData.value.map((item) => item.x));
  const chartWidth = (maxWeek + 1) * (cellSize + cellGap) + 40;
  const chartHeight = 7 * (cellSize + cellGap) + 40;
  githubCommitDataSvg.value = `<svg width="${chartWidth}" height="${chartHeight}" viewBox="0 0 ${chartWidth} ${chartHeight}"><g transform="translate(40, 20)">`;
  githubCommitData.value.forEach((item) => {
    const x = item.x * (cellSize + cellGap);
    const y = item.y * (cellSize + cellGap) + 15;
    githubCommitDataSvg.value += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}"
          fill="${cellColors[item.level]}"
          rx="2" ry="2"
          class="contribution-cell ${item.eaten ? "eaten" : ""}"
          data-date="${item.date}"
          data-count="${item.count}"
          data-level="${item.level}"
          data-x="${item.x}"
          data-y="${item.y}"
          style="cursor: pointer;">
      </rect>`;
  });

  githubCommitDataSvg.value += ` </g></svg>`;
};

getGithubCommitData();
</script>

<style></style>
