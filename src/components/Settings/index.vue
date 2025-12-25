<script setup>
import { Setting, CopyDocument, RefreshLeft, Moon, Sunny } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { themeColorPresets } from '@/settings'

import { useSettingsStore } from '@/store'

// 使用统一的颜色预设配置
const colorPresets = themeColorPresets

const settingsStore = useSettingsStore()

// TODO：后期切换为从store中获取
const options = reactive({
  isDark: false,
  themeColor: '#409eff',
  showTabs: true,
  showLogo: true,
  showWatermark: false,
  sidebarColor: 'blue'
})

// 抽屉弹窗是否可见
const visible = ref(false)

// 打开抽屉弹窗
const open = () => {
  visible.value = true
}

// 复制配置
const copyConfig = () => {
  const configStr = JSON.stringify(options, null, 2)
  navigator.clipboard.writeText(configStr).then(() => {
    ElMessage.success('配置已复制到剪贴板')
  })
}

// 重置默认
const resetDefault = () => {
  settingsStore.resetDefault()
}

// 暴露方法
defineExpose({
  open
})
</script>

<template>
  <!-- 配置图标 -->
  <el-icon>
    <Setting />
  </el-icon>

  <!-- 抽屉弹窗 -->
  <Teleport to="body">
    <el-drawer v-model="visible" size="380" title="项目配置" class="setting-drawer">
      <!-- 公共设置项 -->
      <div class="setting-content">
        <!-- 主题设置 -->
        <section>
          <el-divider content-position="center">主题设置</el-divider>
          <div class="theme-setting">
            <div>
              <el-switch
                v-model="options.isDark"
                :active-icon="Moon"
                :inactive-icon="Sunny"
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
              <el-color-picker
                size="small"
                :predefine="colorPresets"
                v-model="options.themeColor"
              />
            </div>
            <div class="interface-item">
              <span class="small-text">显示页签</span>
              <el-switch size="small" v-model="options.showTabs" />
            </div>
            <div class="interface-item">
              <span class="small-text">显示Logo</span>
              <el-switch size="small" v-model="options.showLogo" />
            </div>
            <div class="interface-item">
              <span class="small-text">显示水印</span>
              <el-switch size="small" v-model="options.showWatermark" />
            </div>
            <div class="interface-item" v-show="!options.isDark">
              <span class="small-text">侧边栏配色</span>
              <div>
                <el-radio-group v-model="options.sidebarColor">
                  <el-radio label="blue" size="small">经典蓝</el-radio>
                  <el-radio label="white" size="small">极简白</el-radio>
                </el-radio-group>
              </div>
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
          <el-button class="btn" type="primary" @click="copyConfig" :icon="CopyDocument"
            >复制配置</el-button
          >
          <el-button class="btn" type="warning" :icon="RefreshLeft" @click="resetDefault"
            >重置默认</el-button
          >
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

      div {
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
