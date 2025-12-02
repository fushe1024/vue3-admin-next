import router from './router'
import { useUserStore } from '@/stores/modules/user'

// 白名单
const whiteList = ['/login', '/404', '/401']

// 路由前置守卫
router.beforeEach(async (to) => {
  const userStore = useUserStore()
  // 用户已经登录
  if (userStore.token) {
    // 登录之后不允许进入登录页
    if (to.path === '/login') {
      ElMessage.warning('您已经登陆，请勿重复登录')
      return '/'
    } else {
      return true
    }
  } else {
    //  没有token的情况， 只能进入白名单
    if (whiteList.includes(to.path)) {
      return true
    } else {
      // 没有token，并且不在白名单
      ElMessage.warning('请先登录')
      return '/login'
    }
  }
})
