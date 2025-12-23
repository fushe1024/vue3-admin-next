<script setup>
import { Search, FullScreen, Bell, Switch } from '@element-plus/icons-vue'

// 下拉菜单点击
const handleCommand = (command) => {
  if (command === 'logout') {
    console.log('logout')
  } else if (command === 'github') {
    window.open('https://github.com/fushe1024/vue3-admin-next')
  } else if (command === 'profile') {
    console.log('profile')
  }
}

// 主题颜色
const themeColor = '#409eff'
</script>

<template>
  <div class="nav-bar">
    <!-- 左侧 -->
    <div class="hamburger-box">
      <svg-icon class="hamburger-icon" name="hamburger-opened" />

      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/">promotion management</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>promotion list</el-breadcrumb-item>
        <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 操作按钮 -->
    <div class="navbar-actions">
      <!-- 搜索 -->
      <div class="navbar-actions__item">
        <el-icon>
          <Search />
        </el-icon>
      </div>

      <!-- 全屏 -->
      <div class="navbar-actions__item">
        <el-icon>
          <FullScreen />
        </el-icon>
      </div>

      <!-- 切换语言 -->
      <div class="navbar-actions__item">
        <el-icon>
          <Switch />
        </el-icon>
      </div>

      <!-- 消息区域 -->
      <div class="navbar-actions__item">
        <el-badge :value="5" :offset="[4, 1]">
          <el-icon>
            <Bell />
          </el-icon>
        </el-badge>
      </div>

      <!-- 头像区域 -->
      <div class="navbar-actions__item">
        <el-dropdown @command="handleCommand">
          <div class="avatar-content">
            <!-- 头像 -->
            <el-avatar
              shape="circle"
              :size="28"
              src="https://foruda.gitee.com/images/1723603502796844527/03cdca2a_716974.gif"
            />

            <!-- 用户名 -->
            <span>admin</span>
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

      <!-- 项目配置 -->
      <div class="navbar-actions__item">
        <Setting />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e8e8e8;
  padding-left: 20px;
  height: 50px;

  // 左侧 - 汉堡菜单
  .hamburger-box {
    display: flex;
    align-items: center;

    .hamburger-icon {
      margin-right: 10px;
    }
  }

  // 右侧 - 操作按钮区域
  .navbar-actions {
    display: flex;
    height: inherit;

    // 每个操作按钮
    .navbar-actions__item {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 15px;
      cursor: pointer;
      transition: all 0.3s;

      // 鼠标悬停，背景颜色 与 字体颜色
      &:hover {
        background-color: rgb(245, 245, 245);
        color: v-bind(themeColor);
      }
    }

    // 头像 & 下拉菜单
    .avatar-content {
      display: flex;
      align-items: center;
      cursor: pointer;

      span {
        margin-left: 8px;
      }
    }
  }
}
</style>
