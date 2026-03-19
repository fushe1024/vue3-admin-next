<script setup>
import { ref, reactive } from 'vue'
import { Download } from '@element-plus/icons-vue'
import * as XLSX from 'xlsx'
import { getHeaderRow } from '@/utils/excel'
import { batchImportUserApi } from '@/api/user-manage'
import { isExcelFile } from '@/utils'
import { generateImportData } from './generate'

// 导入弹窗是否可见
const visible = defineModel('modelValue', {
  type: Boolean,
  required: true,
  default: false
})

// 导入成功事件
const emit = defineEmits(['import-success'])

const importFormRef = ref(null)

const importFormData = reactive({
  files: []
})
const importRules = reactive({
  files: [{ required: true, message: '请上传文件', trigger: ['blur'] }]
})

/**
 * 确认导入
 */
const confirmImport = async () => {
  // 校验文件数量
  if (importFormData.files.length > 1) {
    ElMessage.warning('只能上传一个文件')
    return
  }

  // 校验文件格式
  const file = importFormData.files[0].raw
  if (!isExcelFile(file)) {
    importFormData.files.length = 0
    ElMessage.warning('上传文件格式错误，请重新上传文件')
    return
  }

  // 异步读取 excel 文件内容
  const excelData = await readExcelFile(file)

  // 整理数据
  const importData = generateImportData(excelData)

  // 导入用户
  try {
    await batchImportUserApi(importData)
    emit('import-success')
  } catch (error) {
    ElMessage.error(error.message)
  } finally {
    closeDialog()
  }
}

/**
 * 读取 excel 文件内容
 * @param file Excel 文件
 * @returns 解析后的 JSON 数据和表头
 * */
const readExcelFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onload = (e) => {
      const arrayBuffer = e.target.result
      const workbook = XLSX.read(arrayBuffer, { type: 'array' })
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      const jsonData = XLSX.utils.sheet_to_json(worksheet)
      const headers = getHeaderRow(worksheet)
      resolve({ headers, jsonData })
    }

    reader.onerror = (error) => reject(error)
  })
}

/**
 * 下载导入模板
 */
// const downloadTemplate = () => {
//   UserAPI.downloadTemplate().then((response) => {
//     downloadFile(response)
//   })
// }

/**
 * 关闭弹窗
 */
const closeDialog = () => {
  importFormData.files.length = 0
  visible.value = false
}
</script>

<template>
  <el-dialog
    title="导入数据"
    v-model="visible"
    :align-center="true"
    width="600px"
    @close="closeDialog"
  >
    <el-form
      :model="importFormData"
      :rules="importRules"
      ref="importFormRef"
      style="padding-right: var(--el-dialog-padding-primary)"
    >
      <el-form-item label="文件" prop="files">
        <el-upload
          style="width: 100%"
          v-model:file-list="importFormData.files"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          drag
          :limit="1"
          :auto-upload="false"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <template #tip>
            <div class="el-upload__tip">
              格式为 *.xlsx/ *.xls, 大小不超过 1M
              <el-link type="primary" :icon="Download" href="https://www.baidu.com">
                下载模板
              </el-link>
            </div>
          </template>
        </el-upload>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button
        type="primary"
        @click="confirmImport"
        :disabled="importFormData.files.length === 0"
      >
        确定
      </el-button>
      <el-button @click="closeDialog">取消</el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
