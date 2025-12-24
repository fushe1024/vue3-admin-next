import { createRouter, createWebHashHistory } from 'vue-router'

// 公开路由表
const publicRoutes = [
  {
    path: '/',
    component: () => import('@/layouts/index.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/404.vue')
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [...publicRoutes]
})

// 全局注册路由
export function setupRouter(app) {
  app.use(router)
}

export default router
