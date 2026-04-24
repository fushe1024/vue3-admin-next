import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import md5 from 'md5'
import { loginApi, getUserInfoApi } from '@/api/user'
import { setTimestamp } from '@/utils/auth'
import { store } from '@/store'
import { STORAGE_KEYS } from '@/constants'
import storage from '@/utils/storage'
import router from '@/router'
import { resetPermissionRoutes } from '@/router/guards/permission'
import { useTagsViewStore } from './tags-view'

export const useUserStore = defineStore('user', () => {
  /* ---------------------------------- Token ---------------------------------- */

  const token = ref(storage.get(STORAGE_KEYS.ACCESS_TOKEN_KEY) || '')

  // 设置 token（同步本地存储）
  const setToken = (newToken) => {
    token.value = newToken
    storage.set(STORAGE_KEYS.ACCESS_TOKEN_KEY, newToken)
  }

  /* -------------------------------- 用户信息 -------------------------------- */

  const userInfo = ref(storage.get(STORAGE_KEYS.USER_INFO_KEY) || {})

  // 是否已获取用户信息
  const hasUserInfo = computed(() => Object.keys(userInfo.value).length > 0)

  // 设置用户信息（同步本地存储）
  const setUserInfo = (info) => {
    userInfo.value = info
    storage.set(STORAGE_KEYS.USER_INFO_KEY, info)
  }

  /* ---------------------------------- 接口 ---------------------------------- */

  // 获取用户信息
  const getUserInfo = async () => {
    const res = await getUserInfoApi()
    setUserInfo(res)
  }

  // 登录
  const login = ({ username, password }) => {
    return new Promise((resolve, reject) => {
      loginApi({
        username,
        password: md5(password)
      })
        .then((res) => {
          // 记录登录时间戳
          setTimestamp()

          // 保存 token
          setToken(res.token)

          resolve(res)
        })
        .catch((err) => reject(err))
    })
  }

  /* ---------------------------------- 登出 ---------------------------------- */

  const tagsViewStore = useTagsViewStore()

  const logout = () => {
    // 清空标签页
    tagsViewStore.clearTagsViewList()

    // 清空用户状态
    setToken('')
    setUserInfo({})

    // 重置权限路由
    resetPermissionRoutes()

    // 清空本地存储
    storage.clear()

    // 跳转登录页
    router.push('/login')
  }

  /* ---------------------------------- 导出 ---------------------------------- */

  return {
    token,
    userInfo,
    hasUserInfo,

    setToken,
    setUserInfo,

    login,
    getUserInfo,
    logout
  }
})

/* ------------------------ 组件外使用 store（hook） ------------------------ */

/**
 * 在组件外部使用 UserStore
 * 适用于 router / utils 等场景
 */
export function useUserStoreHook() {
  return useUserStore(store)
}
