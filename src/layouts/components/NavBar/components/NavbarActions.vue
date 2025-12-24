<script setup>
import { useUserStore } from '@/store'
import { ref } from 'vue'

const userStore = useUserStore()

// 下拉菜单点击
const handleCommand = (command) => {
  if (command === 'logout') {
    userStore.logout()
  } else if (command === 'github') {
    window.open('https://github.com/fushe1024/vue3-admin-next')
  } else if (command === 'profile') {
    console.log('profile')
  }
}

// 点击项目配置
const settingComponent = ref(null)
const handleSettingClick = () => {
  settingComponent.value?.open()
}
</script>

<template>
  <div class="navbar-actions">
    <!-- 搜索 -->
    <div class="navbar-actions__item">
      <MenuSearch />
    </div>

    <!-- 全屏 -->
    <div class="navbar-actions__item">
      <Fullscreen />
    </div>

    <!-- 语言选择 -->
    <div class="navbar-actions__item">
      <LangSelect />
    </div>

    <!-- 通知 -->
    <div class="navbar-actions__item">
      <Notification />
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
            <el-dropdown-item command="profile">个人中心</el-dropdown-item>
            <el-dropdown-item command="github">仓库地址</el-dropdown-item>
            <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <!-- 系统设置 -->
    <div class="navbar-actions__item" @click="handleSettingClick">
      <Settings ref="settingComponent" />
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
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 13px;
    cursor: pointer;
    transition: all 0.3s;

    // 鼠标悬停
    &:hover {
      background-color: rgb(245, 245, 245);
      color: var(--el-color-primary);
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
