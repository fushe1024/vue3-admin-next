import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useAppStore = defineStore('app', () => {
  // 侧边栏状态
  const sidebar = reactive({
    opened: true, // 是否打开侧边栏
    withoutAnimation: false // 是否禁用侧边栏动画
  })

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
