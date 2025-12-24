<script setup>
import NavbarActions from './components/NavbarActions.vue'
import { useAppStore } from '@/store'

const appStore = useAppStore()
const { toggleSidebar } = appStore
</script>

<template>
  <div class="nav-bar">
    <div class="flex-y-center">
      <!-- 菜单折叠按钮 -->
      <Hamburger :is-active="appStore.sidebar.opened" @toggle-click="toggleSidebar" />

      <!-- 面包屑导航 -->
      <Breadcrumb />
    </div>

    <!-- 导航栏操作区域 -->
    <navbar-actions />
  </div>
</template>

<style scoped lang="scss">
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #e8e8e8;
  padding-left: 15px;
  height: $navbarHeight;

  // 左侧 - 汉堡菜单和面包屑导航
  .flex-y-center {
    display: flex;
    align-items: center;
  }
}
</style>
