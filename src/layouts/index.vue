<script setup>
import NavBar from './components/NavBar/index.vue'
import SideBar from './components/SideBar/index.vue'
import AppMain from './components/AppMain/index.vue'
import TagsView from './components/TagsView/index.vue'
import { ref } from 'vue'

import { useAppStore } from '@/store'
const appStore = useAppStore()

const showTabs = ref(true)
</script>

<template>
  <div class="layout-wrapper">
    <!-- 侧边栏 -->
    <side-bar></side-bar>

    <!-- 右侧区域  -->
    <div
      class="layout-main"
      :class="{
        'layout-main-collapsed': !appStore.sidebar.opened,
        hasTagsView: showTabs
      }"
    >
      <!-- 导航栏 -->
      <nav-bar class="flex-header"></nav-bar>

      <!-- 页签 -->
      <tags-view v-if="showTabs"></tags-view>

      <!-- 内容区域 -->
      <app-main class="app-main"></app-main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout-wrapper {
  height: 100%;
  width: 100%;

  // 右侧
  .layout-main {
    position: relative;
    height: 100%;
    margin-left: $sidebar-width;
    transition: margin-left $sidebar-duration;

    // 侧边栏收缩时
    &.layout-main-collapsed {
      margin-left: $sidebar-width-collapsed;
    }

    // 主体内容区域
    .app-main {
      overflow-y: auto;
      height: calc(100vh - $navbar-height);
      padding: 20px;
      background-color: #000;
    }

    // 页签存在时
    &.hasTagsView .app-main {
      height: calc(100vh - $navbar-height - $tags-view-height);
    }
  }
}
</style>
