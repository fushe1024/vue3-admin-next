import request from '@/utils/request'

// 登录
export const loginApi = (data) => {
  return request.post('/sys/login', data)
}

// 获取用户信息
export const getUserInfoApi = () => {
  return request.get('/sys/profile')
}
