import { useAppStore, useSettingsStore } from '@/store'
import { defaultSettings } from '@/settings'
import { computed } from 'vue'

export const useLayout = () => {
  const appStore = useAppStore()
  const settingsStore = useSettingsStore()

  // 侧边栏展开状态
  const isSidebarOpen = computed(() => appStore.sidebar.opened)

  // 是否显示标签视图
  const isShowTagsView = computed(() => settingsStore.showTagsView)

  // 是否显示设置面板
  const isShowSettings = computed(() => defaultSettings.showSettings)

  // 是否显示Logo
  const isShowLogo = computed(() => settingsStore.showAppLogo)

  /**
   * 处理切换侧边栏的展开/收起状态
   */
  function toggleSidebar() {
    appStore.toggleSidebar()
  }

  return {
    isSidebarOpen,
    isShowTagsView,
    isShowSettings,
    isShowLogo,
    toggleSidebar
  }
}
