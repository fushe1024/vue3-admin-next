<script setup>
import Logo from '@/layouts/components/AppLogo/index.vue'
import Menu from '@/layouts/components/Menu/index.vue'
import { useAppStore } from '@/store'

const appStore = useAppStore()
</script>

<template>
  <div
    class="layout-sidebar"
    :class="{ 'layout-sidebar-collapsed': !appStore.sidebar.opened }"
  >
    <logo></logo>
    <Menu></Menu>
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
  &.layout-sidebar-collapsed {
    width: $sidebar-width-collapsed;
  }
}
</style>
