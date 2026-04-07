import router, { dynamicRoutes, globalRoutes } from '@/router'
import NProgress from '@/plugins/nprogress'
import { useUserStoreHook } from '@/store/modules/user'
import { filterRoutesByPermission } from './utils'

// 控制动态路由是否已经添加
let isRoutesAdded = false

// 记录已经添加的动态路由名称
let addedRouteNames = []

// 路由守卫：权限守卫
export function setupPermissionGuard() {
  const whiteList = ['/login', '/404', '/401']

  router.beforeEach(async (to, from, next) => {
    NProgress.start()

    const userStore = useUserStoreHook()

    // 检查用户是否登录
    if (!userStore.token) {
      if (whiteList.includes(to.path)) {
        next()
      } else {
        next(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
      }
      return
    }

    // 已经登录，访问登录页
    if (to.path === '/login') {
      next({ path: '/' })
      return
    }

    // 检查路由是否已经添加
    if (!isRoutesAdded) {
      // 检查用户信息是否已经获取
      if (!userStore.hasUserInfo) {
        await userStore.getUserInfo()
      }

      // 筛选出用户有权限的路由
      const filteredRoutes = filterRoutesByPermission(
        dynamicRoutes,
        userStore.userInfo.permission.menus
      )

      // 动态添加路由 & 记录路由名称
      filteredRoutes.forEach((route) => {
        router.addRoute(route)
        addedRouteNames.push(route.name)
      })

      // 动态添加全局路由
      router.addRoute(globalRoutes)

      // 标记路由已添加
      isRoutesAdded = true

      next({ ...to, replace: true })
      return
    }

    next()
  })

  // 路由守卫：权限守卫 - 后置守卫
  router.afterEach(() => {
    NProgress.done()
  })
}

// 重置权限路由
export function resetPermissionRoutes() {
  addedRouteNames.forEach((name) => {
    if (router.hasRoute(name)) {
      router.removeRoute(name)
    }
  })

  addedRouteNames = []
  isRoutesAdded = false
}
