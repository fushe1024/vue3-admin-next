import request from '@/utils/request'

// 登录
export const login = (data) => {
  return request.post('/sys/login', data)
}

// 获取用户信息
export const getUserInfo = () => {
  return request.get('/sys/profile')
}
