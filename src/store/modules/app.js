import { defineStore } from 'pinia'
import { reactive, ref, computed } from 'vue'
import { defaultSettings } from '@/settings'
import { SidebarStatus } from '@/enums'
import storage from '@/utils/storage'
import { STORAGE_KEYS } from '@/constants'
import { store } from '@/store'

// Element Plus 语言包
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'

export const useAppStore = defineStore('app', () => {
  /* -------------------------------- 侧边栏 -------------------------------- */

  // 侧边栏状态（持久化）
  const sidebarStatus = ref(
    storage.get(STORAGE_KEYS.SIDEBAR_STATUS) || SidebarStatus.OPENED
  )

  // 侧边栏 UI 状态
  const sidebar = reactive({
    opened: sidebarStatus.value === SidebarStatus.OPENED,
    withoutAnimation: false
  })

  // 持久化侧边栏状态
  const persistSidebarStatus = () => {
    storage.set(STORAGE_KEYS.SIDEBAR_STATUS, sidebarStatus.value)
  }

  // 同步 sidebar -> status（统一出口）
  const syncSidebarStatus = () => {
    sidebarStatus.value = sidebar.opened ? SidebarStatus.OPENED : SidebarStatus.CLOSED

    persistSidebarStatus()
  }

  /* -------------------------------- 布局大小 -------------------------------- */

  const size = ref(storage.get(STORAGE_KEYS.SIZE) || defaultSettings.size)

  // 修改布局大小
  const changeSize = (newSize) => {
    size.value = newSize
    storage.set(STORAGE_KEYS.SIZE, newSize)
  }

  /* ---------------------------------- 语言 ---------------------------------- */

  const language = ref(storage.get(STORAGE_KEYS.LANGUAGE) || defaultSettings.language)

  // Element Plus 语言
  const locale = computed(() => (language.value === 'en' ? en : zhCn))

  // 修改语言
  const changeLanguage = (newLanguage) => {
    language.value = newLanguage
    storage.set(STORAGE_KEYS.LANGUAGE, newLanguage)
  }

  /* ------------------------------ 侧边栏操作 ------------------------------ */

  // 切换侧边栏
  const toggleSidebar = () => {
    sidebar.opened = !sidebar.opened
    syncSidebarStatus()
  }

  // 关闭侧边栏
  const closeSideBar = () => {
    sidebar.opened = false
    syncSidebarStatus()
  }

  // 打开侧边栏
  const openSideBar = () => {
    sidebar.opened = true
    syncSidebarStatus()
  }

  // 切换动画状态
  const toggleSidebarWithoutAnimation = () => {
    sidebar.withoutAnimation = !sidebar.withoutAnimation
  }

  /* ---------------------------------- 导出 ---------------------------------- */

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

/* ------------------------ 组件外使用 store（hook） ------------------------ */

export function useAppStoreHook() {
  return useAppStore(store)
}
