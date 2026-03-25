import request from '@/utils/request'

/**
 * 获取权限列表
 */
export const getPermissionListApi = () => {
  return request.get('/permission/list')
}
