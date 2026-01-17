<script setup>
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import steps from './steps'
import { onMounted } from 'vue'
import { watchLanguageChange } from '@/utils/i18n'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// driver 实例
let driverObj = null

// 初始化 driver 实例
const initDriver = () => {
  driverObj = driver({
    showProgress: true,
    showButtons: ['next', 'previous', 'close'],
    nextBtnText: t('guide.next'),
    prevBtnText: t('guide.prev'),
    doneBtnText: t('guide.done')
  })
  driverObj.setSteps(steps(t))
}

// 打开引导
const openGuide = () => {
  driverObj.drive()
}

// 挂载时初始化 driver 实例
onMounted(() => {
  initDriver()
})

// 监听语言切换
watchLanguageChange(() => {
  initDriver()
})
</script>

<template>
  <div class="guide">
    <svg-icon name="guide" @click="openGuide" />
  </div>
</template>

<style scoped lang="scss"></style>
