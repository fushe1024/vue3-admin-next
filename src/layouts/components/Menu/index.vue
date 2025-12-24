<script setup>
import { User, HomeFilled, Setting } from '@element-plus/icons-vue'

import { useAppStore } from '@/store'
const appStore = useAppStore()
</script>

<template>
  <el-scrollbar height="100%">
    <el-menu class="el-menu-vertical-demo" :collapse="!appStore.sidebar.opened">
      <el-menu-item index="1">
        <el-icon><HomeFilled /></el-icon>
        <template #title>首页</template>
      </el-menu-item>

      <el-sub-menu index="2">
        <template #title>
          <el-icon><User /></el-icon>
          <span>用户模块</span>
        </template>
        <el-menu-item index="1-1">
          <template #title>用户列表</template>
        </el-menu-item>
        <el-menu-item index="1-2">
          <template #title>用户角色</template>
        </el-menu-item>
      </el-sub-menu>

      <el-menu-item index="3">
        <el-icon><Setting /></el-icon>
        <template #title>系统设置</template>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<style scoped></style>
