import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:svg-icons-register'

// ===== 样式导入 =====
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/styles/index.scss'
import 'animate.css'

// ===== 核心配置 =====
import { setupDirective } from '@/directives'
import { setupI18n } from '@/i18n'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'

// ===== 插件 =====
import setupPlugins from '@/plugins'

// ===== 路由守卫 =====
import { setupPermissionGuard } from '@/router/guards/permission'

// 创建 Vue 应用实例
const app = createApp(App)

// 核心配置
setupDirective(app)
setupRouter(app)
setupStore(app)
setupI18n(app)

// 注册插件
app.use(setupPlugins)

// 路由守卫
setupPermissionGuard()

app.mount('#app')
