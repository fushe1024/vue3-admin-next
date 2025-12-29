<script setup>
import { defaultSettings } from '@/settings'
import logo from '@/assets/logo.png'

defineProps({
  // 是否折叠侧边栏
  collapse: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <div class="logo">
    <transition enter-active-class="animate__animated animate__fadeInLeft">
      <router-link :key="+collapse" class="link" to="/">
        <img :src="logo" width="25" height="25" />
        <!-- 侧边栏不折叠 - 显示标题 -->
        <span v-if="!collapse" class="title">
          {{ defaultSettings.title }}
        </span>
      </router-link>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $navbar-height;
  background-color: $sidebar-logo-background;

  .link {
    @include flex-center;
    height: 100%;

    // 标题
    .title {
      flex-shrink: 0;
      margin-left: 10px;
      font-size: 14px;
      font-weight: bold;
      color: $sidebar-logo-text-color;
    }
  }
}
</style>
