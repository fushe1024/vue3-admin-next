<script setup>
import { computed } from 'vue'
import { LanguageEnum } from '@/enums'
import { useAppStore } from '@/store'
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()

const appStore = useAppStore()

// 语言选项
const langOptions = computed(() => {
  return [
    { label: '中文', value: LanguageEnum.ZH_CN },
    { label: 'English', value: LanguageEnum.EN }
  ]
})

// 切换语言
const handleLanguageChange = (lang) => {
  locale.value = lang
  appStore.changeLanguage(lang)
  ElMessage.success(t('langSelect.message.success'))
}
</script>

<template>
  <!-- 布局大小 -->
  <el-tooltip :content="t('langSelect.tooltip')" effect="dark" placement="bottom">
    <el-dropdown trigger="click" @command="handleLanguageChange">
      <template #default>
        <svg-icon name="language" />
      </template>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item in langOptions"
            :key="item.value"
            :disabled="appStore.language === item.value"
            :command="item.value"
          >
            {{ item.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-tooltip>
</template>

<style scoped></style>
