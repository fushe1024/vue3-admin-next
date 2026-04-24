import router, { dynamicRoutes, globalRoutes } from '@/router'
import NProgress from '@/plugins/nprogress'
import { useUserStoreHook } from '@/store/modules/user'
import { filterRoutesByPermission } from './utils'

let isRoutesAdded = false
let addedRouteNames = []

export function setupPermissionGuard() {
  const whiteList = ['/login', '/404', '/401']

  router.beforeEach(async (to, from, next) => {
    NProgress.start()

    const userStore = useUserStoreHook()

    /* ---------------- 未登录 ---------------- */
    if (!userStore.token) {
      if (whiteList.includes(to.path)) {
        next()
      } else {
        next(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
      }
      return
    }

    /* ---------------- 已登录访问 login ---------------- */
    if (to.path === '/login') {
      next('/')
      return
    }

    /* ---------------- 动态路由（只执行一次） ---------------- */
    if (!isRoutesAdded) {
      try {
        // 获取用户信息
        if (!userStore.hasUserInfo) {
          await userStore.getUserInfo()
        }

        // 权限过滤
        const accessRoutes = filterRoutesByPermission(
          dynamicRoutes,
          userStore.userInfo.permission.menus
        )

        // 添加动态路由 + 记录 name
        accessRoutes.forEach((route) => {
          router.addRoute(route)
          if (route.name) {
            addedRouteNames.push(route.name)
          }
        })

        // 添加兜底路由
        router.addRoute(globalRoutes)

        isRoutesAdded = true

        // 重新匹配
        next({ ...to, replace: true })
      } catch {
        userStore.logout()
        next('/login')
      }

      return
    }

    next()
  })

  router.afterEach(() => {
    NProgress.done()
  })
}

/* ---------------- 重置权限路由 ---------------- */

export function resetPermissionRoutes() {
  addedRouteNames.forEach((name) => {
    if (router.hasRoute(name)) {
      router.removeRoute(name)
    }
  })

  addedRouteNames = []
  isRoutesAdded = false
}
