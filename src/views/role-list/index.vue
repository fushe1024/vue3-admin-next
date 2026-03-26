<script setup>
import {
  Search,
  Refresh,
  Position,
  Edit,
  Plus,
  Delete,
  Switch,
  QuestionFilled
} from '@element-plus/icons-vue'
import { ref } from 'vue'
import { getRoleListApi, getRolePermissionApi, updateRolePermissionApi } from '@/api/role'
import { getPermissionListApi } from '@/api/permission'
import { watchLanguageChange } from '@/utils/i18n'
import { ElMessage } from 'element-plus'

// 加载状态
const loading = ref(false)

// 角色列表
const roleList = ref([])

// 获取角色列表
const getRoleList = async () => {
  loading.value = true
  const res = await getRoleListApi()
  roleList.value = res
  loading.value = false
}
getRoleList()
watchLanguageChange(getRoleList)

// 是否可见
const drawerVisible = ref(false)

// 选中角色ID
const roleId = ref(null)

// 是否展开所有节点
const isExpanded = ref(true)

// 是否父子联动
const parentChildLinked = ref(true)

// 菜单权限树引用
const permTreeRef = ref(null)

// 展开/收缩 菜单权限树
const togglePermTree = () => {
  isExpanded.value = !isExpanded.value
  if (permTreeRef.value) {
    console.log(permTreeRef.value)

    // 遍历所有节点
    Object.values(permTreeRef.value.store.nodesMap).forEach((node) => {
      if (isExpanded.value) {
        node.expand()
      } else {
        node.collapse()
      }
    })
  }
}

// 权限树数据
const permTreeData = ref([])
const getPermTreeData = async () => {
  const res = await getPermissionListApi()
  permTreeData.value = res
}

// 获取角色权限 & 设置选中节点
const getRolePermission = async () => {
  const userPermission = await getRolePermissionApi(roleId.value)
  permTreeRef.value.setCheckedKeys(userPermission)
}

// 打开抽屉逻辑
const openDrawer = async (id) => {
  drawerVisible.value = true
  roleId.value = id

  // 初始化权限树数据
  await getPermTreeData()

  // 获取角色权限 & 设置选中节点
  getRolePermission()
}

// 关闭抽屉逻辑
const closeDrawer = () => {
  drawerVisible.value = false
}

// 确认分配权限
const confirmAssign = async () => {
  const checkedKeys = permTreeRef.value.getCheckedKeys()
  await updateRolePermissionApi(roleId.value, checkedKeys)
  closeDrawer()
  ElMessage.success('分配成功')
}

const tableRowClassName = (data) => {
  if (data.row.id === '1') {
    return 'root-row'
  }
  return ''
}
</script>

<template>
  <div class="role-list">
    <!-- 筛选按钮 -->
    <div class="app-card">
      <el-form ref="formRef" :inline="true">
        <el-form-item label="关键字" prop="keyword">
          <el-input placeholder="请输入角色名称" clearable width="200px" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :icon="Search"> 查询 </el-button>
          <el-button :icon="Refresh"> 重置 </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 角色列表 -->
    <el-card>
      <el-row style="margin-bottom: 10px">
        <el-button type="success" :icon="Plus"> 新增 </el-button>
        <el-button type="danger" :icon="Delete"> 删除 </el-button>
      </el-row>
      <el-table
        v-loading="loading"
        :data="roleList"
        :row-class-name="tableRowClassName"
        style="width: 100%"
        border
      >
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column prop="title" label="角色名称" />
        <el-table-column prop="id" label="角色编码" width="100" />
        <el-table-column prop="describe" label="数据权限" />
        <el-table-column label="状态" width="80">
          <el-tag type="success"> 正常 </el-tag>
        </el-table-column>
        <el-table-column label="操作" width="210">
          <template #default="{ row }">
            <el-button
              v-hasPerm="['distributePermission']"
              type="primary"
              size="small"
              text
              :icon="Position"
              @click="openDrawer(row.id)"
            >
              分配权限
            </el-button>
            <el-button type="primary" size="small" text :icon="Edit"> 编辑 </el-button>
            <el-button type="danger" size="small" text :icon="Delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 权限分配抽屉 -->
    <el-drawer v-model="drawerVisible" @close="closeDrawer" title="权限分配" size="40%">
      <div class="header-box">
        <el-input placeholder="菜单权限名称" clearable />
        <div class="right">
          <el-button
            type="primary"
            size="small"
            plain
            :icon="Switch"
            @click="togglePermTree"
          >
            {{ isExpanded ? '收缩' : '展开' }}
          </el-button>

          <div class="tips">
            <el-checkbox v-model="parentChildLinked" style="margin-right: 5px">
              父子联动
            </el-checkbox>
            <el-tooltip
              effect="dark"
              content="如果只需勾选菜单权限，不需要勾选子菜单或者按钮权限，请关闭父子联动"
              placement="bottom-end"
            >
              <el-icon size="16" class="why-icon"><QuestionFilled /></el-icon>
            </el-tooltip>
          </div>
        </div>
      </div>

      <div class="tree-box">
        <el-tree
          ref="permTreeRef"
          :data="permTreeData"
          :props="{ label: 'permissionName', children: 'children' }"
          show-checkbox
          node-key="id"
          :default-expand-all="isExpanded"
          :check-strictly="!parentChildLinked"
        />
      </div>

      <!-- footer -->
      <template #footer>
        <el-button type="primary" @click="confirmAssign"> 确定 </el-button>
        <el-button @click="closeDrawer"> 取消 </el-button>
      </template>
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
// 表格操作按钮
.el-button.is-text {
  padding: 0;
  margin: 0 8px 0 0;
}

// 输入框和按钮容器
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;

  // 输入框宽度
  :deep(.el-input) {
    width: 350px !important;
  }

  // 按钮宽度
  .right {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 20px;

    .tips {
      display: flex;
      align-items: center;
      margin-left: 20px;

      // 问号 ？ 图标
      .why-icon {
        color: var(--el-color-primary);
      }
    }
  }
}

// 权限树
.tree-box {
  margin-top: 20px;
}

:deep(.el-table .root-row) {
  --el-table-tr-bg-color: var(--el-color-primary-light-9);
}
</style>
