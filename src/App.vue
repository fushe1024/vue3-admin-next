<script setup>
import { useSettingsStore, useAppStore } from '@/store'
import { defaultSettings } from '@/settings'
import { ThemeMode } from '@/enums'
import { computed } from 'vue'

const settingsStore = useSettingsStore()
const appStore = useAppStore()

const locale = computed(() => appStore.locale)
const size = computed(() => appStore.size)
const showWatermark = computed(() => settingsStore.showWatermark)

// 明亮/暗黑主题水印字体颜色适配
const fontColor = computed(() => {
  return settingsStore.theme === ThemeMode.DARK
    ? 'rgba(255, 255, 255, .15)'
    : 'rgba(0, 0, 0, .15)'
})
</script>

<template>
  <!-- 配置全局语言和大小 -->
  <el-config-provider :locale="locale" :size="size">
    <!-- 水印 -->
    <el-watermark
      :font="{ color: fontColor }"
      :content="showWatermark ? defaultSettings.watermarkContent : ''"
      :z-index="9999"
    >
      <router-view />
    </el-watermark>
  </el-config-provider>
</template>

<style scoped></style>
