<script setup>
import { useRoute, useRouter } from 'vue-router'
import { compile } from 'path-to-regexp'
import { ref, onBeforeMount, watch } from 'vue'

const currentRoute = useRoute()
const router = useRouter()

const breadcrumbs = ref([])

// 判断是否是仪表盘页面
const isDashboard = (route) => {
  const name = route && route.name
  if (!name) return false
  return name.toString().trim().toLowerCase() === 'Dashboard'.toLowerCase()
}

// 获取面包屑
const getBreadcrumb = () => {
  let matched = currentRoute.matched.filter((item) => item.meta && item.meta.title)

  // 如果不是仪表盘页面，手动添加首页面包屑
  const first = matched[0]
  if (!isDashboard(first)) {
    matched = [{ path: '/dashboard', meta: { title: '首页' } }].concat(matched)
  }

  // 过滤出需要显示的面包屑
  breadcrumbs.value = matched.filter(
    (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
  )
}

// 处理点击面包屑跳转
const handleLink = (item) => {
  console.log(compile(item.path)(currentRoute.params))

  // 处理动态路由参数
  router.push(compile(item.path)(currentRoute.params)).catch((err) => {
    console.warn(err)
  })
}

// 监听路由变化，更新面包屑
watch(
  () => currentRoute.path,
  (path) => {
    if (!path.startsWith('/redirect/')) {
      getBreadcrumb()
    }
  }
)

// 组件挂载时，初始化面包屑
onBeforeMount(() => {
  getBreadcrumb()
})
</script>

<template>
  <el-breadcrumb>
    <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
      <span class="last-item" v-if="index === breadcrumbs.length - 1">
        {{ item.meta.title }}
      </span>
      <a v-else @click.prevent="handleLink(item)">
        {{ item.meta.title }}
      </a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped lang="scss">
// 覆盖 element-plus 的样式
.el-breadcrumb {
  .el-breadcrumb__inner,
  .el-breadcrumb__inner a {
    font-weight: 400;
  }

  .last-item {
    color: #9ca3af;
  }
}
</style>
