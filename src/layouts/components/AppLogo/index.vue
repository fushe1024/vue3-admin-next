<script setup>
import { useAppStore, useSettingsStore } from '@/store'

const appStore = useAppStore()
const settingsStore = useSettingsStore()
</script>

<template>
  <div class="logo" v-if="settingsStore.showAppLogo">
    <a href="/">
      <img
        src="https://foruda.gitee.com/images/1723603502796844527/03cdca2a_716974.gif"
        alt="logo"
      />
      <span class="title" :class="{ hide: !appStore.sidebar.opened }">
        vue3-admin-next
      </span>
    </a>
  </div>
</template>

<style scoped lang="scss">
.logo {
  height: $navbar-height;
  background-color: $sidebar-logo-background;

  a {
    @include flex-center;
    width: 100%;
    height: 100%;

    img {
      height: 30px;
      width: 30px;
      border-radius: 5px;
    }

    // 标题
    .title {
      margin-left: 10px;
      font-size: 14px;
      font-weight: 700;
      color: var(--sidebar-logo-text-color);
      transition: all $sidebar-duration;

      // 隐藏标题
      &.hide {
        display: none;
      }
    }
  }
}
</style>
