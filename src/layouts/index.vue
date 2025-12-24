<script setup>
import NavBar from './components/NavBar/index.vue'
import SideBar from './components/SideBar/index.vue'
import AppMain from './components/AppMain/index.vue'
</script>

<template>
  <div class="layout-wrapper">
    <!-- 侧边栏 -->
    <side-bar class="sidebar-wrapper"></side-bar>

    <!-- 右侧区域  -->
    <div class="main-box">
      <!-- 导航栏 -->
      <nav-bar class="flex-header"></nav-bar>

      <!-- 内容区域 -->
      <app-main class="app-main"></app-main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout-wrapper {
  height: 100%;
  width: 100%;

  // 侧边栏
  .sidebar-wrapper {
    width: $sideBarWidth;
    background-color: $menuBg;
    transition: width $sideBarDuration;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
  }

  // 右侧
  .main-box {
    height: 100%;
    margin-left: $sideBarWidth;
    transition: margin-left $sideBarDuration;

    // 主体内容区域
    .app-main {
      overflow-y: auto;
      height: calc(100vh - 50px) !important;
      padding: 20px;
      background-color: skyblue;
    }
  }
}
</style>
