<script setup>
import { computed } from 'vue'
import { useSettingsStore } from '@/store'
import variables from '@/styles/variables.module.scss'
import { ArrowUp } from '@element-plus/icons-vue'

// 主体内容区域高度
const appMainHeight = computed(() => {
  if (useSettingsStore().showTagsView) {
    return `calc(100vh - ${variables['navbar-height']} - ${variables['tags-view-height']})`
  } else {
    return `calc(100vh - ${variables['navbar-height']})`
  }
})
</script>

<template>
  <section class="app-main" :style="{ height: appMainHeight }">
    <div class="app-container">
      <router-view v-slot="{ Component }">
        <transition enter-active-class="animate__animated animate__fadeIn" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>

      <!-- 返回顶部按钮 -->
      <el-backtop target=".app-main">
        <el-icon>
          <ArrowUp />
        </el-icon>
      </el-backtop>
    </div>
  </section>
</template>

<style scoped lang="scss">
// 主体内容区域
.app-main {
  position: relative;
  overflow-y: auto;
  background-color: var(--el-bg-color-page);
}
</style>
