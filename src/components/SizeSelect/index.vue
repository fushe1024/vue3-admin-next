<script setup>
import { computed } from 'vue'
import { ComponentSize } from '@/enums'
import { useAppStore } from '@/store'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const appStore = useAppStore()

// 尺寸选项
const sizeOptions = computed(() => {
  return [
    { label: t('sizeSelect.default'), value: ComponentSize.DEFAULT },
    { label: t('sizeSelect.large'), value: ComponentSize.LARGE },
    { label: t('sizeSelect.small'), value: ComponentSize.SMALL }
  ]
})

// 切换布局
const handleSizeChange = (size) => {
  appStore.changeSize(size)
  ElMessage.success(t('sizeSelect.message.success'))
}
</script>

<template>
  <!-- 布局大小 -->
  <el-tooltip :content="t('sizeSelect.tooltip')" effect="dark" placement="bottom">
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
