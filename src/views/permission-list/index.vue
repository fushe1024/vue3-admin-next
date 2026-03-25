<script setup>
import { Plus, Delete } from '@element-plus/icons-vue'
import { watchLanguageChange } from '@/utils/i18n'
import { getPermissionListApi } from '@/api/permission'
import { ref } from 'vue'

// 加载状态
const loading = ref(false)

// 权限列表
const permissionList = ref([])

// 获取权限列表
const getPermissionList = async () => {
  loading.value = true
  const res = await getPermissionListApi()
  permissionList.value = res
  loading.value = false
}
// 监听语言变化
getPermissionList()
watchLanguageChange(getPermissionList)
</script>

<template>
  <el-card>
    <el-row>
      <el-button type="success" :icon="Plus"> 新增权限 </el-button>
      <el-button type="danger" :icon="Delete"> 删除权限 </el-button>
    </el-row>

    <el-table
      v-loading="loading"
      :data="permissionList"
      row-key="id"
      style="width: 100%; margin-top: 20px"
      border
      default-expand-all
      stripe
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="permissionName" label="权限名称" />
      <el-table-column prop="permissionMark" label="权限编码" />
      <el-table-column prop="permissionDesc" label="权限描述" />
    </el-table>
  </el-card>
</template>

<style scoped></style>
