<template>
  <div
    class="flex items-center justify-center w-screen h-screen overflow-hidden blueprint-weather"
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
              class-name="block nav-svg"
            />
            <h3 class="font-bold">蓝图天气</h3>
          </div>
          <div class="top-menu"></div>
        </div>
        <div class="nav-bottom"></div>
      </nav>
      <section class="flex flex-1 p-4 weather-section">
        <div class="section-left">
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
          <div class="left-main">
            <div class="flex main-card">
              <div class="card-temperature">
                <p class="flex items-center">
                  <SvgIcon
                    name="blueprint-weather-location"
                    class-name="card-svg"
                  />
                  武汉
                </p>
                <p>
                  <img
                    class="block w-10 h-10 m-auto rounded-full"
                    src="https://a.hecdn.net/img/common/icon/202106d/300.png"
                    alt=""
                  />{{ weatherData?.text }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="section-right"></div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getWeather } from "@/services/apis/weather";
import { generateJWT } from "@/services/tokenService";
import { changeTheme, judgeProtocol } from "@/app/utils";
import "qweather-icons/font/qweather-icons.css";

// 获取天气数据
const weatherToken = ref("");
const createToken = async () => {
  const token = await generateJWT();
  weatherToken.value = token;
  window.localStorage.setItem("blueprint-weather-token", token);
  getWeatherData();
};

const weatherData = ref({});
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
      } else {
        weatherData.value = res?.now;
        console.log("当前的天气数据：", weatherData.value);
      }
    })
    .catch((err) => {
      console.error("请求失败:", err);
    });
};

const isHttps = ref(true);

onMounted(() => {
  // 蓝图天气默认切换为橙色主题
  changeTheme("orange");
  weatherToken.value =
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
  background-color: #e2e8f0;
  .weather-main {
    background-color: #ffffff;
    .main-nav {
      .nav-svg {
        width: 2rem;
        height: 2rem;
      }
    }
  }
  .card-svg {
    width: 2rem;
    height: 2rem;
  }
}
</style>
