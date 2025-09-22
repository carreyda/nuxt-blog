<template>
  <div
    class="flex items-center justify-center w-screen h-screen overflow-hidden bg-slate-200 blueprint-weather"
  >
    <main
      class="flex w-4/5 h-4/5 mx-auto my-auto min-h-0 min-w-0 rounded weather-main"
    >
      <nav
        class="flex flex-col items-center justify-between w-fit h-full p-4 mr-4 main-nav"
      >
        <div class="flex flex-col items-center justify-between nav-top">
          <div class="flex flex-col items-center top-info">
            <SvgIcon
              name="blueprint-weather-logo-1"
              class-name="block w-8 h-8 "
            />
            <h3 class="font-bold">蓝图天气</h3>
          </div>
          <div class="top-menu"></div>
        </div>
        <div class="nav-bottom"></div>
      </nav>
      <section class="flex flex-1 p-4 weather-section">
        <div class="w-3/4 section-left">
          <div class="flex h-fit mb-8 left-header">
            <div class="flex header-slogan">
              <img
                class="block w-10 h-10 m-auto rounded-full"
                src="../../../assets//images//author.png"
                alt=""
              />
              <div class="h-14 ml-3 slogan-text">
                <p class="h-1/2">Hello,</p>
                <p class="h-1/2 font-bold">Carreyda</p>
              </div>
            </div>
          </div>
          <div class="flex justify-between left-main">
            <div
              class="flex w-45/100 justify-between bg-gradient-to-r from-blue-100 to-orange-100 rounded-xl p-6 shadow-md main-card-temp"
            >
              <div class="card-info">
                <p class="flex w-fit mb-4 items-center">
                  <SvgIcon
                    name="blueprint-weather-location"
                    class-name="w-8 h-8 m-auto mr-4 card-svg"
                  />
                  武汉
                </p>
                <p class="flex w-fit mb-4 items-center">
                  <img
                    class="block w-8 h-8 m-auto mr-4 rounded-full"
                    :src="`
https://a.hecdn.net/img/common/icon/202106d/${weatherData?.icon}.png`"
                    alt=""
                    referrerpolicy="no-referrer"
                  />{{ weatherData?.text }}
                </p>
                <p class="flex w-fit mb-4 items-center" @click="getWeatherData">
                  <SvgIcon
                    name="blueprint-weather-refresh"
                    class-name="w-8 h-8 m-auto mr-4 current-pointer card-svg"
                  />更新时间：{{
                    dayjs(weatherData?.obsTime).format("YYYY-MM-DD HH:mm")
                  }}
                </p>
              </div>
              <div class="card-temperature">
                <p class="flex mb-4 items-center">
                  <SvgIcon
                    name="blueprint-weather-thermometer"
                    class-name="w-8 h-8 m-auto card-svg"
                  />
                  <span class="font-bold text-[32px]"
                    >{{ weatherData?.temp }}℃</span
                  >
                </p>
              </div>
            </div>
            <div
              class="flex w-45/100 justify-between bg-gradient-to-r from-blue-100 to-orange-100 rounded-xl p-6 shadow-md main-card-quality"
            ></div>
          </div>
        </div>
        <div class="section-right"></div>
      </section>
    </main>
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
