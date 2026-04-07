import { useUserStoreHook } from '@/store/modules/user'

export const hasPerm = {
  mounted(el, binding) {
    const userStore = useUserStoreHook()

    // 获取用户权限点
    const permission = userStore.userInfo.permission.points || []

    // 获取指令参数
    const value = binding.value

    // 检查指令值是否存在
    if (!value) return

    // 检查用户是否有指定权限点中的任意一个
    const hasPermission = Array.isArray(value)
      ? value.some((p) => permission.includes(p))
      : permission.includes(value)

    // 如果用户没有指定权限点，移除元素
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
}

// [ 'distributePermission')]
