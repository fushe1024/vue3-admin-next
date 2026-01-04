/**
 * 根据 vue-router routes 生成菜单数据
 */
export function generateMenuFromRoutes(routes) {
  const result = []

  const isDynamicPath = (path) => path.includes(':')

  const processRoute = (route, parentPath = '') => {
    const { path, name, meta, children } = route

    // 拼完整路径
    const fullPath = parentPath ? `${parentPath}/${path}`.replace(/\/+/g, '/') : path

    // 动态路由不进菜单
    if (isDynamicPath(fullPath)) {
      return null
    }

    // 当前路由是否是一个“菜单项”
    const isMenu =
      meta && typeof meta === 'object' && meta.title && meta.icon && !meta.hidden

    // 情况 1：不是菜单，但有 children（典型：Layout /）
    if (!isMenu && children && children.length) {
      const childMenus = []

      for (const child of children) {
        const menu = processRoute(child, fullPath)
        if (menu) {
          childMenus.push(menu)
        }
      }

      // 直接把 children 提升给上层
      return childMenus
    }

    // 情况 2：是真正的菜单
    if (isMenu) {
      const menuItem = {
        path: fullPath,
        name: name ? String(name) : '',
        meta: {
          title: String(meta.title),
          ...(meta.icon ? { icon: String(meta.icon) } : {})
        }
      }

      if (children && children.length) {
        const childMenus = []

        for (const child of children) {
          const menu = processRoute(child, fullPath)
          if (menu) {
            if (Array.isArray(menu)) {
              childMenus.push(...menu)
            } else {
              childMenus.push(menu)
            }
          }
        }

        if (childMenus.length) {
          menuItem.children = childMenus
        }
      }

      return menuItem
    }

    return null
  }

  for (const route of routes) {
    const menu = processRoute(route)

    if (!menu) continue

    if (Array.isArray(menu)) {
      result.push(...menu)
    } else {
      result.push(menu)
    }
  }

  return result
}
