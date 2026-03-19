/**
 * 项目常量统一管理
 * 存储键命名规范：{prefix}:{namespace}:{key}
 */

export const APP_PREFIX = 'cookie' // 应用前缀
export const TIMEOUT = 1000 * 60 * 60 * 2 // 超时时间 2 小时

export const STORAGE_KEYS = {
  ACCESS_TOKEN_KEY: `${APP_PREFIX}:auth:access_token`, // 访问令牌
  REFRESH_TOKEN_KEY: `${APP_PREFIX}:auth:refresh_token`, // 刷新令牌

  // 用户认证相关
  TIMESTAMP_KEY: `${APP_PREFIX}:auth:timestamp`, // 最近一次操作时间戳

  // 应用状态相关
  SIZE: `${APP_PREFIX}:app:size`, // 布局尺寸
  LANGUAGE: `${APP_PREFIX}:app:language`, // 应用语言
  SIDEBAR_STATUS: `${APP_PREFIX}:app:sidebar_status`, // 侧边栏状态
  TAGS_VIEW: `${APP_PREFIX}:app:tags_view` // 标签页状态
}
