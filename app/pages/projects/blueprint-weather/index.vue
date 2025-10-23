<template>
  <div
    class="flex flex-col items-center justify-center w-screen h-screen overflow-hidden blueprint-weather"
  >
    <UHeader class="w-full weather-header">
      <template #title>
        <SvgIcon name="blueprint-weather-logo-1" class-name="block w-12 h-12" />
        <h3 class="font-bold leading-10">蓝图天气</h3>
      </template>
      <div class="flex">
        <p>首页</p>
        <p>7日预报</p>
        <p>30日预报</p>
        <p>切换城市</p>
      </div>
      <template #right>
        <UColorModeButton />
        <UPopover>
          <UAvatar
            src="https://api.dicebear.com/9.x/adventurer/svg"
            size="xl"
          />
          <template #content>
            <div class="h-14 ml-3 slogan-text">
              <p class="h-1/2">Hello,</p>
              <p class="h-1/2 font-bold">Carreyda</p>
            </div>
          </template>
        </UPopover>
      </template>
    </UHeader>
    <UContainer class="flex-1">
      <main class="weather-main">
        <UCard class="mt-8" variant="subtle">
          <img
            class="block w-32 h-32 m-auto rounded-full"
            :src="`https://a.hecdn.net/img/common/icon/202106d/${weatherData?.icon}.png`"
            alt=""
            referrerpolicy="no-referrer"
          />
          <div>
            <p class="flex w-fit mb-4 items-center">
              <SvgIcon
                name="blueprint-weather-location"
                class-name="w-8 h-8 m-auto mr-4 card-svg"
              />
              武汉
            </p>
            <p class="flex w-fit mb-4 items-center" @click="getWeatherData">
              <SvgIcon
                name="blueprint-weather-refresh"
                class-name="w-8 h-8 m-auto mr-4 current-pointer card-svg"
              />更新时间：{{
                dayjs(weatherData?.obsTime).format("YYYY-MM-DD HH:mm")
              }}
            </p>
            <p class="flex w-fit mb-4 items-center">
              <SvgIcon
                name="blueprint-weather-thermometer"
                class-name="w-8 h-8 m-auto card-svg"
              />
              <span class="font-bold text-[32px]"
                >{{ weatherData?.temp }}℃</span
              >
            </p>
          </div>
        </UCard>
      </main>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import dayjs from "dayjs";
import { getWeather } from "@/services/apis/weather";
import { generateJWT } from "@/services/tokenService";
import { changeTheme, judgeProtocol } from "@/app/utils";
import "qweather-icons/font/qweather-icons.css";

interface WeatherResponseDataNow {
  obsTime: string;
  temp: string;
  feelsLike: string;
  icon: string;
  text: string;
  wind360: string;
  windDir: string;
  windScale: string;
  windSpeed: string;
  humidity: string;
  precip: string;
  pressure: string;
  vis: string;
  cloud: string;
  dew: string;
}

// 获取当前城市默认天气数据

// 发起请求时需要携带的token
const weatherApiToken = ref("");

// 创建并存储请求时需要的token
const createWeatherApiToken = async () => {
  const token = await generateJWT();
  weatherApiToken.value = token;
  window.localStorage.setItem("blueprint-weather-token", token);
  getWeatherData();
};

const weatherData = ref<WeatherResponseDataNow | null>(null);
const getWeatherData = () => {
  getWeather
    .get(
      {}, // query参数
      {
        Authorization: `Bearer ${weatherApiToken.value}`, // 添加Authorization头
      }
    )
    .then((res) => {
      if (typeof res === "object" && res?.status === 401) {
        // 401 未授权处理
        createWeatherApiToken();
      } else {
        weatherData.value = res?.now ?? null;
      }
    })
    .catch((err) => {
      console.error("请求失败:", err);
    });
};

const isHttps = ref(true);

onMounted(() => {
  // 切换 Nuxt UI 颜色模式为浅色
  const colorMode = useColorMode();
  colorMode.preference = "light";
  // 蓝图天气默认切换为橙色主题
  changeTheme("orange");
  weatherApiToken.value =
    window.localStorage.getItem("blueprint-weather-token") || "";
  isHttps.value = judgeProtocol() === "https";
  if (isHttps.value) {
    console.log("获取地理位置信息");
  }
  getWeatherData();
});
</script>

<style scoped lang="scss">
.blueprint-weather {
}
</style>
