import router, { dynamicRoutes, globalRoutes } from '@/router'
import NProgress from '@/plugins/nprogress'
import { useUserStoreHook } from '@/store/modules/user'
import { filterRoutesByPermission } from '../utils'

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
      }
      return
    }

    // 已登录访问登录页，重定向到首页
    if (to.path === '/login') {
      next({ path: '/' })
      return
    }

    // 已经登陆
    if (!userStore.hasUserInfo) {
      await userStore.getUserInfo()

      // 根据用户权限，过滤路由表
      const filteredRoutes = filterRoutesByPermission(
        dynamicRoutes,
        userStore.userInfo.permission.menus
      )

      // 添加过滤后的路由 & 全局路由
      filteredRoutes.forEach((route) => router.addRoute(route))
      router.addRoute(globalRoutes)

      // 添加路由后
      next({ ...to, replace: true })
      return
    }

    next()
  })

  // 路由后置守卫
  router.afterEach(() => {
    NProgress.done()
  })
}
