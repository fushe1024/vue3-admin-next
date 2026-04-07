<script setup>
import { ref, shallowRef, onMounted, onBeforeUnmount, watch } from 'vue'
import { Editor } from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'

import { useAppStore } from '@/store'
import { watchLanguageChange } from '@/utils/i18n'

const appStore = useAppStore()

const props = defineProps({
  height: {
    type: String,
    default: '500px'
  }
})

// v-model
const modelValue = defineModel('modelValue')

const elRef = ref()
const editorRef = shallowRef()

// 初始化 editor
const initEditor = (content = '') => {
  editorRef.value = new Editor({
    el: elRef.value,
    height: props.height,
    initialEditType: 'markdown',
    previewStyle: 'vertical',
    initialValue: content || modelValue.value || '',
    placeholder: '请输入内容...',
    language: appStore.language === 'zh-cn' ? 'zh-CN' : 'en',
    events: {
      change() {
        const value = editorRef.value.getMarkdown()
        modelValue.value = value
      }
    }
  })
}

// 初始化
onMounted(() => {
  initEditor()
})

// 监听语言变化
watchLanguageChange(() => {
  const editor = editorRef.value
  if (!editor) return

  // 保存内容
  const content = editor.getMarkdown()

  // 销毁
  editor.destroy()

  // 清空 DOM（避免 toolbar 重复）
  elRef.value.innerHTML = ''

  // 重新创建
  initEditor(content)
})

// 监听外部更新
watch(modelValue, (val) => {
  const editor = editorRef.value
  if (!editor) return

  if (val !== editor.getMarkdown()) {
    editor.setMarkdown(val || '')
  }
})

// 销毁
onBeforeUnmount(() => {
  editorRef.value?.destroy()
})
</script>

<template>
  <div ref="elRef" />
</template>
