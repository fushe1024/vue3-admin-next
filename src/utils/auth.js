import storage from './storage'
import { TIMESTAMP_KEY, TIMEOUT } from '@/constants'

/**
 * 获取本地时间戳
 * @returns {number} 时间戳（单位毫秒） 如不存在返回当前时间戳
 */
export const getTimestamp = () => {
  return storage.get(TIMESTAMP_KEY)
}

/**
 * 设置时间戳
 * @description 用于记录用户最近一次操作的时间戳，用于校验登录过期
 */
export const setTimestamp = () => {
  storage.set(TIMESTAMP_KEY, Date.now())
}

/**
 * 校验时间戳是否过期
 * @returns {boolean} 是否过期 true 未过期 false 已过期
 */
export const checkTimestamp = () => {
  // 当前时间戳
  const now = Date.now()
  // 时间差（单位毫秒）
  const diff = now - getTimestamp()

  // 校验时间差是否小于等于超时时间
  return diff <= TIMEOUT // 超时时间内有效
}
