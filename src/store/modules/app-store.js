import { defineStore } from 'pinia'
import { reactive } from 'vue'
import store from '@/store'

export const useAppStore = defineStore('app', () => {
  // 侧边栏状态
  const sidebar = reactive({
    opened: true, // 是否打开侧边栏 - 默认为 true
    withoutAnimation: false // 是否禁用侧边栏动画
  })

  // TODO: 布局大小

  // TODO: 语言

  // 切换侧边栏状态
  const toggleSidebar = () => {
    sidebar.opened = !sidebar.opened
  }

  // 切换侧边栏动画状态
  const toggleSidebarWithoutAnimation = () => {
    sidebar.withoutAnimation = !sidebar.withoutAnimation
  }

  return {
    sidebar,
    toggleSidebar,
    toggleSidebarWithoutAnimation
  }
})

/**
 * 用于在组件外部（如在Pinia Store 中）使用 Pinia 提供的 store 实例。
 * 官方文档解释了如何在组件外部使用 Pinia Store：
 * https://pinia.vuejs.org/core-concepts/outside-component-usage.html#using-a-store-outside-of-a-component
 */
export function useAppStoreHook() {
  return useAppStore(store)
}
