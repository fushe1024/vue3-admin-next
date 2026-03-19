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
