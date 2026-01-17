<script setup></script>

<template>
  <div class="tags-view-wrapper">
    <el-scrollbar class="scrollbar-container" :view-style="{ height: '100%' }">
      <div class="tags-container" id="guide-tags">
        <el-tag class="tag-item" type="info">首页</el-tag>
        <el-tag class="tag-item" closable effect="dark" type="primary">测试</el-tag>
        <el-tag class="tag-item" closable type="info">测试</el-tag>
      </div>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss">
.tags-view-wrapper {
  height: $tags-view-height;
  background-color: var(--el-bg-color);
  border-top: 1px solid var(--el-border-color-light);
  padding: 0 15px;

  // 滚动条容器
  .scrollbar-container {
    white-space: nowrap;

    // 标签容器
    .tags-container {
      height: 100%;
      display: flex;
      align-items: center;
      gap: 8px;

      // 标签项
      .tag-item {
        cursor: pointer;
      }
    }
  }
}
</style>
