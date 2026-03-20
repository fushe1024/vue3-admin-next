<script setup>
import { ref, reactive, computed } from 'vue'
import {
  Search,
  Refresh,
  Plus,
  Delete,
  Upload,
  View,
  Download,
  Edit
} from '@element-plus/icons-vue'
import { getUserManageListApi, deleteUserApi } from '@/api/user-manage'
import { watchLanguageChange } from '@/utils/i18n'
import { formatDate } from '@/utils/format'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import ImportDialog from './components/ImportDialog.vue'
import ExportDialog from './components/ExportDialog.vue'
import { useRouter } from 'vue-router'

const { t } = useI18n()

const formRef = ref(null) // 查询表单引用
const searchForm = reactive({
  keyword: '', // 查询关键词
  status: '' // 查询状态
})

const userList = ref([]) // 用户列表
const loading = ref(false) // 加载状态

// 分页数据
const paginationData = reactive({
  currentPage: 1, // 当前页码
  pageSize: 5, // 每页条数
  total: 0 // 总条数
})

// 获取用户列表
const getUserList = async () => {
  loading.value = true
  const res = await getUserManageListApi({
    page: paginationData.currentPage,
    size: paginationData.pageSize
  })
  userList.value = res.list
  paginationData.total = res.total
  loading.value = false
}
getUserList()

// 监听语言变化
watchLanguageChange(getUserList)

// 分页改变时触发
const handlePaginationChange = () => {
  getUserList()
}

// 查询 & 重置逻辑
const handleQuery = () => {
  console.log(searchForm)
}
const handleReset = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
}

// 新增用户
const handleAddUser = () => {
  console.log('新增用户')
}

// 选中用户ID
const selectedUsersId = ref([])
const isDelBtnDisabled = computed(() => selectedUsersId.value.length === 0)
const handleSelectionChange = (val) => {
  selectedUsersId.value = val.map((item) => item.id)
}

// 删除逻辑
const deleteUser = (id = null) => {
  /* eslint-disable-next-line no-undef */
  ElMessageBox.confirm(t('userManage.removeConfirm'), t('userManage.removeDialogTitle'), {
    cancelButtonText: t('userManage.cancel'),
    confirmButtonText: t('userManage.confirm'),
    type: 'warning'
  }).then(async () => {
    const userId = id ? id : selectedUsersId.value

    // 调用删除接口
    await deleteUserApi(userId)

    // 刷新用户列表
    getUserList()

    ElMessage({
      type: 'success',
      message: t('userManage.removeSuccess')
    })
  })
}

// 导入逻辑
const dialogVisible = ref(false) // 导入弹窗显示状态
const openDialog = () => {
  dialogVisible.value = true
}
const importSuccess = () => {
  getUserList()
  ElMessage.success('导入成功')
}

// 导出逻辑
const dialogStatus = ref(false) // 导出弹窗显示状态
const handleExport = () => {
  dialogStatus.value = true
}
const exportSuccess = () => {
  ElMessage.success('导出成功，请下载文件')
}

// 查看用户详情
const router = useRouter()
const handleViewUser = (user) => {
  router.push(`/user/info/${user._id}`)
}
</script>

