<script setup>
import { ref, reactive, computed, onMounted, nextTick, watch } from 'vue'
import {
  getArticleRankingListApi,
  deleteArticleApi,
  updateArticleRankingApi
} from '@/api/article'
import { watchLanguageChange } from '@/utils/i18n'
import { formatRelativeDate } from '@/utils/format'
import { View, Edit, Delete } from '@element-plus/icons-vue'
import dynamicColumns from './dynamic'
import { ElMessage } from 'element-plus'
import router from '@/router'
import Sortable from 'sortablejs'

/**
 * 所有列（只初始化一次，避免反复创建）
 */
const allColumns = dynamicColumns()

/**
 * 选中的列
 */
const checkList = ref(allColumns.map((i) => i.label))

/**
 * 当前显示列
 */
const columns = computed(() =>
  allColumns.filter((i) => checkList.value.includes(i.label))
)

/**
 * 是否全选
 */
const isAll = computed({
  get() {
    return checkList.value.length === allColumns.length
  },
  set(val) {
    checkList.value = val ? allColumns.map((i) => i.label) : []
  }
})

/**
 * 分页
 */
const pagination = reactive({
  page: 1,
  size: 5
})

const total = ref(0)

/**
 * 表格数据
 */
const articleRankingList = ref([])

/**
 * 加载中
 */
const loading = ref(false)

/**
 * 获取排行榜
 */
const getArticleRankingList = async () => {
  loading.value = true
  const res = await getArticleRankingListApi(pagination)
  articleRankingList.value = res.list
  total.value = res.total
  loading.value = false
}

getArticleRankingList()

/**
 * 监听语言变化
 */
watchLanguageChange(getArticleRankingList)

/**
 * 分页改变
 */
const handlePaginationChange = () => {
  getArticleRankingList()
}

/**
 * 查看文章
 */
const handleArticleDetail = (id) => {
  router.replace(`/article/detail/${id}`)
}

/**
 * 编辑文章
 */
const handleArticleEdit = (id) => {
  router.replace(`/article/editor/${id}`)
}

/**
 * 删除文章
 */
const handleDelete = async (id) => {
  await deleteArticleApi(id)
  getArticleRankingList()
  ElMessage.success('文章删除成功')
}

/**
 * Sortable 实例
 */
let sortableInstance = null

/**
 * 初始化拖拽
 */
const initSortable = () => {
  const tbody = document.querySelector('.el-table__body-wrapper tbody')

  if (!tbody) return

  // 销毁旧实例
  if (sortableInstance) {
    sortableInstance.destroy()
  }

  // 创建新实例
  sortableInstance = Sortable.create(tbody, {
    animation: 150, // 拖拽动画时间
    ghostClass: 'sortable-ghost', // 拖拽时的 ghost 元素类名
    handle: '.drag-icon', // 拖拽元素
    forceFallback: false, // 是否强制使用 fallback 模式

    // 拖拽结束时触发
    async onEnd(evt) {
      const { newIndex, oldIndex } = evt

      // 更新排名
      await updateArticleRankingApi({
        initRanking: articleRankingList.value[oldIndex].ranking,
        finalRanking: articleRankingList.value[newIndex].ranking
      })

      // 刷新排行榜
      articleRankingList.value = []
      getArticleRankingList()
      ElMessage.success('排名更新成功')
    }
  })
}

/**
 * 初始化拖拽
 */
onMounted(async () => {
  await nextTick()
  initSortable()
})

/**
 * 当列变化时重新初始化拖拽
 */
watch(columns, async () => {
  await nextTick()
  initSortable()
})
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

      <el-switch v-model="isAll" inline-prompt active-text="是" inactive-text="否" />
    </div>

    <!-- 表格 -->
    <el-card>
      <el-table :data="articleRankingList" style="width: 100%" :loading="loading">
        <!-- 拖拽列 -->
        <el-table-column width="50">
          <template #default>
            <span class="drag-icon">⋮⋮</span>
          </template>
        </el-table-column>

        <el-table-column
          v-for="column in columns"
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
        >
          <template #default="{ row }">
            <!-- 发布时间 -->
            <span v-if="column.prop === 'publicDate'">
              {{ formatRelativeDate(row.publicDate) }}
            </span>

            <!-- 操作 -->
            <span v-else-if="column.prop === 'action'">
              <el-button
                type="primary"
                size="small"
                text
                :icon="View"
                @click="handleArticleDetail(row._id)"
              >
                查看
              </el-button>

              <el-button
                type="primary"
                size="small"
                text
                :icon="Edit"
                @click="handleArticleEdit(row._id)"
              >
                编辑
              </el-button>

              <el-button
                type="danger"
                size="small"
                text
                :icon="Delete"
                @click="handleDelete(row._id)"
              >
                删除
              </el-button>
            </span>

            <!-- 默认 -->
            <span v-else>
              {{ row[column.prop] }}
            </span>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
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

  // 拖拽图标
  .drag-icon {
    cursor: move;
    color: var(--el-text-color-secondary);
    font-size: 16px;
  }

  // 拖拽图标悬停样式
  .drag-icon:hover {
    color: var(--el-color-primary);
  }

  // 拖拽中样式
  :deep(.sortable-ghost) {
    opacity: 0.6;
    background-color: var(--el-color-primary-light-9);
  }

  // 操作按钮
  .el-button.is-text {
    padding: 0;
    margin: 0 8px 0 0;
  }

  // 分页
  .pagination-box {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
