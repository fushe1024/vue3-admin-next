<script setup></script>

<template>
  <div class="not-found">
    <h1>404 Not Found</h1>
    <p class="not-found-msg">
      页面不存在，请检查 URL 是否正确
      <a href="/" class="not-found-link">返回首页</a>
    </p>
  </div>
</template>

<style scoped lang="scss">
.not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  h1 {
    font-size: 48px;
    color: #ff4d4f;
  }

  .not-found-msg {
    font-size: 18px;
    color: #999;
    margin-top: 20px;

    a {
      color: #ff4d4f;
    }
  }
}
</style>
