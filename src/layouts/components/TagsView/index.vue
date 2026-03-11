<script setup>
import { useTagsViewStore } from '@/store'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import {
  computed,
  watch,
  nextTick,
  ref,
  reactive,
  watchEffect,
  onBeforeUnmount
} from 'vue'
import { watchLanguageChange, translateTagTitle } from '@/utils/i18n'

const router = useRouter()
const route = useRoute()

const tagsViewStore = useTagsViewStore()
const { tagsViewList } = storeToRefs(tagsViewStore)

// 当前选中的标签
const selectedTag = ref(null)

// 右键菜单状态
const contextMenu = reactive({
  size: 12,
  visible: false,
  x: 0,
  y: 0
})

// 判断是否为第一个标签
const isFirstView = computed(() => {
  if (!selectedTag.value) return false
  return (
    selectedTag.value.path === '/dashboard' ||
    selectedTag.value.fullPath === tagsViewList.value[1]?.fullPath
  )
})

// 判断是否为最后一个标签
const isLastView = computed(() => {
  if (!selectedTag.value) return false
  return (
    selectedTag.value.fullPath ===
    tagsViewList.value[tagsViewList.value.length - 1]?.fullPath
  )
})

// 监听路由变化
watch(
  route,
  (newView) => {
    if (!tagsViewStore.isTagsView(newView.path)) return

    tagsViewStore.addView({
      fullPath: newView.fullPath,
      name: newView.name,
      meta: newView.meta,
      query: newView.query,
      params: newView.params,
      path: newView.path,
      affix: newView.meta.affix || false, // 是否固定标签页，默认为 false
      title: translateTagTitle(newView)
    })
  },
  { immediate: true }
)

/**
 * 监听语言变化，更新标签页标题
 */
watchLanguageChange(() => {
  tagsViewStore.updateTagName()
})

/**
 * 打开右键菜单
 */
const openContextMenu = (tag, event) => {
  contextMenu.x = event.clientX
  contextMenu.y = event.clientY
  contextMenu.visible = true

  selectedTag.value = tag // 记录当前选中的标签
}

/**
 * 关闭右键菜单
 */
const closeContextMenu = () => {
  contextMenu.visible = false
}

/**
 * 刷新标签
 */
const refreshSelectedTag = (tag) => {
  if (!tag) return

  nextTick(() => {
    router.replace('/redirect' + tag.fullPath)
  })
}

/**
 * 关闭选中标签
 */
const closeSelectedTag = (tag) => {
  if (!tag) return

  tagsViewStore.closeCurrentView(tag)
}

/**
 * 关闭左侧标签
 */
const closeLeftTags = () => {
  if (!selectedTag.value) return
  tagsViewStore.delLeftViews(selectedTag.value)
}

/**
 * 关闭右侧标签
 */
const closeRightTags = () => {
  if (!selectedTag.value) return
  tagsViewStore.delRightViews(selectedTag.value)
}

/**
 * 关闭其它标签
 */
const closeOtherTags = () => {
  if (!selectedTag.value) return
  router.push(selectedTag.value)
  tagsViewStore.delOtherViews(selectedTag.value)
}

/**
 * 关闭所有标签
 */
const closeAllTags = () => {
  tagsViewStore.delAllViews()
}

// 右键菜单管理
const useContextMenuManager = () => {
  const handleOutsideClick = () => {
    closeContextMenu()
  }

  watchEffect(() => {
    if (contextMenu.visible) {
      document.addEventListener('click', handleOutsideClick)
    } else {
      document.removeEventListener('click', handleOutsideClick)
    }
  })

  // 组件卸载时清理
  onBeforeUnmount(() => {
    document.removeEventListener('click', handleOutsideClick)
  })
}

// 初始化右键菜单管理
useContextMenuManager()
</script>

<template>
  <div class="tags-view-wrapper">
    <el-scrollbar class="scrollbar-container" :view-style="{ height: '100%' }">
      <div class="tags-container" id="guide-tags">
        <el-tag
          class="tag-item"
          v-for="tag in tagsViewList"
          :key="tag.fullPath"
          :closable="!tag.affix"
          :effect="tagsViewStore.isActive(tag) ? 'dark' : 'light'"
          :type="tagsViewStore.isActive(tag) ? 'primary' : 'info'"
          @contextmenu.prevent="openContextMenu(tag, $event)"
          @close="closeSelectedTag(tag)"
          @click="
            router.push({
              path: tag.fullPath,
              query: tag.query
            })
          "
        >
          {{ tag.title }}
        </el-tag>
      </div>
    </el-scrollbar>

    <!-- 标签右键菜单 -->
    <Teleport to="body">
      <ul
        v-show="contextMenu.visible"
        class="contextmenu"
        :style="{ left: contextMenu.x + 'px', top: contextMenu.y + 'px' }"
      >
        <li @click="refreshSelectedTag(selectedTag)">
          <svg-icon name="refresh" :size="contextMenu.size" />
          刷新
        </li>
        <li v-if="!selectedTag?.affix" @click="closeSelectedTag(selectedTag)">
          <svg-icon name="close" :size="contextMenu.size" />
          关闭
        </li>
        <li @click="closeOtherTags">
          <svg-icon name="close_other" :size="contextMenu.size" />
          关闭其它
        </li>
        <li v-if="!isFirstView" @click="closeLeftTags">
          <svg-icon name="close_left" :size="contextMenu.size" />
          关闭左侧
        </li>
        <li v-if="!isLastView" @click="closeRightTags">
          <svg-icon name="close_right" :size="contextMenu.size" />
          关闭右侧
        </li>
        <li @click="closeAllTags(selectedTag)">
          <svg-icon name="close_all" :size="contextMenu.size" />
          关闭所有
        </li>
      </ul>
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
.tags-view-wrapper {
  height: $tags-view-height;
  background-color: var(--el-bg-color);
  border-top: 1px solid var(--el-border-color-light);
  padding: 0 15px;

  // 滚动条容器
  .scrollbar-container {
    white-space: nowrap;

    // 标签容器
    .tags-container {
      height: 100%;
      display: flex;
      align-items: center;
      gap: 8px;

      // 标签项
      .tag-item {
        cursor: pointer;
      }
    }
  }
}

// 右键菜单
.contextmenu {
  position: absolute;
  z-index: 3000;
  padding: 5px 0;
  margin: 0;
  font-size: v-bind('contextMenu.size + "px"');
  font-weight: 400;
  color: var(--el-text-color-primary);
  list-style-type: none;
  background: var(--el-bg-color);
  border-radius: 4px;
  box-shadow: var(--el-box-shadow-light);

  li {
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 7px 16px;
    margin: 0;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background: var(--el-fill-color-light);
    }
  }
}
</style>
