<script setup></script>

<template>
  <div>
    <p v-for="item in 10" :key="item" class="scrollbar-demo-item">{{ item }}</p>
  </div>
</template>

<style scoped lang="scss">
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>
