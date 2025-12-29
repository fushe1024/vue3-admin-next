<script setup>
import { computed } from 'vue'
import { ComponentSize } from '@/enums'
import { useAppStore } from '@/store'

const appStore = useAppStore()

// 尺寸选项
const sizeOptions = computed(() => {
  return [
    { label: '默认', value: ComponentSize.DEFAULT },
    { label: '大型', value: ComponentSize.LARGE },
    { label: '小型', value: ComponentSize.SMALL }
  ]
})

// 切换布局
const handleSizeChange = (command) => {
  appStore.changeSize(command)
  ElMessage.success('切换布局大小成功！')
}
</script>

<template>
  <!-- 布局大小 -->
  <el-tooltip content="布局大小" effect="dark" placement="bottom">
    <el-dropdown trigger="click" @command="handleSizeChange">
      <template #default>
        <svg-icon name="size" />
      </template>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item in sizeOptions"
            :key="item.value"
            :disabled="appStore.size == item.value"
            :command="item.value"
          >
            {{ item.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-tooltip>
</template>

<style scoped></style>
