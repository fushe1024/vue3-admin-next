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
  // Token 相关
  const token = ref(storage.get(STORAGE_KEYS.ACCESS_TOKEN_KEY) || '')
  const setToken = (newToken) => {
    token.value = newToken
    storage.set(STORAGE_KEYS.ACCESS_TOKEN_KEY, newToken)
  }

  // 用户信息
  const userInfo = ref(storage.get(STORAGE_KEYS.USER_INFO_KEY) || {})
  const hasUserInfo = computed(() => Object.keys(userInfo.value).length > 0)
  const setUserInfo = (info) => {
    userInfo.value = info
    storage.set(STORAGE_KEYS.USER_INFO_KEY, info)
  }

  // 获取用户信息
  const getUserInfo = async () => {
    const userInfo = await getUserInfoApi()
    setUserInfo(userInfo)
  }

  // 登录
  const login = ({ username, password }) => {
    return new Promise((resolve, reject) => {
      loginApi({ username, password: md5(password) })
        .then((res) => {
          setTimestamp() // 设置时间戳
          setToken(res.token) // 设置token
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  // 退出登录
  const tagsViewStore = useTagsViewStore()

  const logout = () => {
    // 清空标签页列表
    tagsViewStore.clearTagsViewList()

    // 清空用户信息和 token
    setToken('')
    setUserInfo({})

    // 重置权限路由
    resetPermissionRoutes()

    storage.clear() // 清除存储
    router.push('/login')
  }

  return {
    token,
    userInfo,
    hasUserInfo,
    setToken,
    login,
    setUserInfo,
    getUserInfo,
    logout
  }
})

/**
 * 在组件外部使用UserStore的钩子函数
 * @see https://pinia.vuejs.org/core-concepts/outside-component-usage.html
 */
export function useUserStoreHook() {
  return useUserStore(store)
}
