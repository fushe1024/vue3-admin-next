<script setup>
import { useAppStore } from '@/store'
const appStore = useAppStore()
</script>

<template>
  <div class="logo">
    <a href="/">
      <img
        src="https://foruda.gitee.com/images/1723603502796844527/03cdca2a_716974.gif"
        alt="logo"
      />
      <span :class="['title', { hide: !appStore.sidebar.opened }]">
        vue3-admin-next
      </span>
    </a>
  </div>
</template>

<style scoped lang="scss">
.logo {
  height: $navbarHeight;
  background-color: #2d3748;

  a {
    @include flex-center;
    height: inherit;

    img {
      margin-right: 10px;
      height: 30px;
      width: 30px;
      border-radius: 5px;
    }

    // 标题
    .title {
      color: #fff;

      // 隐藏标题
      &.hide {
        display: none;
      }
    }
  }
}
</style>
