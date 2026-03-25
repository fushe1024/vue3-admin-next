import request from '@/utils/request'

/**
 * 获取用户管理列表
 * @param {*} params 查询参数对象 - { page, size }
 */
export const getUserManageListApi = (params) => {
  return request.get('/user-manage/list', { params })
}

/**
 * 批量导入用户
 * @param {*} data 导入数据数组 - [{ username, phone, role, openTime }, ...]
 */
export const batchImportUserApi = (data) => {
  return request.post('/user-manage/batch/import', data)
}

/**
 * 删除用户
 * @param {*} id 用户ID
 */
export const deleteUserApi = (id) => {
  // 注意: delete 单词书写错误未改, 暂时使用 detele
  return request.get(`/user-manage/detele/${id}`)
}

/**
 * 获取全部员工数据
 */
export const getAllUserManageApi = () => {
  return request.get('/user-manage/all-list')
}

/**
 * 获取用户详情
 * @param {*} id 用户ID
 */
export const getUserInfoApi = (id) => {
  return request.get(`/user-manage/detail/${id}`)
}

/**
 * 获取指定用户角色
 * @param {*} id 用户ID
 */
export const getUserRoleApi = (id) => {
  return request.get(`/user-manage/role/${id}`)
}

/**
 * 更新指定用户角色
 * @param {*} id 用户ID
 * @param {*} roles 角色数据
 */
export const updateUserRoleApi = (id, roles) => {
  return request.post(`/user-manage/update-role/${id}`, {
    roles
  })
}
