<script setup>
import NavBar from './components/NavBar/index.vue'
import SideBar from './components/SideBar/index.vue'
import AppMain from './components/AppMain/index.vue'
</script>

<template>
  <div class="app-container">
    <!-- 左侧 side bar -->
    <side-bar class="sidebar-box"></side-bar>

    <!-- 右侧 app main -->
    <div class="main-box">
      <!-- 顶部 nav bar -->
      <nav-bar class="flex-header"></nav-bar>
      <!-- 主体 -->
      <app-main class="app-main-content"></app-main>
    </div>
  </div>
</template>

<style scoped lang="scss">
// 布局容器
.app-container {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  // 左侧侧边栏
  .sidebar-box {
    background-color: $menuBg;
  }

  // 顶部导航栏
  .flex-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - $sideBarWidth);
  }

  // 主体内容区域
  .app-main-content {
    min-height: calc(100vh - 50px);
    width: 100%;
    padding: 60px 20px 20px 20px;
  }
}
</style>
