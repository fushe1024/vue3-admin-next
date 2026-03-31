<script setup>
import { ref } from 'vue'

// 文章标题
const title = ref('')

// 文章类型
const type = ref('')

// 文章内容
const content = ref('测试内容')
</script>

<template>
  <el-card class="article-create">
    <el-form ref="formRef" inline>
      <el-form-item label="文章标题" prop="title">
        <el-input
          v-model="title"
          clearable
          placeholder="请输入文章标题"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="文章类型" prop="type">
        <el-select v-model="type" placeholder="请选择文章类型" style="width: 150px">
          <el-option label="原创" value="original" />
          <el-option label="转载" value="reprint" />
        </el-select>
      </el-form-item>
    </el-form>

    <el-tabs type="border-card" tab-position="bottom">
      <!-- Markdown 编辑器 -->
      <el-tab-pane label="Markdown">
        <MarkdownEditor v-model="content" />
      </el-tab-pane>

      <!-- 富文本编辑器 -->
      <el-tab-pane label="富文本">
        <WangEditor v-model="content" />
      </el-tab-pane>
    </el-tabs>

    <el-row justify="end" style="margin-top: 20px">
      <el-button type="primary">发布/提交</el-button>
    </el-row>
  </el-card>
</template>

<style lang="scss" scoped>
.article-create {
  .el-tabs {
    margin-top: 20px;
  }
}
</style>
