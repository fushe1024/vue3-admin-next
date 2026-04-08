<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { createArticleApi, updateArticleApi, getArticleDetailApi } from '@/api/article'

const route = useRoute()
const id = route.params.id

const formRef = ref(null) // 表单引用

// 表单校验规则
const rules = ref({
  title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
  type: [{ required: true, message: '请选择文章类型', trigger: 'change' }]
})

// 表单数据
const formData = ref({
  title: '',
  type: ''
})

const editorType = ref('rich') // 编辑器类型
const markdownContent = ref('') // Markdown 内容
const richContent = ref('') // 富文本内容

// 获取文章内容
const getContent = () => {
  return editorType.value === 'markdown' ? markdownContent.value : richContent.value
}

// 获取文章详情
const getArticleDetail = async () => {
  if (!id) return
  const res = await getArticleDetailApi(id)
  formData.value.title = res.title
  formData.value.type = res.type
  // TODO: 设置文章使用的编辑器类型
  markdownContent.value = res.content
  richContent.value = res.content
}
getArticleDetail()

// 提交文章
const submitArticle = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
  } catch {
    ElMessage.error('请填写完整文章信息')
    return
  }

  if (id) {
    // 更新文章逻辑
    const objData = {
      id,
      ...formData.value,
      content: getContent()
    }
    await updateArticleApi(objData)
  } else {
    // 创建文章逻辑
    const objData = {
      ...formData.value,
      content: getContent()
    }
    await createArticleApi(objData)
  }

  ElMessage.success(id ? '文章更新成功' : '文章创建成功')
  formRef.value.resetFields()
  markdownContent.value = ''
  richContent.value = ''
}
</script>

<template>
  <el-card class="article-create">
    <!-- 文章信息 -->
    <el-form ref="formRef" :model="formData" :rules="rules" inline>
      <el-form-item label="文章标题" prop="title" :rules="rules.title">
        <el-input
          v-model="formData.title"
          clearable
          placeholder="请输入文章标题"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="文章类型" prop="type">
        <el-select
          v-model="formData.type"
          placeholder="请选择文章类型"
          style="width: 150px"
        >
          <el-option label="原创" value="original" />
          <el-option label="转载" value="reprint" />
        </el-select>
      </el-form-item>
    </el-form>

    <!-- 编辑器 -->
    <el-tabs v-model="editorType">
      <el-tab-pane label="Markdown" name="markdown">
        <MarkdownEditor v-if="editorType === 'markdown'" v-model="markdownContent" />
      </el-tab-pane>

      <el-tab-pane label="富文本" name="rich">
        <WangEditor v-if="editorType === 'rich'" v-model="richContent" />
      </el-tab-pane>
    </el-tabs>

    <!-- 提交按钮 -->
    <el-row justify="end" style="margin-top: 20px">
      <el-button type="primary" @click="submitArticle">
        {{ id ? '更新' : '创建' }}
      </el-button>
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
