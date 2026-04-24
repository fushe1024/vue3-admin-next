import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { defaultSettings } from '@/settings'
import { ThemeMode, SidebarColor } from '@/enums'
import {
  toggleDarkMode,
  generateThemeColors,
  applyTheme,
  toggleSidebarColor
} from '@/utils/theme'

export const useSettingsStore = defineStore(
  'setting',
  () => {
    /* ---------------------------------- 状态 ---------------------------------- */

    // 设置面板
    const settingsVisible = ref(false)

    // 主题相关
    const theme = ref(defaultSettings.theme)
    const themeColor = ref(defaultSettings.themeColor)

    // UI 显示控制
    const showTagsView = ref(defaultSettings.showTagsView)
    const showAppLogo = ref(defaultSettings.showAppLogo)
    const showWatermark = ref(defaultSettings.showWatermark)

    // 侧边栏
    const sidebarColorScheme = ref(defaultSettings.sidebarColorScheme)

    /* -------------------------------- 系统主题 -------------------------------- */

    // 系统主题监听（dark / light）
    const prefersDarkMedia =
      typeof window !== 'undefined'
        ? window.matchMedia('(prefers-color-scheme: dark)')
        : null

    // 获取系统主题
    const getSystemTheme = () =>
      prefersDarkMedia?.matches ? ThemeMode.DARK : ThemeMode.LIGHT

    // 获取当前生效主题（AUTO → 跟随系统）
    const getEffectiveTheme = () =>
      theme.value === ThemeMode.AUTO ? getSystemTheme() : theme.value

    /* -------------------------------- 主题应用 -------------------------------- */

    // 应用主题（统一入口）
    const applyCurrentTheme = () => {
      const effectiveTheme = getEffectiveTheme()

      // 切换暗黑模式
      toggleDarkMode(effectiveTheme === ThemeMode.DARK)

      // 生成并应用主题色
      const colors = generateThemeColors(themeColor.value, effectiveTheme)
      applyTheme(colors)
    }

    /* ------------------------------ 系统主题监听 ------------------------------ */

    // 系统主题变化（仅 AUTO 生效）
    const handleSystemThemeChange = () => {
      if (theme.value === ThemeMode.AUTO) {
        applyCurrentTheme()
      }
    }

    if (prefersDarkMedia) {
      if (typeof prefersDarkMedia.addEventListener === 'function') {
        prefersDarkMedia.addEventListener('change', handleSystemThemeChange)
      } else if (typeof prefersDarkMedia.addListener === 'function') {
        prefersDarkMedia.addListener(handleSystemThemeChange)
      }
    }

    /* ---------------------------------- 监听 ---------------------------------- */

    // 主题 / 主题色变化
    watch([theme, themeColor], applyCurrentTheme, { immediate: true })

    // 侧边栏配色变化
    watch(
      sidebarColorScheme,
      (val) => {
        toggleSidebarColor(val === SidebarColor.CLASSIC_BLUE)
      },
      { immediate: true }
    )

    /* -------------------------------- 对外方法 -------------------------------- */

    // 更新主题
    const updateTheme = (newTheme) => {
      theme.value = newTheme
    }

    // 更新主题色
    const updateThemeColor = (newColor) => {
      themeColor.value = newColor
    }

    // 更新侧边栏配色
    const updateSidebarColorScheme = (newScheme) => {
      sidebarColorScheme.value = newScheme
    }

    /* ------------------------------ 面板控制 ------------------------------ */

    const toggleSettingsPanel = () => {
      settingsVisible.value = !settingsVisible.value
    }

    const showSettingsPanel = () => {
      settingsVisible.value = true
    }

    const hideSettingsPanel = () => {
      settingsVisible.value = false
    }

    /* -------------------------------- 重置配置 -------------------------------- */

    const resetSettings = () => {
      theme.value = defaultSettings.theme
      themeColor.value = defaultSettings.themeColor
      showTagsView.value = defaultSettings.showTagsView
      showAppLogo.value = defaultSettings.showAppLogo
      showWatermark.value = defaultSettings.showWatermark
      sidebarColorScheme.value = defaultSettings.sidebarColorScheme
    }

    /* ---------------------------------- 导出 ---------------------------------- */

    return {
      // 状态
      settingsVisible,
      theme,
      themeColor,
      showTagsView,
      showAppLogo,
      showWatermark,
      sidebarColorScheme,

      // 更新方法
      updateTheme,
      updateThemeColor,
      updateSidebarColorScheme,

      // 面板控制
      toggleSettingsPanel,
      showSettingsPanel,
      hideSettingsPanel,

      // 重置
      resetSettings
    }
  },
  {
    persist: {
      omit: ['settingsVisible']
    }
  }
)
