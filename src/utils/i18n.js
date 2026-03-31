// translate router.meta.title, be used in breadcrumb sidebar tagsview
import i18n from '@/i18n'
import { useAppStoreHook } from '@/store/modules/app'
import { watch } from 'vue'

/**
 * 转换路由标题为国际化标题
 * @param {*} title
 * @returns 国际化后的标题
 */
export function translateRouteTitle(title) {
  // 检查是否存在国际化的标题
  const hasKey = i18n.global.te('route.' + title)
  if (hasKey) {
    const translatedTitle = i18n.global.t('route.' + title)
    return translatedTitle
  }
  return title
}

/**
 * 获取标签页标题，优先使用国际化标题，如果没有则使用路由名称或路径的最后一部分
 * @param route 当前路由对象
 * @returns 标签页标题
 */
export function translateTagTitle(route) {
  let title = ''

  if (!route.meta) {
    // 如果路由没有 meta 信息，使用路径的最后一部分作为标题
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1] || 'Unknown'
  } else {
    // 如果路由有 meta 信息，使用 translateRouteTitle 函数获取国际化标题
    title = translateRouteTitle(route.meta.title) || route.name || 'Unknown'
  }
  return title
}

// 监听语言变化函数
export function watchLanguageChange(...callbacks) {
  const appStore = useAppStoreHook()
  watch(
    () => appStore.language,
    () => {
      callbacks.forEach((cb) => cb(appStore.language))
    }
  )
}
