<script setup>
import { ref } from 'vue'

const inputRef = ref(null)
const isDragover = ref(false) // 拖拽高亮状态

// 点击上传
const handleClick = () => {
  inputRef.value.click()
}

// 文件选择变化
const handleFileChange = (e) => {
  console.log(e.target.files[0])
}

// 拖拽进入/经过
const handleDragover = () => {
  isDragover.value = true
}

// 拖拽离开
const handleDragleave = () => {
  isDragover.value = false
}

// 拖拽释放
const handleDrop = (e) => {
  console.log(e.dataTransfer.files[0])
}
</script>

<template>
  <el-card>
    <div class="upload-box">
      <!-- 拖拽区域 -->
      <!-- https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API -->
      <div
        class="upload-dragger"
        :class="{ 'is-dragover': isDragover }"
        @click="handleClick"
        @drop.stop.prevent="handleDrop"
        @dragover.stop.prevent="handleDragover"
        @dragenter.stop.prevent="handleDragover"
        @dragleave.stop.prevent="handleDragleave"
      >
        <el-icon class="upload-icon">
          <UploadFilled />
        </el-icon>

        <el-text>
          将文件拖拽到此处，或
          <el-text type="primary">点击上传</el-text>
        </el-text>
      </div>

      <!-- 隐藏输入框，点击上传按钮触发文件选择 -->
      <input
        ref="inputRef"
        type="file"
        accept=".xls,.xlsx"
        style="display: none"
        @change="handleFileChange"
      />

      <!-- 上传提示区域 -->
      <div class="upload-tips">格式为 *.xlsx / *.xls，文件不超过1M</div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.upload-box {
  margin: 0 auto;
  width: 450px;

  // Dragger
  .upload-dragger {
    padding: 20px;
    width: 100%;
    min-height: 200px;
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    // dragover 状态
    &.is-dragover {
      border-color: var(--el-color-primary);
      background-color: var(--el-color-primary-light-9);
      border-width: 2px;
    }

    // Hover
    &:hover {
      border-color: var(--el-color-primary);
    }

    // Icon
    .upload-icon {
      margin-bottom: 20px;
      font-size: 60px;
      color: #bbb;
    }
  }

  // Tips
  .upload-tips {
    color: var(--el-text-color-regular);
    font-size: 12px;
    margin-top: 7px;
  }
}
</style>
