<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { getArticleRankingListApi } from '@/api/article'
import { watchLanguageChange } from '@/utils/i18n'
import { formatRelativeDate } from '@/utils/format'
import { View, Edit, Delete } from '@element-plus/icons-vue'
import dynamicColumns from './dynamic'
import { deleteArticleApi } from '@/api/article'
import { ElMessage } from 'element-plus'
import router from '@/router'

// 选项列表
const checkList = ref(dynamicColumns().map((item) => item.label))

// 筛选表格数据
const columns = computed(() => {
  return dynamicColumns().filter((item) => checkList.value.includes(item.label))
})

// 是否全选
const isAll = ref(false)

// 监听全选状态变化，更新选项列表
watch(
  checkList,
  () => {
    if (checkList.value.length === dynamicColumns().length) {
      isAll.value = true
    } else {
      isAll.value = false
    }
  },
  {
    immediate: true
  }
)

// 切换全选状态
const changeIsAll = (selected) => {
  if (selected) {
    checkList.value = dynamicColumns().map((item) => item.label)
  } else {
    checkList.value = []
  }
}

// 分页数据
const pagination = reactive({
  page: 1,
  size: 5
})

// 数据总数
const total = ref(0)

// 文章排行榜列表
const articleRankingList = ref([])
const getArticleRankingList = async () => {
  const res = await getArticleRankingListApi(pagination)
  articleRankingList.value = res.list
  total.value = res.total
}
getArticleRankingList()

// 监听语言变化，重新获取数据
watchLanguageChange(getArticleRankingList)

// 分页改变时触发
const handlePaginationChange = () => {
  getArticleRankingList()
}

// 跳转到文章详情页
const handleArticleDetail = (id) => {
  router.replace(`/article/detail/${id}`)
}

// 跳转到文章编辑页
const handleArticleEdit = (id) => {
  router.replace(`/article/editor/${id}`)
}

// 处理文章删除
const handleDelete = async (id) => {
  await deleteArticleApi(id)
  getArticleRankingList()
  ElMessage.success('文章删除成功')
}
</script>

<template>
  <div class="article-ranking">
    <!-- 头部 -->
    <div class="header app-card">
      <div class="dynamic-display">
        <label>动态展示</label>
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="排名" value="排名" />
          <el-checkbox label="标题" value="标题" />
          <el-checkbox label="作者" value="作者" />
          <el-checkbox label="发布时间" value="发布时间" />
          <el-checkbox label="内容简介" value="内容简介" />
          <el-checkbox label="操作" value="操作" />
        </el-checkbox-group>
      </div>

      <el-switch
        @change="changeIsAll"
        v-model="isAll"
        inline-prompt
        active-text="是"
        inactive-text="否"
      />
    </div>

    <!-- 文章排行榜列表 -->
    <el-card>
      <el-table :data="articleRankingList" style="width: 100%">
        <el-table-column
          v-for="column in columns"
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
        >
          <template #default="{ row }">
            <!-- 发布时间格式化显示 -->
            <span v-if="column.prop === 'publicDate'">
              {{ formatRelativeDate(row.publicDate) }}
            </span>

            <!-- 操作按钮 -->
            <span v-else-if="column.prop === 'action'">
              <el-button
                type="primary"
                size="small"
                text
                :icon="View"
                @click="handleArticleDetail(row._id)"
                >查看</el-button
              >
              <el-button
                type="primary"
                size="small"
                text
                :icon="Edit"
                @click="handleArticleEdit(row._id)"
                >编辑</el-button
              >
              <el-button
                type="danger"
                size="small"
                text
                :icon="Delete"
                @click="handleDelete(row._id)"
                >删除</el-button
              >
            </span>

            <!-- 其他列数据 -->
            <span v-else>
              {{ row[column.prop] }}
            </span>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-box">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[5, 20, 30, 50]"
          v-model:page-size="pagination.size"
          v-model:current-page="pagination.page"
          :total="total"
          @change="handlePaginationChange"
        />
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.article-ranking {
  // 头部
  .header {
    padding-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    // 动态展示
    .dynamic-display {
      display: flex;
      align-items: center;

      label {
        font-size: 16px;
        font-weight: 500;
        margin-right: 20px;
      }
    }
  }

  // 表格操作按钮
  .el-button.is-text {
    padding: 0;
    margin: 0 8px 0 0;
  }

  // 分页组件
  .pagination-box {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
