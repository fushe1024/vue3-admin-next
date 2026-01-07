<script setup>
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'
import screenfull from 'screenfull'

// 全屏状态
const isFullscreen = ref(false)

// 切换全屏图标名称
const iconName = computed(() => {
  return isFullscreen.value ? 'fullscreen-exit' : 'fullscreen'
})

// 切换全屏
const toggleFullscreen = () => {
  if (!screenfull.isEnabled) return
  screenfull.toggle()
}

// 监听全屏变化
const changeHandler = () => {
  isFullscreen.value = screenfull.isFullscreen
}

// 组件挂载时监听全屏变化
onMounted(() => {
  if (screenfull.isEnabled) {
    screenfull.on('change', changeHandler)
  }
})

// 组件卸载时移除全屏变化监听
onBeforeUnmount(() => {
  if (screenfull.isEnabled) {
    screenfull.off('change', changeHandler)
  }
})
</script>

<template>
  <div>
    <el-icon @click="toggleFullscreen">
      <svg-icon :name="iconName" />
    </el-icon>
  </div>
</template>

<style scoped></style>
