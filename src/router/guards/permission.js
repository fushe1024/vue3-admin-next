import router from '@/router'
import NProgress from '@/plugins/nprogress'
import { useUserStoreHook } from '@/store/modules/user'

export function setupPermissionGuard() {
  // 白名单
  const whiteList = ['/login', '/404', '/401']

  // 路由前置守卫
  router.beforeEach(async (to, from, next) => {
    NProgress.start()

    const userStore = useUserStoreHook()

    // 未登录处理
    if (!userStore.token) {
      if (whiteList.includes(to.path)) {
        next()
      } else {
        next(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
        NProgress.done()
      }
      return
    }

    // 已登录访问登录页，重定向到首页
    if (to.path === '/login') {
      next({ path: '/' })
      return
    }

    // 如果没有用户信息，获取用户信息
    if (!userStore.hasUserInfo) {
      await userStore.getUserInfo()
    }

    next()
  })
}

// 路由后置守卫
router.afterEach(() => {
  NProgress.done()
})
