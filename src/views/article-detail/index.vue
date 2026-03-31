<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getArticleDetailApi } from '@/api/article'
import { formatRelativeDate } from '@/utils/format'

const router = useRouter()
const route = useRoute()

// 文章ID
const id = route.params.id

// 文章详情数据
const articleDetail = ref({})

// 获取文章详情
const getArticleDetail = async () => {
  const res = await getArticleDetailApi(id)
  articleDetail.value = res
  console.log(res)
}
getArticleDetail()

// 处理文章编辑
const handleArticleEdit = () => {
  router.replace(`/article/editor/${id}`)
}
</script>

<template>
  <el-card class="article-detail">
    <div class="title">{{ articleDetail.title }}</div>

    <div class="article-info">
      <div class="left">
        <el-text>作者: {{ articleDetail.author }}</el-text>
        <el-text type="info">
          发布时间：
          {{ formatRelativeDate(articleDetail.publicDate) }}
        </el-text>
      </div>
      <div class="right">
        <el-text type="primary" @click="handleArticleEdit">编辑</el-text>
      </div>
    </div>

    <el-divider />

    <div class="content">
      <p>{{ articleDetail.content }}</p>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.article-detail {
  .title {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
  }

  .article-info {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;

    .left {
      display: flex;
      gap: 20px;
    }

    .right {
      cursor: pointer;
    }
  }

  .content {
    min-height: 500px;
  }
}
</style>
