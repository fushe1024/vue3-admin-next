import { setupI18n } from '@/i18n'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import { setupElIcons } from './icons'
import { setupGlobalComponents } from './global-components'
import { setupPermission } from './permission'

export default {
  install(app) {
    // 状态管理(store)
    setupStore(app)
    // 国际化(i18n)
    setupI18n(app)
    // 路由(router)
    setupRouter(app)
    // 全局组件(global-components)
    setupGlobalComponents(app)
    // Element-plus图标(el-icons)
    setupElIcons(app)
    // 路由守卫(permission)
    setupPermission(app)
  }
}
