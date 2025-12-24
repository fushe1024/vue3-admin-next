import axios from 'axios'
import { useUserStore } from '@/store'
import { checkTimestamp } from './auth'

// 创建 axios 实例
const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    const userStore = useUserStore()
    // 添加 icode
    config.headers.icode = 'helloqianduanxunlianying'

    // 是否存在 token
    if (userStore.token) {
      // 添加 token
      config.headers.Authorization = `Bearer ${userStore.token}`

      // 判断是否超时
      if (!checkTimestamp()) {
        useUserStore().logout()
        ElMessage.error('登录过期，请重新登录')
        return Promise.reject(new Error('登录过期，请重新登录'))
      }
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    const { success, code, message, data } = response.data

    if (success && code === 200) {
      return data
    } else {
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    // 对响应错误做点什么
    if (error.response && error.response.data && error.response.data.code === 401) {
      useUserStore().logout()
    }
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default request
