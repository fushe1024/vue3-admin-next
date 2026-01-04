<script setup>
import MenuItemContent from './MenuItemContent.vue'

defineOptions({
  name: 'MenuItem'
})

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

console.log(props.item)
</script>

<template>
  <!-- el-sub-menu -->
  <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path">
    <template #title>
      <menu-item-content
        :title="item.meta.title"
        :icon="item.meta.icon"
      ></menu-item-content>
    </template>
    <!-- 循环渲染 -->
    <MenuItem v-for="item in item.children" :key="item.path" :item="item"></MenuItem>
  </el-sub-menu>

  <!-- el-menu-item -->
  <el-menu-item v-else :index="item.path">
    <menu-item-content
      :title="item.meta.title"
      :icon="item.meta.icon"
    ></menu-item-content>
  </el-menu-item>
</template>

<style scoped lang="scss">
// 菜单激活状态 - 图标填充颜色
.el-menu-item.is-active {
  :deep(.svg-icon) {
    fill: $menu-active-text;
  }
}

// 子菜单激活状态 - 背景颜色
.el-sub-menu.is-active {
  background-color: $menu-hover;
}
</style>
