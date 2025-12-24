<script setup>
import { Switch } from '@element-plus/icons-vue'
import { ref, computed } from 'vue'

// 当前语言
const currentLang = ref('cn')

// 是否禁用
const disabled = computed(() => currentLang.value === 'cn')

// 切换语言
const handleCommand = (command) => {
  currentLang.value = command
}
</script>

<template>
  <el-dropdown trigger="click" @command="handleCommand">
    <template #default>
      <el-icon>
        <Switch />
      </el-icon>
    </template>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="disabled" command="cn">中文</el-dropdown-item>
        <el-dropdown-item :disabled="!disabled" command="en">English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped></style>
