/**
 * 过滤路由表，根据用户权限
 * @param {*} routes 动态路由表
 * @param {*} permissions 用户权限点
 * @returns 过滤后的路由表，只包含用户有权限的路由
 */
export const filterRoutesByPermission = (routes, permissions) => {
  return routes.filter((route) => {
    return permissions.includes(route.name)
  })
}
