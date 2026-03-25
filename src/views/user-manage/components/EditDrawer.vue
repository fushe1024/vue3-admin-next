<script setup>
import { ref, watch } from 'vue'
import { getRoleListApi } from '@/api/role'
import { getUserRoleApi, updateUserRoleApi } from '@/api/user-manage'

const props = defineProps({
  userId: {
    type: String
  }
})

const emit = defineEmits(['confirm-edit'])

// 抽屉是否可见
const drawerVisible = defineModel('modelValue', {
  type: Boolean,
  default: false,
  required: true
})

// 所有角色
const roleOptions = ref([])
const getRoleOptions = async () => {
  const res = await getRoleListApi()
  roleOptions.value = res
}

// 用户当前角色
const userRole = ref([])
const getUserRole = async (id) => {
  const { role } = await getUserRoleApi(id)
  userRole.value = role.map((item) => item.title)
}

// 监听用户ID变化
watch(
  () => props.userId,
  async (newUserId) => {
    await getRoleOptions()
    getUserRole(newUserId)
  }
)

// 关闭抽屉
const closeDrawer = () => {
  drawerVisible.value = false
}

// 取消编辑
const cancelEdit = () => {
  closeDrawer()
}

// 确认编辑
const confirmEdit = async () => {
  const roles = roleOptions.value.filter((item) => {
    return userRole.value.includes(item.title)
  })
  await updateUserRoleApi(props.userId, roles)
  emit('confirm-edit')
  closeDrawer()
}
</script>

<template>
  <div class="edit-user">
    <el-drawer v-model="drawerVisible" @close="closeDrawer" title="编辑用户" size="40%">
      <el-form ref="formRef" label-position="right" label-width="80">
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickname">
          <el-input placeholder="请输入用户昵称" />
        </el-form-item>
        <el-form-item label="所属部门" prop="department">
          <el-select placeholder="请选择">
            <el-option label="部门1" value="1" />
            <el-option label="部门2" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select placeholder="请选择">
            <el-option label="男" value="1" />
            <el-option label="女" value="0" />
            <el-option label="保密" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="userRole" multiple placeholder="请选择">
            <el-option v-for="role in roleOptions" :key="role.id" :value="role.title" />
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch width="60" inline-prompt active-text="正常" inactive-text="禁用" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button type="primary" @click="confirmEdit">确认</el-button>
        <el-button @click="cancelEdit">取消</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<style scoped></style>
