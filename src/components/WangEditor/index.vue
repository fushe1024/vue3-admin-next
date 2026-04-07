<script setup>
import '@wangeditor-next/editor/dist/css/style.css'
import { Toolbar, Editor } from '@wangeditor-next/editor-for-vue'
import { i18nChangeLanguage } from '@wangeditor-next/editor'
import { ref, shallowRef, onBeforeUnmount, nextTick } from 'vue'
import { watchLanguageChange } from '@/utils/i18n'
import { useAppStore } from '@/store'

defineProps({
  height: {
    type: String,
    default: '500px'
  }
})

// 双向绑定
const modelValue = defineModel('modelValue', {
  type: String,
  required: false
})

// 编辑器实例，必须 shallowRef
const editorRef = shallowRef()

// 编辑器 key，用于重新创建 editor
const editorKey = ref(0)

// 工具栏配置
const toolbarConfig = ref({})

// 编辑器配置
const editorConfig = ref({
  placeholder: '请输入内容...',
  MENU_CONF: {}
})

// 记录 editor 实例，重要！
const handleCreated = (editor) => {
  editorRef.value = editor
}

const appStore = useAppStore()

// 监听语言变化
watchLanguageChange(async () => {
  // 切换 wangeditor 语言
  i18nChangeLanguage(appStore.language === 'zh-cn' ? 'zh-CN' : 'en')

  // 销毁旧 editor
  if (editorRef.value) {
    editorRef.value.destroy()
    editorRef.value = null
  }

  // 重新创建 editor
  editorKey.value++

  await nextTick()
})

// 组件销毁时，也及时销毁编辑器，重要！
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (!editor) return
  editor.destroy()
})
</script>

<template>
  <div style="z-index: 999; border: 1px solid var(--el-border-color)">
    <!-- 工具栏-->
    <Toolbar
      :editor="editorRef"
      mode="simple"
      :default-config="toolbarConfig"
      style="border-bottom: 1px solid var(--el-border-color)"
    />
    <!-- 编辑区-->
    <Editor
      v-model="modelValue"
      :style="{ height: height, overflowY: 'hidden' }"
      :default-config="editorConfig"
      mode="simple"
      :key="editorKey"
      @on-created="handleCreated"
    />
  </div>
</template>
