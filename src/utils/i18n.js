// translate router.meta.title, be used in breadcrumb sidebar tagsview
import i18n from '@/i18n'
import { useAppStoreHook } from '@/store'
import { watch } from 'vue'

export function translateRouteTitle(title) {
  // 判断是否存在国际化配置，如果没有原生返回
  const hasKey = i18n.global.te('route.' + title)
  if (hasKey) {
    const translatedTitle = i18n.global.t('route.' + title)
    return translatedTitle
  }
  return title
}

// 监听语言变化
export const watchLanguageChange = (...callbacks) => {
  const appStore = useAppStoreHook()
  watch(
    () => appStore.language,
    () => {
      callbacks.forEach((cb) => cb(appStore.language))
    }
  )
}
