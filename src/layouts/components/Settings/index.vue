<script setup>
import { CopyDocument, RefreshLeft, Moon, Sunny } from '@element-plus/icons-vue'
import { ref, computed } from 'vue'
import { ThemeMode, SidebarColor } from '@/enums'
import { themeColorPresets } from '@/settings'

import { useSettingsStore } from '@/store'

// 加载状态
const resetLoading = ref(false)

// 使用统一的颜色预设配置
const colorPresets = themeColorPresets

const settingsStore = useSettingsStore()

// 是否启用暗黑模式
const isDark = ref(settingsStore.theme === ThemeMode.DARK)

// 选中的主题颜色
const selectedThemeColor = computed({
  get: () => settingsStore.themeColor,
  set: (value) => settingsStore.updateThemeColor(value)
})

// 侧边栏颜色方案
const sidebarColor = ref(settingsStore.sidebarColorScheme)

/**
 * 处理主题切换
 * @param isDark 是否启用暗黑模式
 */
const handleThemeChange = (isDark) => {
  settingsStore.updateTheme(isDark ? ThemeMode.DARK : ThemeMode.LIGHT)
}

/**
 * 更改侧边栏颜色
 * @param val 颜色方案名称
 */
const changeSidebarColor = (val) => {
  settingsStore.updateSidebarColorScheme(val)
}

// 抽屉弹窗是否可见
const drawerVisible = computed({
  get: () => settingsStore.settingsVisible,
  set: (value) => (settingsStore.settingsVisible = value)
})

// 复制配置
const copyConfig = () => {
  ElMessage.success('配置已复制到剪贴板')
}

// 重置默认
const resetDefault = () => {
  resetLoading.value = true

  try {
    settingsStore.resetSettings()

    // 同步更新本地状态
    isDark.value = settingsStore.theme === ThemeMode.DARK
    sidebarColor.value = settingsStore.sidebarColorScheme

    ElMessage.success('重置配置成功')
  } catch {
    ElMessage.error('重置配置失败')
  } finally {
    resetLoading.value = false
  }
}

// 暴露方法
defineExpose({
  open: () => (drawerVisible.value = true)
})
</script>

<template>
  <el-drawer v-model="drawerVisible" size="380" title="项目配置" class="settings-drawer">
    <div class="settings-content">
      <!-- 主题设置 -->
      <section class="config-section">
        <el-divider content-position="center">主题设置</el-divider>
        <div class="theme-setting">
          <el-switch
            v-model="isDark"
            :active-icon="Moon"
            :inactive-icon="Sunny"
            class="theme-switch"
            @change="handleThemeChange"
          />
        </div>
      </section>

      <!-- 界面设置 -->
      <section class="config-section">
        <el-divider content-position="center">界面设置</el-divider>

        <div class="config-item">
          <span class="text-xs">主题颜色</span>
          <el-color-picker :predefine="colorPresets" v-model="selectedThemeColor" />
        </div>

        <div class="config-item">
          <span class="text-xs">显示页签</span>
          <el-switch v-model="settingsStore.showTagsView" />
        </div>

        <div class="config-item">
          <span class="text-xs">显示Logo</span>
          <el-switch v-model="settingsStore.showAppLogo" />
        </div>

        <div class="config-item">
          <span class="text-xs">显示水印</span>
          <el-switch v-model="settingsStore.showWatermark" />
        </div>

        <div class="config-item" v-if="!isDark">
          <span class="text-xs">侧边栏配色</span>
          <el-radio-group v-model="sidebarColor" @change="changeSidebarColor">
            <el-radio :label="SidebarColor.CLASSIC_BLUE"> 经典蓝 </el-radio>
            <el-radio :label="SidebarColor.MINIMAL_WHITE"> 极简白 </el-radio>
          </el-radio-group>
        </div>
      </section>

      <!-- 布局设置 -->
      <section class="config-section">
        <el-divider content-position="center">导航设置</el-divider>
        <div class="navigation-setting">
          <span class="text-xs">待开发</span>
        </div>
      </section>
    </div>

    <!-- 操作按钮区域 - 固定到底部 -->
    <template #footer>
      <div class="action-buttons">
        <el-button type="primary" size="default" :icon="CopyDocument" @click="copyConfig">
          复制配置
        </el-button>
        <el-button
          type="warning"
          size="default"
          :icon="RefreshLeft"
          :loading="resetLoading"
          @click="resetDefault"
        >
          重置默认
        </el-button>
      </div>
    </template>
  </el-drawer>
</template>

<style scoped lang="scss">
/* 设置抽屉样式 */
.settings-drawer {
  :deep(.el-drawer__body) {
    position: relative;
    height: 100%;
    padding: 0;
    overflow: hidden;
  }
}

/* 设置内容区域 */
.settings-content {
  height: calc(100vh - 120px); /* 减去头部和底部按钮的高度 */
  padding: 20px;
  overflow-y: auto;
}

/* 底部操作区域样式 */
.action-buttons {
  display: flex;

  & > .el-button {
    flex: 1;
    font-size: 14px;
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transform: translateY(-2px);
    }
  }
}

/* 主题切换器优化 */
.theme-setting {
  @include flex-center;

  .theme-switch {
    transform: scale(1.2);
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.25);
    }
  }
}

// 配置项样式
.config-section {
  margin-bottom: 24px;

  .config-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    color: var(--el-text-color-primary);
    border-bottom: 1px solid var(--el-border-color-light);
    transition: background-color 0.3s ease;

    // 最后一个设置项，去掉边框线
    &:last-child {
      border-bottom: none;
    }

    // 鼠标悬停效果
    &:hover {
      padding-right: 8px;
      padding-left: 8px;
      margin: 0 -8px;
      background-color: var(--el-fill-color-light);
      border-radius: 6px;
    }
  }
}

// 布局设置
.navigation-setting {
  @include flex-center;
}
</style>
