<script setup>
import { Search, Close } from '@element-plus/icons-vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 状态
const visible = ref(false)
const keyword = ref('')
const activeIndex = ref(-1)
const inputRef = ref()
const results = ref([])
const history = ref([])
const displayList = computed(() => (results.value.length ? results.value : history.value))

// ============================================
// 弹窗控制
// ============================================

const open = () => {
  keyword.value = ''
  results.value = []
  activeIndex.value = -1
  visible.value = true
  setTimeout(() => inputRef.value?.focus(), 100)
}

const close = () => {
  visible.value = false
}

// ============================================
// 搜索逻辑
// ============================================
const onSearch = () => {
  activeIndex.value = -1

  if (!keyword.value.trim()) {
    results.value = []
    return
  }

  // 搜索结果
  results.value = [
    {
      title: '员工管理',
      path: '/user/manage'
    },
    {
      title: '角色管理',
      path: '/user/role'
    }
  ]
}

const onGo = (item) => {
  close()
  router.push(item.path)
}

// ============================================
// 历史记录
// ============================================
</script>

<template>
  <div id="guide-search">
    <el-icon @click="open">
      <Search />
    </el-icon>

    <!-- 搜索弹窗 -->
    <el-dialog
      class="el-dialog"
      v-model="visible"
      width="30%"
      top="20vh"
      :show-close="false"
      @close="close"
    >
      <!-- 搜索框 -->
      <el-input
        ref="inputRef"
        v-model="keyword"
        :placeholder="$t('search.placeholder')"
        clearable
        :clear-icon="Close"
        @input="onSearch"
      >
        <template #prefix>
          <el-icon class="el-input__icon"><search /></el-icon>
        </template>
      </el-input>

      <!-- 结果区域 -->
      <div class="command-palette-results">
        <div v-if="displayList.length === 0" class="command-palette-empty">
          {{ $t('search.empty') }}
        </div>

        <ul v-else class="command-palette-list">
          <li
            v-for="(item, index) in displayList"
            :key="item.path + index"
            :class="['command-palette-item', { 'is-active': activeIndex === index }]"
            @mouseenter="activeIndex = index"
            @click="onGo(item)"
          >
            <div class="command-palette-item__title">{{ item.title }}</div>
            <div class="command-palette-item__path">{{ item.path }}</div>
          </li>
        </ul>
      </div>

      <!-- 底部区域 -->
      <div class="command-palette-hints">
        <div class="command-palette-hint">
          <div class="command-palette-hint__key"><svg-icon name="up"></svg-icon></div>
          <div class="command-palette-hint__key"><svg-icon name="down"></svg-icon></div>
          <span class="command-palette-hint__text">{{ $t('search.hints.switch') }}</span>
        </div>
        <div class="command-palette-hint">
          <div class="command-palette-hint__key"><svg-icon name="enter"></svg-icon></div>
          <span class="command-palette-hint__text">{{ $t('search.hints.select') }}</span>
        </div>
        <div class="command-palette-hint">
          <div class="command-palette-hint__key"><svg-icon name="esc"></svg-icon></div>
          <span class="command-palette-hint__text">{{ $t('search.hints.close') }}</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.el-dialog {
  // 搜索框圆角
  .el-input :deep(.el-input__wrapper) {
    border-radius: 10px;
  }

  // 结果列表
  .command-palette-results {
    margin: 15px 0;

    // 列表项
    .command-palette-item {
      padding: 10px 12px;
      border-radius: 10px;
      cursor: pointer;

      &__title {
        font-size: 14px;
        color: var(--el-text-color-primary);
      }
      &__path {
        margin-top: 2px;
        font-size: 12px;
        color: var(--el-text-color-secondary);
      }

      &.is-active {
        background-color: var(--el-color-primary-light-9);
      }

      &:hover {
        background-color: var(--el-color-primary-light-9);
      }
    }
  }

  // 底部区域
  .command-palette-hints {
    display: flex;
    align-items: center;
    gap: 14px;
    padding-top: 10px;
    border-top: 1px solid var(--el-border-color-lighter);

    // 按键项
    .command-palette-hint {
      display: flex;
      align-items: center;
      gap: 6px;

      // 按键
      .command-palette-hint__key {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 24px;
        padding: 0 8px;
        background: var(--el-bg-color-overlay);
        border: 1px solid var(--el-border-color-lighter);
        border-radius: 8px;
      }

      // 文本
      .command-palette-hint__text {
        font-size: 12px;
        color: var(--el-text-color-secondary);
      }
    }
  }
}
</style>
