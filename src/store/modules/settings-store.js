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

// test
console.log('默认配置', defaultSettings)

export const useSettingsStore = defineStore(
  'setting',
  () => {
    // 设置面板可见性
    const settingsVisible = ref(false)

    // 主题模式（dark / light）
    const theme = ref(defaultSettings.theme)

    // 主题颜色
    const themeColor = ref(defaultSettings.themeColor)

    // 是否显示标签页视图
    const showTagsView = ref(defaultSettings.showTagsView)

    // 是否显示应用Logo
    const showAppLogo = ref(defaultSettings.showAppLogo)

    // 是否显示水印
    const showWatermark = ref(defaultSettings.showWatermark)

    // 侧边栏配色方案
    const sidebarColorScheme = ref(defaultSettings.sidebarColorScheme)

    // 系统主题媒体查询（用于 ThemeMode.AUTO）
    const prefersDarkMedia =
      typeof window !== 'undefined' && typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-color-scheme: dark)')
        : null

    function getSystemTheme() {
      return prefersDarkMedia && prefersDarkMedia.matches
        ? ThemeMode.DARK
        : ThemeMode.LIGHT
    }

    // 仅在用户选择自动（跟随系统）时响应系统主题变化
    function handleSystemThemeChange(e) {
      if (theme.value === ThemeMode.AUTO) {
        const effectiveTheme = e.matches ? ThemeMode.DARK : ThemeMode.LIGHT
        toggleDarkMode(effectiveTheme === ThemeMode.DARK)
        const colors = generateThemeColors(themeColor.value, effectiveTheme)
        applyTheme(colors)
      }
    }

    if (prefersDarkMedia) {
      // 兼容旧浏览器和新浏览器的监听方式
      if (typeof prefersDarkMedia.addEventListener === 'function') {
        prefersDarkMedia.addEventListener('change', handleSystemThemeChange)
      } else if (typeof prefersDarkMedia.addListener === 'function') {
        prefersDarkMedia.addListener(handleSystemThemeChange)
      }
    }

    // 监听主题变化，自动应用样式
    watch(
      [theme, themeColor],
      ([newTheme, newThemeColor]) => {
        // 计算实际生效的主题：若为 AUTO 则使用系统当前偏好
        const effectiveTheme = newTheme === ThemeMode.AUTO ? getSystemTheme() : newTheme

        toggleDarkMode(effectiveTheme === ThemeMode.DARK)
        const colors = generateThemeColors(newThemeColor, effectiveTheme)
        applyTheme(colors)
      },
      { immediate: true }
    )

    // 监听侧边栏配色变化
    watch(
      [sidebarColorScheme],
      ([newSidebarColorScheme]) => {
        toggleSidebarColor(newSidebarColorScheme === SidebarColor.CLASSIC_BLUE)
      },
      { immediate: true }
    )

    // 主题更新方法
    const updateTheme = (newTheme) => {
      theme.value = newTheme
    }

    const updateThemeColor = (newColor) => {
      themeColor.value = newColor
    }

    const updateSidebarColorScheme = (newScheme) => {
      sidebarColorScheme.value = newScheme
    }

    // 设置面板控制
    const toggleSettingsPanel = () => {
      settingsVisible.value = !settingsVisible.value
    }

    const showSettingsPanel = () => {
      settingsVisible.value = true
    }

    const hideSettingsPanel = () => {
      settingsVisible.value = false
    }

    // 重置配置
    const resetSettings = () => {
      theme.value = defaultSettings.theme
      themeColor.value = defaultSettings.themeColor
      showTagsView.value = defaultSettings.showTagsView
      showAppLogo.value = defaultSettings.showAppLogo
      showWatermark.value = defaultSettings.showWatermark
      sidebarColorScheme.value = defaultSettings.sidebarColorScheme
    }

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

      // 重置功能
      resetSettings
    }
  },
  {
    persist: {
      omit: ['settingsVisible'] // 不持久化 settingsVisible
    }
  }
)
