/**
 * 将路由配置转换为左侧菜单栏需要的数据结构
 * @param {Array} routes - 路由配置数组
 * @returns {Array} - 处理后的菜单数组
 */
export function generateMenuFromRoutes(routes) {
  const result = []

  // 递归处理路由
  const processRoute = (route, parentPath = '') => {
    const { path, name, meta, children } = route

    // 检查是否有 meta，并且 meta 中是否有 title 和 icon
    const hasValidMeta = meta && typeof meta === 'object' && meta.title && meta.icon

    // 如果没有有效的 meta 数据，则不显示在菜单中
    if (!hasValidMeta) {
      return null
    }

    // 构建完整的路径
    const fullPath = parentPath ? `${parentPath}/${path}`.replace(/\/+/g, '/') : path

    // 创建基础菜单项
    const menuItem = {
      path: fullPath,
      name: name ? String(name) : '',
      meta: {
        title: String(meta.title),
        icon: String(meta.icon)
      },
      children: []
    }

    // 如果有子路由，递归处理子路由
    if (children && children.length > 0) {
      for (const child of children) {
        const childMenuItem = processRoute(child, fullPath)
        if (childMenuItem) {
          menuItem.children.push(childMenuItem)
        }
      }

      // 如果处理后子菜单为空，则删除 children 属性
      if (menuItem.children.length === 0) {
        delete menuItem.children
      }
    }

    return menuItem
  }

  // 遍历所有路由
  for (const route of routes) {
    const menuItem = processRoute(route)
    if (menuItem) {
      result.push(menuItem)
    }
  }

  return result
}
