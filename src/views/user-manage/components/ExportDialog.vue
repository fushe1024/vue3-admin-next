<script setup>
import { ref } from 'vue'
import { getAllUserManageApi } from '@/api/user-manage'
import { User_Data_Map, formatJsonData } from '../utils/generate'
import { export_json_to_excel } from '@/utils/excel'

// 弹窗是否可见
const visible = defineModel('modelValue', {
  type: Boolean,
  required: true,
  default: false
})

const emit = defineEmits(['export-success'])

const exportFileName = ref('')

const defaultExportFileName = '用户数据'

/**
 * 确认导出
 */
const confirmExport = async () => {
  // 调用接口获取用户数据 （或者利用本地用户数据）
  const { list } = await getAllUserManageApi()

  // 格式化导出数据
  const data = formatJsonData(list)

  // 导出数据 & 下载数据
  export_json_to_excel({
    header: Object.keys(User_Data_Map),
    data,
    fileName: exportFileName.value || defaultExportFileName,
    autoWidth: true,
    bookType: 'xlsx'
  })

  // 导出成功后，触发事件
  emit('export-success')

  closeDialog()
}

/**
 * 关闭弹窗
 */
const closeDialog = () => {
  exportFileName.value = ''
  visible.value = false
}
</script>

<template>
  <el-dialog v-model="visible" title="导出用户数据" width="30%" @close="closeDialog">
    <el-input
      v-model="exportFileName"
      placeholder="请输入导出文件名(默认：用户数据.xlsx)"
      clearable
    />

    <template #footer>
      <el-button type="primary" @click="confirmExport">导出</el-button>
      <el-button @click="closeDialog"> 取消</el-button>
    </template>
  </el-dialog>
</template>

<style scoped></style>
