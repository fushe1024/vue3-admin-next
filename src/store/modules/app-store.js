import { defineStore } from 'pinia'
import { reactive, ref, computed } from 'vue'
import store from '@/store'
import { defaultSettings } from '@/settings'
import { SidebarStatus } from '@/enums'

// 导入 Element Plus 中英文语言包
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'

export const useAppStore = defineStore('app', () => {
  // 侧边栏状态
  const sidebarStatus = ref(SidebarStatus.OPENED)
  const sidebar = reactive({
    opened: sidebarStatus.value === SidebarStatus.OPENED, // 是否打开侧边栏
    withoutAnimation: false // 是否禁用侧边栏动画
  })

  // 布局大小
  const size = ref(defaultSettings.size)

  // 语言
  const language = ref(defaultSettings.language)

  // 语言对应的语言包
  const locale = computed(() => {
    if (language?.value == 'en') {
      return en
    } else {
      return zhCn
    }
  })

  // 更改布局大小
  const changeSize = (newSize) => {
    size.value = newSize
  }

  // 更改语言
  const changeLanguage = (newLanguage) => {
    language.value = newLanguage
  }

  // 切换侧边栏
  const toggleSidebar = () => {
    sidebar.opened = !sidebar.opened
    sidebarStatus.value = sidebar.opened ? SidebarStatus.OPENED : SidebarStatus.CLOSED
  }

  // 关闭侧边栏
  const closeSideBar = () => {
    sidebar.opened = false
    sidebarStatus.value = SidebarStatus.CLOSED
  }

  // 打开侧边栏
  const openSideBar = () => {
    sidebar.opened = true
    sidebarStatus.value = SidebarStatus.OPENED
  }

  // 切换侧边栏动画状态
  const toggleSidebarWithoutAnimation = () => {
    sidebar.withoutAnimation = !sidebar.withoutAnimation
  }

  return {
    // 状态
    size,
    sidebar,
    language,
    locale,

    // 方法
    changeSize,
    changeLanguage,
    toggleSidebar,
    closeSideBar,
    openSideBar,
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
