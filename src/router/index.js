import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layouts/index.vue'

// 私有路由表
const privateRoutes = [
  {
    path: '/user',
    name: 'user',
    component: Layout,
    redirect: '/user/manage',
    meta: {
      title: '用户',
      icon: 'personnel'
    },
    children: [
      {
        path: 'manage',
        name: 'user-manage',
        component: () => import('@/views/user-manage/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'personnel-manage'
        }
      },
      {
        path: 'role',
        name: 'user-role',
        component: () => import('@/views/role-list/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'role'
        }
      },
      {
        path: 'permission',
        name: 'user-permission',
        component: () => import('@/views/permission-list/index.vue'),
        meta: {
          title: '权限管理',
          icon: 'permission'
        }
      },
      {
        path: 'info/:id',
        name: 'user-info',
        component: () => import('@/views/user-info/index.vue'),
        meta: {
          title: '用户详情'
        }
      },
      {
        path: 'import',
        name: 'user-import',
        component: () => import('@/views/import/index.vue'),
        meta: {
          title: '用户导入'
        }
      }
    ]
  },
  {
    path: '/article',
    name: 'article',
    component: Layout,
    redirect: '/article/ranking',
    meta: {
      title: '文章',
      icon: 'article'
    },
    children: [
      {
        path: 'ranking',
        name: 'article-ranking',
        component: () => import('@/views/article-ranking/index.vue'),
        meta: {
          title: '文章排名',
          icon: 'article-ranking'
        }
      },
      {
        path: 'create',
        name: 'article-create',
        component: () => import('@/views/article-create/index.vue'),
        meta: {
          title: '文章创建',
          icon: 'article-create'
        }
      },
      {
        path: 'detail/:id',
        name: 'article-detail',
        component: () => import('@/views/article-detail/index.vue'),
        meta: {
          title: '文章详情'
        }
      },
      {
        path: 'editor/:id',
        name: 'article-editor',
        component: () => import('@/views/article-create/index.vue'),
        meta: {
          title: '文章编辑'
        }
      }
    ]
  }
]

// 公开路由表
const publicRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    name: 'home',
    component: Layout,
    redirect: '/profile',
    children: [
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/profile/index.vue'),
        meta: {
          title: '个人中心',
          icon: 'el-icon-user'
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/error/404.vue')
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [...publicRoutes, ...privateRoutes]
})

// 全局注册路由
export function setupRouter(app) {
  app.use(router)
}

export default router
