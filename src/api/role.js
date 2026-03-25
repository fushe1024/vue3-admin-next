import request from '@/utils/request'

/**
 * 获取角色列表
 */
export const getRoleListApi = () => {
  return request.get('/role/list')
}

/**
 * 获取指定角色权限
 */
export const getRolePermissionApi = (roleId) => {
  return request.get(`/role/permission/${roleId}`)
}

/**
 * 更新角色权限
 */
export const updateRolePermissionApi = (roleId, permissions) => {
  return request.post('/role/distribute-permission', {
    roleId,
    permissions
  })
}
