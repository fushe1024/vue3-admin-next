import Layout from '@/layouts/index.vue'

export default {
  path: '/user',
  name: 'permissionList',
  component: Layout,
  redirect: '/user/manage',
  meta: {
    title: 'user',
    icon: 'personnel',
    hidden: false
  },
  children: [
    {
      path: 'permission',
      component: () => import('@/views/permission-list/index.vue'),
      meta: {
        title: 'permissionList',
        icon: 'permission',
        hidden: false
      }
    }
  ]
}
