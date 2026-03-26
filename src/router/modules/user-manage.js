import Layout from '@/layouts/index.vue'

export default {
  path: '/user',
  name: 'userManage',
  component: Layout,
  redirect: '/user/manage',
  meta: {
    title: 'user',
    icon: 'personnel',
    hidden: false
  },
  children: [
    {
      path: 'manage',
      component: () => import('@/views/user-manage/index.vue'),
      meta: {
        title: 'userManage',
        icon: 'personnel-manage',
        hidden: false
      }
    },
    {
      path: 'info/:id',
      component: () => import('@/views/user-info/index.vue'),
      meta: {
        title: 'userInfo',
        hidden: false
      }
    },
    {
      path: 'import',
      component: () => import('@/views/import/index.vue'),
      meta: {
        title: 'excelImport',
        hidden: true
      }
    }
  ]
}
