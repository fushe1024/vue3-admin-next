import axios from 'axios'
import { useUserStoreHook } from '@/store/modules/user'
import { useAppStoreHook } from '@/store/modules/app'
import { checkTimestamp, getAccessToken } from './auth'
import { ElMessage } from 'element-plus'

// 创建 axios 实例
const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    const appStore = useAppStoreHook()
    const userStore = useUserStoreHook()

    // 添加 icode
    config.headers.icode = 'helloqianduanxunlianying'

    // 设置国际化
    config.headers['Accept-Language'] = appStore.language

    const token = getAccessToken()

    // 是否存在 token
    if (token) {
      // 添加 token
      config.headers.Authorization = `Bearer ${token}`

      // 判断是否超时
      if (!checkTimestamp()) {
        userStore.logout()
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
    const userStore = useUserStoreHook()

    // 处理 401 错误（token 过期或无效）
    if (error.response && error.response.data && error.response.data.code === 401) {
      userStore.logout()
    }

    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default request
