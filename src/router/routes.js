import Layout from '@/layouts/index.vue'

// 私有路由表
export const privateRoutes = [
  {
    path: '/user',
    name: 'User',
    component: Layout,
    redirect: '/user/manage',
    meta: {
      title: '用户管理',
      icon: 'personnel',
      hidden: false
    },
    children: [
      {
        path: 'manage',
        name: 'UserManage',
        component: () => import('@/views/user-manage/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'personnel-manage',
          hidden: false
        }
      },
      {
        path: 'role',
        name: 'UserRole',
        component: () => import('@/views/role-list/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'role',
          hidden: false
        }
      },
      {
        path: 'permission',
        name: 'UserPermission',
        component: () => import('@/views/permission-list/index.vue'),
        meta: {
          title: '权限管理',
          icon: 'permission',
          hidden: false
        }
      },
      {
        path: 'info/:id',
        name: 'UserInfo',
        component: () => import('@/views/user-info/index.vue'),
        meta: {
          title: '用户详情',
          hidden: false
        }
      },
      {
        path: 'import',
        name: 'UserImport',
        component: () => import('@/views/import/index.vue'),
        meta: {
          title: '用户导入',
          hidden: true
        }
      }
    ]
  },
  {
    path: '/article',
    name: 'Article',
    component: Layout,
    redirect: '/article/ranking',
    meta: {
      title: '文章管理',
      icon: 'article',
      hidden: false
    },
    children: [
      {
        path: 'ranking',
        name: 'ArticleRanking',
        component: () => import('@/views/article-ranking/index.vue'),
        meta: {
          title: '文章排名',
          icon: 'article-ranking',
          hidden: false
        }
      },
      {
        path: 'create',
        name: 'ArticleCreate',
        component: () => import('@/views/article-create/index.vue'),
        meta: {
          title: '文章创建',
          icon: 'article-create',
          hidden: false
        }
      },
      {
        path: 'detail/:id',
        name: 'ArticleDetail',
        component: () => import('@/views/article-detail/index.vue'),
        meta: {
          title: '文章详情',
          hidden: true
        }
      },
      {
        path: 'editor/:id',
        name: 'ArticleEditor',
        component: () => import('@/views/article-create/index.vue'),
        meta: {
          title: '文章编辑',
          hidden: true
        }
      }
    ]
  }
]

// 公开路由表
export const publicRoutes = [
  {
    path: '/',
    name: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '首页',
          icon: 'el-icon-HomeFilled',
          hidden: false
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/error/404.vue')
  }
]
