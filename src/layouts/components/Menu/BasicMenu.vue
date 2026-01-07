<script setup>
import MenuItem from './components/MenuItem.vue'
import { useAppStore, useSettingsStore } from '@/store'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { generateMenuFromRoutes } from '@/utils/route'
import { constantRoutes } from '@/router'

const menuRef = ref(null)

const appStore = useAppStore()
const settingsStore = useSettingsStore()

// 路由实例
const router = useRouter()

const menuItems = generateMenuFromRoutes(constantRoutes)

// 获取当前激活的菜单路径
const activePath = computed(() => router.currentRoute.value.path)
</script>

<template>
  <el-menu
    ref="menuRef"
    :default-active="activePath"
    :collapse="!appStore.sidebar.opened"
    :popper-effect="settingsStore.theme"
    :unique-opened="false"
    :collapse-transition="appStore.sidebar.withoutAnimation"
    router
  >
    <!-- 菜单项 -->
    <MenuItem v-for="route in menuItems" :key="route.path" :item="route" />
  </el-menu>
</template>

<style scoped lang="scss"></style>
