<template>
  <div
    class="blueprint-weather w-screen h-screen justify-center items-center overflow-hidden"
  >
    <div class="flex items-center justify-center w-full min-h-screen"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getWeather } from "../../../../apis/weather";
import { generateJWT } from "@/services/tokenService";
import { changeTheme } from "@/utils";

// 获取天气数据
const weatherToken = ref("");
const createToken = async () => {
  const token = await generateJWT();
  weatherToken.value = token;
  window.localStorage.setItem("blueprint-weather-token", token);
  getWeatherData();
};
const getWeatherData = () => {
  getWeather
    .get(
      {}, // query参数
      {
        Authorization: `Bearer ${weatherToken.value}`, // 添加Authorization头
      }
    )
    .then((res) => {
      if (typeof res === "object" && res?.status === 401) {
        // 401 未授权处理
        createToken();
      }
    })
    .catch((err) => {
      console.error("请求失败:", err);
    });
};

onMounted(() => {
  // 蓝图天气默认切换为橙色主题
  changeTheme("orange");
  weatherToken.value =
    window.localStorage.getItem("blueprint-weather-token") || "";
  getWeatherData();
});
</script>