<template>
  <div class="user-manage">
    <!-- 筛选表单 -->
    <div class="filter-section">
      <el-form ref="formRef" :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item :label="$t('userManage.keywords')" prop="keyword">
          <el-input
            v-model="searchForm.keyword"
            :placeholder="$t('userManage.placeholder')"
            clearable
            width="200px"
          />
        </el-form-item>

        <el-form-item :label="$t('userManage.status')" prop="status">
          <el-select
            :placeholder="$t('userManage.all')"
            v-model="searchForm.status"
            style="width: 100px"
          >
            <el-option :label="$t('userManage.normal')" value="1"></el-option>
            <el-option :label="$t('userManage.disabled')" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleQuery">
            {{ $t('userManage.query') }}
          </el-button>
          <el-button :icon="Refresh" @click="handleReset">
            {{ $t('userManage.reset') }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-card>
      <el-row class="table-section__toolbar" justify="space-between">
        <!-- 新增删除按钮区域 -->
        <el-col :span="12">
          <el-button type="success" :icon="Plus" @click="handleAddUser">
            {{ $t('userManage.newAdd') }}
          </el-button>
          <el-button
            type="danger"
            :icon="Delete"
            :disabled="isDelBtnDisabled"
            @click="deleteUser(null)"
          >
            {{ $t('userManage.remove') }}
          </el-button>
        </el-col>

        <!-- 导入导出按钮区域 -->
        <el-col :span="12">
          <el-row justify="end">
            <el-button :icon="Upload" @click="openDialog">
              {{ $t('userManage.import') }}
            </el-button>
            <el-button :icon="Download" @click="handleExport">
              {{ $t('userManage.export') }}
            </el-button>
          </el-row>
        </el-col>
      </el-row>

      <!-- 表格区域 -->
      <el-row class="table-section__body">
        <el-table
          @selection-change="handleSelectionChange"
          v-loading="loading"
          :data="userList"
          style="width: 100%"
          border
          stripe
        >
          <el-table-column type="selection" width="50" align="center" />

          <!-- 用户名列 -->
          <el-table-column
            prop="username"
            width="150"
            :label="$t('userManage.username')"
            align="center"
          />
          <!-- 昵称列 -->
          <el-table-column
            prop="nickname"
            width="100"
            :label="$t('userManage.nickname')"
            align="center"
          >
            无
          </el-table-column>

          <!-- 性别列 -->
          <el-table-column :label="$t('userManage.gender')" width="80" align="center">
            <template #default="{ row }">
              {{
                true || row.gender === 1 ? $t('userManage.man') : $t('userManage.woman')
              }}
            </template>
          </el-table-column>

          <!-- 手机号列 -->
          <el-table-column
            prop="mobile"
            :label="$t('userManage.mobile')"
            width="120"
            align="center"
          />

          <!-- 角色列 -->
          <el-table-column :label="$t('userManage.role')" min-width="160" align="center">
            <template #default="{ row }">
              <div v-if="row.role && row.role.length > 0">
                <el-tag
                  v-for="item in row.role"
                  :key="item.id"
                  type="primary"
                  size="small"
                  disable-transitions
                  >{{ item.title }}</el-tag
                >
              </div>
              <div v-else>
                <el-tag size="small">{{ $t('userManage.defaultRole') }}</el-tag>
              </div>
            </template>
          </el-table-column>

          <!-- 邮箱列 -->
          <el-table-column
            prop="email"
            :label="$t('userManage.email')"
            align="center"
            width="160"
          >
            123456789@qq.com
          </el-table-column>

          <!-- 状态列 -->
          <el-table-column
            prop="status"
            :label="$t('userManage.status')"
            width="100"
            align="center"
          >
            <template #default="{ row }">
              <el-tag
                :type="true || row.status === 1 ? 'success' : 'danger'"
                disable-transitions
                size="small"
              >
                {{
                  true || row.status === 1
                    ? $t('userManage.normal')
                    : $t('userManage.disabled')
                }}
              </el-tag>
            </template>
          </el-table-column>

          <!-- 操作时间列 -->
          <el-table-column
            prop="openTime"
            :label="$t('userManage.openTime')"
            width="180"
            align="center"
          >
            <template #default="{ row }">
              {{ formatDate(row.openTime) }}
            </template>
          </el-table-column>

          <!-- 查看、编辑、删除列 -->
          <el-table-column :label="$t('userManage.action')" fixed="right" width="200">
            <template #default="{ row }">
              <el-button
                type="primary"
                size="small"
                text
                :icon="View"
                @click="handleViewUser(row)"
              >
                {{ $t('userManage.show') }}
              </el-button>
              <el-button type="primary" size="small" text :icon="Edit">
                {{ $t('userManage.edit') }}
              </el-button>
              <el-button
                type="danger"
                size="small"
                text
                :icon="Delete"
                @click="deleteUser(row._id)"
              >
                {{ $t('userManage.remove') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>

      <!-- 分页区域 -->
      <el-row justify="end">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[5, 20, 30, 50]"
          v-model:page-size="paginationData.pageSize"
          v-model:current-page="paginationData.currentPage"
          :total="paginationData.total"
          @change="handlePaginationChange"
        />
      </el-row>
    </el-card>

    <!-- 导入数据弹窗 -->
    <import-dialog v-model="dialogVisible" @import-success="importSuccess" />

    <!-- 导出数据弹窗 -->
    <export-dialog v-model="dialogStatus" @export-success="exportSuccess" />
  </div>
</template>

<style lang="scss" scoped>
.user-manage {
  // 筛选区域
  .filter-section {
    padding: 12px 12px 0;
    margin-bottom: 8px;
    background-color: var(--el-bg-color-overlay);
    border: 1px solid var(--el-border-color-light);
    border-radius: 4px;
  }

  // 表格区域
  .table-section__body {
    margin: 8px 0px 20px;

    .el-button.is-text {
      padding: 0;
      margin: 0 8px 0 0;
    }
  }
}
</style>
