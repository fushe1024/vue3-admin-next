import { createI18n } from 'vue-i18n'
// import { useAppStoreHook } from '@/store/modules/app-store'
import { STORAGE_KEYS } from '@/constants'
import storage from '@/utils/storage'

// 本地语言包
import enLocale from './package/en.json'
import zhCnLocale from './package/zh-cn.json'

// 语言包
const messages = {
  'zh-cn': zhCnLocale,
  en: enLocale
}
// 获取语言
function getLanguage() {
  // const appStore = useAppStoreHook()
  // return appStore.language
  return storage.get(STORAGE_KEYS.LANGUAGE) || 'zh-cn'
}

// 创建 i18n 实例
const i18n = createI18n({
  legacy: false, // 禁用 legacy 模式
  locale: getLanguage(), // 默认语言
  fallbackLocale: 'en', // 备用语言
  messages, // 语言包
  globalInjection: true // 全局注册 $t 函数
})

// 全局注册 i18n
export function setupI18n(app) {
  app.use(i18n)
}

export default i18n
