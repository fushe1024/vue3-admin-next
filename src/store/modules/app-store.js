import { defineStore } from 'pinia'
import { reactive, ref, computed } from 'vue'
import { defaultSettings } from '@/settings'
import { SidebarStatus } from '@/enums'
import storage from '@/utils/storage'
import { STORAGE_KEYS } from '@/constants'
import { store } from '@/store'

// 导入 Element Plus 中英文语言包
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'

export const useAppStore = defineStore('app', () => {
  // 侧边栏状态
  const sidebarStatus = ref(
    storage.get(STORAGE_KEYS.SIDEBAR_STATUS) || SidebarStatus.OPENED
  )
  const sidebar = reactive({
    opened: sidebarStatus.value === SidebarStatus.OPENED, // 是否打开侧边栏
    withoutAnimation: false // 是否禁用侧边栏动画
  })

  // 本地存储侧边栏状态
  const storageSidebarStatus = () => {
    storage.set(STORAGE_KEYS.SIDEBAR_STATUS, sidebarStatus.value)
  }

  // 布局大小
  const size = ref(storage.get(STORAGE_KEYS.SIZE) || defaultSettings.size)

  // 语言
  const language = ref(storage.get(STORAGE_KEYS.LANGUAGE) || defaultSettings.language)

  // 语言对应的 Element Plus 语言包
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
    // 保存布局大小到本地存储
    storage.set(STORAGE_KEYS.SIZE, newSize)
  }

  // 更改语言
  const changeLanguage = (newLanguage) => {
    language.value = newLanguage
    // 保存语言到本地存储
    storage.set(STORAGE_KEYS.LANGUAGE, newLanguage)
  }

  // 切换侧边栏
  const toggleSidebar = () => {
    sidebar.opened = !sidebar.opened
    sidebarStatus.value = sidebar.opened ? SidebarStatus.OPENED : SidebarStatus.CLOSED
    storageSidebarStatus()
  }

  // 关闭侧边栏
  const closeSideBar = () => {
    sidebar.opened = false
    sidebarStatus.value = SidebarStatus.CLOSED
    storageSidebarStatus()
  }

  // 打开侧边栏
  const openSideBar = () => {
    sidebar.opened = true
    sidebarStatus.value = SidebarStatus.OPENED
    storageSidebarStatus()
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
