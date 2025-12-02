import { ref } from 'vue'
import { defineStore } from 'pinia'
import md5 from 'md5'
import { login as loginApi } from '@/apis/system'
import router from '@/router'

export const useUserStore = defineStore(
  'user',
  () => {
    // 用户token
    const token = ref('')

    // 设置token
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
          setToken(res.token)
          router.push('/')
          resolve(res)
        })
      })
    }

    return { token, setToken, login }
  },
  {
    persist: true
  }
)
