<script setup>
import { Setting, CopyDocument, RefreshLeft, Moon, Sunny } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'

const predefineColors = [
  '#409eff',
  '#67c23a',
  '#e6a23c',
  '#f56c6c',
  '#909399',
  '#5d7092',
  '#7232dd',
  '#ff9900',
  '#2dce89',
  '#f5365c'
]

// 默认配置
const defaultOptions = {
  isDark: false,
  themeColor: '#409eff',
  showTabs: true,
  showLogo: true,
  showWatermark: false,
  sidebarColor: 'blue'
}

// 当前配置
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
const handleClick = () => {
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
  Object.assign(options, defaultOptions)
}
</script>

<template>
  <!-- 配置图标 -->
  <el-icon @click="handleClick">
    <Setting />
  </el-icon>

  <!-- 抽屉弹窗 -->
  <Teleport to="body">
    <el-drawer v-model="visible" size="380" title="项目配置" class="setting-drawer">
      <!-- 公共设置项 -->
      <div class="setting-content">
        <!-- 主题设置 -->
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

        <!-- 界面设置 -->
        <el-divider content-position="center">界面设置</el-divider>
        <div class="interface-setting">
          <div class="interface-item">
            <span class="small-text">主题颜色</span>
            <el-color-picker
              size="small"
              :predefine="predefineColors"
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
          <div class="interface-item" v-if="!options.isDark">
            <span class="small-text">侧边栏配色</span>
            <div>
              <el-radio-group v-model="options.sidebarColor">
                <el-radio label="blue" size="small">经典蓝</el-radio>
                <el-radio label="white" size="small">极简白</el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>

        <!-- 导航设置 -->
        <el-divider content-position="center">导航设置</el-divider>
        <div class="navigation-setting">
          <span class="small-text">待开发</span>
        </div>
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
      }
    }

    // 界面设置
    .interface-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: black;
      padding: 15px 5px;
      border-bottom: 1px solid #e8e8e8;
      border-radius: 8px;
      transition: all 0.3s;

      &:hover {
        background-color: rgb(245, 247, 250);
      }

      // 小文本
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
    }
  }
}
</style>
