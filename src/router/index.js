import { createRouter, createWebHashHistory } from 'vue-router'
import { publicRoutes, privateRoutes } from './routes'

// 合并路由表
export const constantRoutes = [...publicRoutes, ...privateRoutes]

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 })
})

// 全局注册路由
export function setupRouter(app) {
  app.use(router)
}

export default router
