import Layout from '@/layouts/index.vue'

export default {
  path: '/article',
  name: 'articleCreate',
  component: Layout,
  redirect: '/article/ranking',
  meta: {
    title: 'article',
    icon: 'article',
    hidden: false
  },
  children: [
    {
      path: 'create',
      component: () => import('@/views/article-create/index.vue'),
      meta: {
        title: 'articleCreate',
        icon: 'article-create',
        hidden: false
      }
    },
    {
      path: 'editor/:id',
      component: () => import('@/views/article-create/index.vue'),
      meta: {
        title: 'articleEditor',
        hidden: true
      }
    }
  ]
}
