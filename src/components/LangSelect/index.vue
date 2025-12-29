<script setup>
// import { MagicStick } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { LanguageEnum } from '@/enums'
import { useAppStore } from '@/store'

const appStore = useAppStore()

// 语言选项
const langOptions = computed(() => {
  return [
    { label: '中文', value: LanguageEnum.ZH_CN },
    { label: 'English', value: LanguageEnum.EN }
  ]
})

// 切换语言
const handleLanguageChange = (command) => {
  appStore.changeLanguage(command)
}
</script>

<template>
  <!-- 布局大小 -->
  <el-tooltip content="切换语言" effect="dark" placement="bottom">
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
