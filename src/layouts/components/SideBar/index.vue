<script setup>
import AppLogo from '@/layouts/components/AppLogo/index.vue'
import BasicMenu from '@/layouts/components/Menu/BasicMenu.vue'
import { useLayout } from '@/hooks'

const { isSidebarOpen, isShowLogo } = useLayout()
</script>

<template>
  <div class="layout-sidebar" :class="{ 'layout-sidebar-collapsed': !isSidebarOpen }">
    <!-- Logo -->
    <AppLogo v-if="isShowLogo" :collapse="!isSidebarOpen" />

    <!-- 主菜单内容 -->
    <el-scrollbar height="100%">
      <BasicMenu />
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss">
// 侧边栏
.layout-sidebar {
  width: $sidebar-width;
  background-color: $menu-background;
  transition: width $sidebar-duration;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 999;

  // 收缩侧边栏
  &-collapsed {
    width: $sidebar-width-collapsed;
  }

  // 移除菜单边框
  :deep(.el-menu) {
    border: none;
  }
}
</style>
