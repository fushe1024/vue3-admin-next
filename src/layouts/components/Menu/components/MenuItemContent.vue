<script setup>
import { computed } from 'vue'

const props = defineProps({
  icon: {
    type: String,
    default: null
  },
  title: {
    type: String,
    default: null
  }
})

// 计算属性：判断是否是 el-icon 图标
const isElIcon = computed(() => props.icon?.startsWith('el-icon'))

// 计算属性：获取 el-icon 组件名
const iconComponent = computed(() => props.icon?.replace('el-icon-', ''))
</script>

<template>
  <!-- 菜单图标 -->
  <template v-if="icon">
    <el-icon v-if="isElIcon" class="menu-icon">
      <component :is="iconComponent" />
    </el-icon>

    <template v-else>
      <svg-icon class="menu-icon" size="18" :name="icon" />
    </template>
  </template>

  <!-- 菜单标题 -->
  <span v-if="title">{{ title }}</span>
</template>

<style scoped lang="scss">
.menu-icon {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  margin-right: 5px;
  color: $menu-text;
  fill: $menu-text;
}
</style>
