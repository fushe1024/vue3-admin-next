import request from '@/utils/request'

/**
 * 文章排名列表
 * @param {*} params - { page: 1, size: 10 } 分页参数，默认第一页，每页10条
 * @returns
 */
export const getArticleRankingListApi = (params) => {
  return request.get('/article/list', { params })
}

/**
 * 获取文章详情
 * @param {*} id - 文章ID
 * @returns
 */
export const getArticleDetailApi = (id) => {
  return request.get(`/article/${id}`)
}

/**
 * 删除文章
 * @param {*} id - 文章ID
 * @returns
 */
export const deleteArticleApi = (id) => {
  return request.get(`/article/delete/${id}`)
}
