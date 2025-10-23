// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path'
import tailwindcss from "@tailwindcss/vite";
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxt/eslint', '@nuxt/ui'],
  // 显式配置路径别名
  alias: {
    '~': resolve(__dirname, './'),
    '@': resolve(__dirname, './')
  },
  // 配置基础路径
  app: {
    baseURL: '/nuxt-blog/',
    buildAssetsDir: 'assets/', // 确保资源文件路径正确
    head: {
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/nuxt-blog/favicon.ico' }]
    }
  },
  // 预渲染指定的路由页面
  nitro: {
    prerender: {
      routes: ['/'] // 添加需要预渲染的路由
    }
  },
  // 避免一些 GitHub Pages 的兼容性问题
  experimental: {
    payloadExtraction: false
  },
  css: ['./app/assets/css/main.css'],
  ui: {
    fonts: false,
    theme: {
      colors: [
        'primary',
      ]
    }
  },
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },
  // Vite 配置
  vite: {
    plugins: [
      tailwindcss(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(process.cwd(), 'app/assets/svg')],
        // 指定 symbolId 格式
        symbolId: 'icon-[name]',// 添加这些配置
        inject: 'body-last',
        customDomId: '__svg__icons__dom__'
      })
    ], server: {
      hmr: {
        protocol: 'ws',
        host: 'localhost',
      },
      watch: {
        usePolling: false,
        // 排除不需要监听的目录
        ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**']
      }
    },
    optimizeDeps: {
      include: ['vue', '@vue/runtime-core', '@vue/shared']
    }
  }
})