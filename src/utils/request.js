import axios from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000
})

request.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    config.headers.icode = 'helloqianduanxunlianying'
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

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
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default request
