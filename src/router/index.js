import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layouts/index.vue'
import UserManage from './modules/user-manage'
import RoleList from './modules/role-list'
import PermissionList from './modules/permission-list'
import Article from './modules/article'
import ArticleCreate from './modules/article-create'

// 动态路由
export const dynamicRoutes = [
  UserManage,
  RoleList,
  PermissionList,
  Article,
  ArticleCreate
]

// 全局路由
export const globalRoutes = {
  path: '/:pathMatch(.*)*',
  name: '404',
  component: () => import('@/views/error/404.vue')
}

// 静态路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: 'dashboard',
          icon: 'homepage',
          hidden: false,
          affix: true
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }) // 刷新时，滚动条位置还原
})

// 全局注册路由
export function setupRouter(app) {
  app.use(router)
}

export default router
