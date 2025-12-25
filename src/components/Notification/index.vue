<script setup>
import { Bell } from '@element-plus/icons-vue'
</script>

<template>
  <el-dropdown trigger="click">
    <el-badge :value="5" :offset="[4, 1]">
      <el-icon>
        <Bell />
      </el-icon>
    </el-badge>

    <template #dropdown>
      <div class="dropdown-content">
        <h2>通知列表</h2>
      </div>
    </template>
  </el-dropdown>
</template>

<style scoped lang="scss">
.dropdown-content {
  width: 300px;
  padding: 10px;
  background-color: var(--el-bg-color-overlay);
  border-radius: 4px;
}
</style>
