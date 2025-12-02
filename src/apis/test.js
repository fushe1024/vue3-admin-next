import request from '@/utils/request'

// 测试接口
export function testApi() {
  return request.get('/test')
}
