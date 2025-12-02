// utils/stores.js

const storage = {
  // 保存数据到 localStorage，自动序列化对象
  set(key, value) {
    try {
      const val = typeof value === 'object' ? JSON.stringify(value) : value
      localStorage.setItem(key, val)
    } catch (error) {
      console.error('LocalStorage set error:', error)
    }
  },

  // 获取数据，自动解析 JSON
  get(key) {
    try {
      const value = localStorage.getItem(key)
      if (!value) return null
      try {
        return JSON.parse(value)
      } catch {
        return value
      }
    } catch (error) {
      console.error('LocalStorage get error:', error)
      return null
    }
  },

  // 删除指定 key
  remove(key) {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('LocalStorage remove error:', error)
    }
  },

  // 清空 localStorage
  clear() {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('LocalStorage clear error:', error)
    }
  },

  // 判断 key 是否存在
  has(key) {
    try {
      return localStorage.getItem(key) !== null
    } catch (error) {
      console.error('LocalStorage has error:', error)
      return false
    }
  }
}

export default storage
