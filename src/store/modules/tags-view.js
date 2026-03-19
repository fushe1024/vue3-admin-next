import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { translateTagTitle } from '@/utils/i18n'

const tagsview_whileList = ['/redirect', '/login', '/404', '/401']

export const useTagsViewStore = defineStore(
  'tags-view',
  () => {
    const tagsViewList = ref([])
    const route = useRoute()
    const router = useRouter()

    const isActive = (view) => {
      return view.path === route.path
    }

    const isTagsView = (path) => {
      return !tagsview_whileList.includes(path)
    }

    const toLastView = (view) => {
      const latestView = tagsViewList.value.slice(-1)[0]
      if (latestView && latestView.fullPath) {
        router.push(latestView.fullPath)
      } else {
        if (view?.name === 'Dashboard') {
          router.replace('/redirect' + view.fullPath)
        } else {
          router.push('/')
        }
      }
    }

    /**
     * 更新 tagView 的标题
     */
    const updateTagName = () => {
      tagsViewList.value.forEach((v) => (v.title = translateTagTitle(v)))
    }

    /**
     * 添加 tagView
     */
    const addView = (view) => {
      // 如果已经存在于已访问的视图列表中或者是重定向地址，则不再添加
      if (view.path.startsWith('/redirect')) {
        return
      }
      if (tagsViewList.value.some((v) => v.path === view.path)) {
        return
      }

      // 如果视图是固定的（affix），则在已访问的视图列表的开头添加
      if (view.meta.affix) {
        tagsViewList.value.unshift(view)
      } else {
        // 如果视图不是固定的，则在已访问的视图列表的末尾添加
        tagsViewList.value.push(view)
      }
    }

    const delView = (view) => {
      return new Promise((resolve) => {
        tagsViewList.value = tagsViewList.value.filter((t) => t.path !== view.path)
        resolve([...tagsViewList.value])
      })
    }

    /**
     * 关闭当前 tagView
     */
    const closeCurrentView = (view) => {
      delView(view).then(() => {
        if (isActive(view)) {
          toLastView(view)
        }
      })
    }

    /**
     * 删除左侧 tagView
     */
    const delLeftViews = (view) => {
      return new Promise((resolve) => {
        // 找到当前视图在已访问的视图列表中的索引
        const index = tagsViewList.value.findIndex((v) => v.path === view.path)
        if (index === -1) {
          return
        }

        tagsViewList.value = tagsViewList.value.filter((v, i) => i >= index || v?.affix)

        resolve([...tagsViewList.value])
      })
    }

    /**
     * 删除右侧 tagView
     */
    const delRightViews = (view) => {
      return new Promise((resolve) => {
        const index = tagsViewList.value.findIndex((v) => v.path === view.path)
        if (index === -1) {
          return
        }

        tagsViewList.value = tagsViewList.value.filter((v, i) => i <= index || v?.affix)

        resolve([...tagsViewList.value])
      })
    }

    /**
     * 关闭其他 tagView
     */
    const delOtherViews = (view) => {
      return new Promise((resolve) => {
        tagsViewList.value = tagsViewList.value.filter(
          (v) => v?.affix || v.path === view.path
        )
        resolve([...tagsViewList.value])
      })
    }

    /**
     * 关闭所有 tagView
     */
    const delAllViews = (view) => {
      return new Promise((resolve) => {
        tagsViewList.value = tagsViewList.value.filter((v) => v?.affix)

        // 如果最后一个视图是固定的（affix），则需要将其设置为最后一个视图
        toLastView(view)

        resolve([...tagsViewList.value])
      })
    }

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
      closeCurrentView
    }
  },
  {
    persist: true
  }
)
