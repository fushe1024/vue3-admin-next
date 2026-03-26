<script setup>
import MenuItem from './components/MenuItem.vue'
import { useAppStore, useSettingsStore } from '@/store'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { mergeRoutesByPath, generateMenuFromRoutes } from '@/utils/route'

const router = useRouter()
const appStore = useAppStore()
const settingsStore = useSettingsStore()

// 合并路由表，根据路径合并子路由
const mergedRoutes = mergeRoutesByPath(router.getRoutes())

// 从路由表中生成菜单项
const menuItems = generateMenuFromRoutes(mergedRoutes)

// 获取当前激活的菜单路径
const activePath = computed(() => router.currentRoute.value.path)
</script>

<template>
  <el-menu
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
