<script setup>
import NavBar from './components/NavBar/index.vue'
import SideBar from './components/SideBar/index.vue'
import AppMain from './components/AppMain/index.vue'
import TagsView from './components/TagsView/index.vue'
import Settings from './components/Settings/index.vue'

import { useLayout } from '@/hooks'

const { isSidebarOpen, isShowTagsView, isShowSettings } = useLayout()
</script>

<template>
  <div class="layout-wrapper">
    <!-- 左侧菜单栏 -->
    <SideBar />

    <!-- 主体内容区 -->
    <div
      class="layout-main"
      :class="{ hasTagsView: isShowTagsView, 'layout-main-collapsed': !isSidebarOpen }"
    >
      <NavBar />
      <TagsView v-if="isShowTagsView" />
      <AppMain />
    </div>
  </div>

  <!-- 设置面板 - 独立于布局组件 -->
  <Settings v-if="isShowSettings" />
</template>

<style scoped lang="scss">
.layout-wrapper {
  height: 100%;
  width: 100%;

  // 右侧
  .layout-main {
    height: 100%;
    margin-left: $sidebar-width;
    transition: margin-left $sidebar-duration;

    // 侧边栏收缩时
    &-collapsed {
      margin-left: $sidebar-width-collapsed;
    }
  }
}
</style>
