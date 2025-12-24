import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import md5 from 'md5'
import { loginApi, getUserInfoApi } from '@/api/user'
import router from '@/router'
import { setTimestamp } from '@/utils/auth'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }

    // 登录
    const login = ({ username, password }) => {
      return new Promise((resolve) => {
        loginApi({
          username,
          password: md5(password)
        }).then((res) => {
          setToken(res.token) // 设置token
          router.push('/')
          setTimestamp() // 设置时间戳
          resolve(res)
        })
      })
    }

    // 用户信息
    const userInfo = ref({})
    const setUserInfo = (info) => {
      userInfo.value = info
    }

    // 是否有用户信息
    const hasUserInfo = computed(() => {
      return Object.keys(userInfo.value).length > 0
    })

    // 获取用户信息
    const getUserInfo = async () => {
      const userInfo = await getUserInfoApi()
      setUserInfo(userInfo)
    }

    // 退出登录
    const logout = () => {
      setToken('')
      setUserInfo({})
      router.push('/login')
    }

    return {
      token,
      setToken,
      login,
      userInfo,
      hasUserInfo,
      setUserInfo,
      getUserInfo,
      logout
    }
  },
  {
    persist: true
  }
)
