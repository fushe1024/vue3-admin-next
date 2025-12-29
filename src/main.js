import { createApp } from 'vue'
import App from './App.vue'
import setupPlugins from '@/plugins'
import 'virtual:svg-icons-register'

// 暗黑主题样式
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/styles/index.scss'

// 过渡动画
import 'animate.css'

const app = createApp(App)

// 注册插件
app.use(setupPlugins)

app.mount('#app')
