import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false }) // 进度条配置

// 公开路由表
const publicRoutes = [
  {
    path: '/',
    component: () => import('@/layout/index.vue')
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

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [...publicRoutes]
})

// 路由前置守卫
router.beforeEach((to, from, next) => {
  // 处理进度条
  NProgress.start()
  next()
})

// 路由后置守卫
router.afterEach(() => {
  // 处理进度条
  NProgress.done()
})

export default router
