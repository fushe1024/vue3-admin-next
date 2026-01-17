<script setup>
import { Setting } from '@element-plus/icons-vue'
import { useUserStore, useSettingsStore } from '@/store'

const userStore = useUserStore()
const settingsStore = useSettingsStore()

// 下拉菜单
const handleCommand = (command) => {
  if (command === 'logout') {
    userStore.logout()
  } else if (command === 'github') {
    window.open('https://github.com/fushe1024/vue3-admin-next')
  } else if (command === 'profile') {
    console.log('profile')
  }
}

// 打开项目配置抽屉
const handleSettingClick = () => {
  settingsStore.showSettingsPanel()
}
</script>

<template>
  <div class="navbar-actions">
    <!-- 搜索 -->
    <div class="navbar-actions__item">
      <MenuSearch />
    </div>

    <!-- 指南 -->
    <div class="navbar-actions__item">
      <Guide />
    </div>

    <!-- 全屏 -->
    <div class="navbar-actions__item">
      <Fullscreen />
    </div>

    <!-- 布局大小选择 -->
    <div class="navbar-actions__item">
      <SizeSelect />
    </div>

    <!-- 语言选择 -->
    <div class="navbar-actions__item">
      <LangSelect />
    </div>

    <!-- 通知 -->
    <div class="navbar-actions__item">
      <NoticeDropdown />
    </div>

    <!-- 用户菜单 -->
    <div class="navbar-actions__item">
      <el-dropdown @command="handleCommand">
        <div class="avatar-content">
          <el-avatar
            shape="circle"
            :size="28"
            src="https://foruda.gitee.com/images/1723603502796844527/03cdca2a_716974.gif"
          />

          <span>{{ userStore.userInfo.username }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="profile">
              {{ $t('navbar.profile') }}
            </el-dropdown-item>
            <el-dropdown-item command="github">
              {{ $t('navbar.github') }}
            </el-dropdown-item>
            <el-dropdown-item divided command="logout">
              {{ $t('navbar.logout') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <!-- 系统设置 -->
    <div class="navbar-actions__item" @click="handleSettingClick">
      <el-icon>
        <Setting />
      </el-icon>
    </div>
  </div>
</template>

<style scoped lang="scss">
.navbar-actions {
  display: flex;
  align-items: center;
  height: 100%;

  // 每个操作项
  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-width: 44px; /* 增加最小点击区域到44px，符合人机交互标准 */
    min-height: 44px;
    padding: 0 13px;
    cursor: pointer;
    text-align: center;
    transition: all 0.3s;

    // 确保子元素居中
    > * {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    // 确保 Element Plus 组件可以正常工作
    :deep(.el-dropdown),
    :deep(.el-tooltip) {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }

    // svg-icon 图标样式
    :deep([class^='svg-icon']) {
      fill: var(--el-text-color-regular);
      transition: color 0.3s;

      &:hover {
        fill: var(--el-color-primary);
      }
    }

    // 鼠标悬停
    &:hover {
      background-color: $navbar-hover;

      // el-icon 图标颜色
      :deep(.el-icon) {
        color: var(--el-color-primary);
      }
    }
  }

  // 下拉菜单区域
  .avatar-content {
    display: flex;
    align-items: center;
    cursor: pointer;

    span {
      margin-left: 8px;
    }
  }
}
</style>
