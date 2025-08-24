<template>
  <div class="weather-layout"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getWeather } from "../../../../apis/weather";
import { generateJWT } from "@/services/tokenService";

// 获取天气数据
const weatherToken = ref("");
const createToken = async () => {
  const token = await generateJWT();
  weatherToken.value = token;
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
    .then((res: any) => {
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
  getWeatherData();
});
</script>
