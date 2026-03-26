import Layout from '@/layouts/index.vue'

export default {
  path: '/article',
  name: 'articleRanking',
  component: Layout,
  redirect: '/article/ranking',
  meta: {
    title: 'article',
    icon: 'article',
    hidden: false
  },
  children: [
    {
      path: 'ranking',
      component: () => import('@/views/article-ranking/index.vue'),
      meta: {
        title: 'articleRanking',
        icon: 'article-ranking',
        hidden: false
      }
    },
    {
      path: 'detail/:id',
      component: () => import('@/views/article-detail/index.vue'),
      meta: {
        title: 'articleDetail',
        hidden: true
      }
    }
  ]
}
