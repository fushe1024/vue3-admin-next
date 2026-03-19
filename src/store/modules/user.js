import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import md5 from 'md5'
import { loginApi, getUserInfoApi } from '@/api/user'
import { setTimestamp } from '@/utils/auth'
import { store } from '@/store'
import { STORAGE_KEYS } from '@/constants'
import storage from '@/utils/storage'
import router from '@/router'

export const useUserStore = defineStore('user', () => {
  // Token 相关
  const token = ref(storage.get(STORAGE_KEYS.ACCESS_TOKEN_KEY) || '')
  const setToken = (newToken) => {
    token.value = newToken
    storage.set(STORAGE_KEYS.ACCESS_TOKEN_KEY, newToken)
  }

  // 用户信息
  const userInfo = ref({})
  const hasUserInfo = computed(() => Object.keys(userInfo.value).length > 0)
  const setUserInfo = (info) => {
    userInfo.value = info
  }

  // 登录逻辑
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
  const logout = () => {
    setToken('')
    setUserInfo({})
    router.push('/login')
  }

  // 获取用户信息
  const getUserInfo = async () => {
    const userInfo = await getUserInfoApi()
    setUserInfo(userInfo)
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
