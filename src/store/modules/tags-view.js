import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { translateTagTitle } from '@/utils/i18n'

/* ------------------------------ 忽略的路由 ------------------------------ */

const IGNORE_ROUTES = ['/redirect', '/login', '/404', '/401']

export const useTagsViewStore = defineStore(
  'tags-view',
  () => {
    /* ---------------------------------- 状态 ---------------------------------- */

    const tagsViewList = ref([])

    const route = useRoute()
    const router = useRouter()

    /* -------------------------------- 工具方法 -------------------------------- */

    // 是否当前激活
    const isActive = (view) => view.path === route.path

    // 是否需要加入 tagsView
    const isTagsView = (path) => !IGNORE_ROUTES.includes(path)

    // 跳转到最后一个 tag
    const toLastView = () => {
      const last = tagsViewList.value.at(-1)
      if (last?.fullPath) {
        router.push(last.fullPath)
      }
    }

    // 获取索引
    const getIndex = (view) => tagsViewList.value.findIndex((v) => v.path === view.path)

    /* ---------------------------------- 更新 ---------------------------------- */

    // 更新标题（国际化）
    const updateTagName = () => {
      tagsViewList.value.forEach((v) => {
        v.title = translateTagTitle(v)
      })
    }

    /* ---------------------------------- 新增 ---------------------------------- */

    // 添加 tag
    const addView = (view) => {
      // 忽略 redirect
      if (view.path.startsWith('/redirect')) return

      // 已存在
      if (tagsViewList.value.some((v) => v.path === view.path)) return

      // affix 固定在前
      if (view.meta?.affix) {
        tagsViewList.value.unshift(view)
      } else {
        tagsViewList.value.push(view)
      }
    }

    /* ---------------------------------- 删除 ---------------------------------- */

    // 删除单个
    const delView = (view) => {
      return new Promise((resolve) => {
        tagsViewList.value = tagsViewList.value.filter((v) => v.path !== view.path)
        resolve([...tagsViewList.value])
      })
    }

    // 删除左侧
    const delLeftViews = (view) => {
      return new Promise((resolve) => {
        const index = getIndex(view)
        if (index === -1) return

        tagsViewList.value = tagsViewList.value.filter(
          (v, i) => i >= index || v.meta?.affix
        )

        resolve([...tagsViewList.value])
      })
    }

    // 删除右侧
    const delRightViews = (view) => {
      return new Promise((resolve) => {
        const index = getIndex(view)
        if (index === -1) return

        tagsViewList.value = tagsViewList.value.filter(
          (v, i) => i <= index || v.meta?.affix
        )

        resolve([...tagsViewList.value])
      })
    }

    // 删除其他
    const delOtherViews = (view) => {
      return new Promise((resolve) => {
        tagsViewList.value = tagsViewList.value.filter(
          (v) => v.meta?.affix || v.path === view.path
        )

        resolve([...tagsViewList.value])
      })
    }

    // 删除全部
    const delAllViews = () => {
      return new Promise((resolve) => {
        tagsViewList.value = tagsViewList.value.filter((v) => v.meta?.affix)

        toLastView()

        resolve([...tagsViewList.value])
      })
    }

    /* ---------------------------------- 组合操作 ---------------------------------- */

    // 关闭当前
    const closeCurrentView = (view) => {
      delView(view).then(() => {
        if (isActive(view)) {
          toLastView()
        }
      })
    }

    // 清空
    const clearTagsViewList = () => {
      tagsViewList.value = []
    }

    /* ---------------------------------- 导出 ---------------------------------- */

    return {
      tagsViewList,

      isActive,
      isTagsView,
      toLastView,
      updateTagName,

      addView,
      delView,
      delLeftViews,
      delRightViews,
      delOtherViews,
      delAllViews,

      closeCurrentView,
      clearTagsViewList
    }
  },
  { persist: true }
)
