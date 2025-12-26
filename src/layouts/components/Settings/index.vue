<script setup>
import { Setting, CopyDocument, RefreshLeft, Moon, Sunny } from '@element-plus/icons-vue'
import { ref, computed } from 'vue'
import { ThemeMode, SidebarColor } from '@/enums'
import { themeColorPresets } from '@/settings'

import { useSettingsStore } from '@/store'

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
  settingsStore.resetSettings()
}

// 暴露方法
defineExpose({
  open: () => (drawerVisible.value = true)
})
</script>

<template>
  <!-- 配置图标 -->
  <el-icon>
    <Setting />
  </el-icon>

  <!-- 抽屉弹窗 -->
  <Teleport to="body">
    <el-drawer v-model="drawerVisible" size="380" title="项目配置" class="setting-drawer">
      <!-- 公共设置项 -->
      <div class="setting-content">
        <!-- 主题设置 -->
        <section>
          <el-divider content-position="center">主题设置</el-divider>
          <div class="theme-setting">
            <div class="content">
              <el-switch
                v-model="isDark"
                :active-icon="Moon"
                :inactive-icon="Sunny"
                @change="handleThemeChange"
              />
            </div>
          </div>
        </section>

        <!-- 界面设置 -->
        <section>
          <el-divider content-position="center">界面设置</el-divider>
          <div class="interface-setting">
            <div class="interface-item">
              <span class="small-text">主题颜色</span>
              <el-color-picker :predefine="colorPresets" v-model="selectedThemeColor" />
            </div>
            <div class="interface-item">
              <span class="small-text">显示页签</span>
              <el-switch v-model="settingsStore.showTagsView" />
            </div>
            <div class="interface-item">
              <span class="small-text">显示Logo</span>
              <el-switch v-model="settingsStore.showAppLogo" />
            </div>
            <div class="interface-item">
              <span class="small-text">显示水印</span>
              <el-switch v-model="settingsStore.showWatermark" />
            </div>
            <div class="interface-item" v-if="!isDark">
              <span class="small-text">侧边栏配色</span>
              <el-radio-group v-model="sidebarColor" @change="changeSidebarColor">
                <el-radio :label="SidebarColor.CLASSIC_BLUE"> 经典蓝 </el-radio>
                <el-radio :label="SidebarColor.MINIMAL_WHITE"> 极简白 </el-radio>
              </el-radio-group>
            </div>
          </div>
        </section>

        <!-- 导航设置 -->
        <section>
          <el-divider content-position="center">导航设置</el-divider>
          <div class="navigation-setting">
            <span class="small-text">待开发</span>
          </div>
        </section>
      </div>

      <template #footer>
        <div class="custom-footer">
          <el-button class="btn" type="primary" @click="copyConfig" :icon="CopyDocument">
            复制配置
          </el-button>
          <el-button class="btn" type="warning" :icon="RefreshLeft" @click="resetDefault">
            重置默认
          </el-button>
        </div>
      </template>
    </el-drawer>
  </Teleport>
</template>

<style scoped lang="scss">
.setting-drawer {
  // 内容区域
  .setting-content {
    padding: 0 20px;

    // 主题设置
    .theme-setting {
      @include flex-center;

      .content {
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          transform: scale(1.03);
        }
      }
    }

    // 界面设置
    .interface-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: var(--el-text-color-primary);
      padding: 15px 5px;
      border-bottom: 1px solid var(--el-border-color-light);

      &:hover {
        background-color: var(--el-border-color-light);
        border-radius: 8px;
      }

      .small-text {
        font-size: 12px;
      }

      // 最后一个设置项，去掉边框线
      &:last-child {
        border-bottom: none;
      }
    }

    // 导航设置
    .navigation-setting {
      @include flex-center;
      padding-top: 10px;
    }
  }

  // 底部按钮
  .custom-footer {
    @include flex-center;

    .btn {
      width: 50%;
      font-size: 14px;
      border-radius: 8px;
      transition: all 0.3s ease;

      &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateY(-2px);
      }
    }
  }
}
</style>
