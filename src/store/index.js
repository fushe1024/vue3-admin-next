import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate) // 安装持久化插件

// 全局注册状态管理
export function setupStore(app) {
  app.use(pinia)
}

// 全局注册状态管理模块
export * from './modules/user-store'
export * from './modules/app-store'
export * from './modules/settings-store'

export default pinia
