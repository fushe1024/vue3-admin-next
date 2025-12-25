import { defineStore } from 'pinia'
import { ref } from 'vue'
import { defaultSettings } from '@/settings'

console.log('默认配置', defaultSettings)

export const useSettingsStore = defineStore('setting', () => {
  // 主题
  const theme = ref(defaultSettings.theme)

  // 主题颜色
  const themeColor = ref(defaultSettings.themeColor)

  // 是否显示标签页
  const showTagsView = ref(defaultSettings.showTagsView)

  // 是否显示Logo
  const showAppLogo = ref(defaultSettings.showAppLogo)

  /// 是否显示水印
  const showWatermark = ref(defaultSettings.showWatermark)

  // 重置配置
  const resetSettings = () => {
    theme.value = defaultSettings.theme
    themeColor.value = defaultSettings.themeColor
    showTagsView.value = defaultSettings.showTagsView
    showAppLogo.value = defaultSettings.showAppLogo
    showWatermark.value = defaultSettings.showWatermark
  }

  return {
    // 状态
    theme,
    themeColor,
    showTagsView,
    showAppLogo,
    showWatermark,
    // 更新方法

    // 重置默认值
    resetSettings
  }
})
