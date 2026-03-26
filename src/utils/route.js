/**
 * 合并路由表，根据路径合并子路由
 * @param {*} routes 原始路由表
 * @returns 合并后的路由表数组
 */
export function mergeRoutesByPath(routes) {
  const map = new Map()
  const result = []

  // 先存入 map
  routes.forEach((route) => {
    map.set(route.path, {
      ...route,
      children: []
    })
  })

  map.forEach((route) => {
    const path = route.path

    const segments = path.split('/').filter(Boolean)

    let parent = null

    // 从长到短查找父级
    for (let i = segments.length - 1; i > 0; i--) {
      const parentPath = '/' + segments.slice(0, i).join('/')

      if (map.has(parentPath)) {
        parent = map.get(parentPath)
        break
      }
    }

    if (parent) {
      parent.children.push(route)
    } else {
      result.push(route)
    }
  })

  return result
}

/**
 * 从路由表中生成菜单项
 * @param {*} routes 合并后的路由表
 * @returns 菜单项数组
 */
export function generateMenuFromRoutes(routes) {
  const isDynamicPath = (path) => path.includes(':')

  const traverse = (routes) => {
    const res = []

    routes.forEach((route) => {
      const { path, name, meta = {}, children = [] } = route

      if (!meta.title || meta.hidden) return
      if (isDynamicPath(path)) return

      const menu = {
        path,
        name: name ? String(name) : '',
        meta: {
          title: String(meta.title),
          ...(meta.icon ? { icon: String(meta.icon) } : {})
        }
      }

      const childMenus = traverse(children)

      if (childMenus.length) {
        menu.children = childMenus
      }

      res.push(menu)
    })

    return res
  }

  return traverse(routes)
}
