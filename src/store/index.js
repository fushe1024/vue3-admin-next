import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const store = createPinia()

// 安装持久化插件
store.use(piniaPluginPersistedstate)

// 全局注册状态管理
export function setupStore(app) {
  app.use(store)
}

// 全局注册状态管理模块
export * from './modules/user'
export * from './modules/app'
export * from './modules/settings'
export * from './modules/tags-view'
export { store }
