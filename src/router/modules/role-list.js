import Layout from '@/layouts/index.vue'

export default {
  path: '/user',
  name: 'roleList',
  component: Layout,
  redirect: '/user/manage',
  meta: {
    title: 'user',
    icon: 'personnel',
    hidden: false
  },
  children: [
    {
      path: 'role',
      component: () => import('@/views/role-list/index.vue'),
      meta: {
        title: 'roleList',
        icon: 'role',
        hidden: false
      }
    }
  ]
}
