// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path'
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxt/eslint', '@nuxt/ui'],
  // 配置基础路径
  app: {
    baseURL: '/nuxt-blog/',
    buildAssetsDir: 'assets/', // 确保资源文件路径正确
    head: {
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/nuxt-blog//favicon.ico' }]
    }
  },
  // 启用静态生
  nitro: {
    prerender: {
      routes: ['/'] // 添加需要预渲染的路由
    }
  },
  // 避免一些 GitHub Pages 的兼容性问题
  experimental: {
    payloadExtraction: false
  },
  css: ['~/assets/css/main.css'],
  ui: {
    fonts: false
  },
  // 显式配置路径别名（如果需要的话）
  alias: {
    '~': resolve(__dirname, './'),
    '@': resolve(__dirname, './')
  },

  // 或者使用 Vite 配置
  vite: {
    resolve: {
      alias: {
        '~': resolve(__dirname, './'),
        '@': resolve(__dirname, './')
      }
    }, plugins: [
      tailwindcss(),
    ],
  }
})