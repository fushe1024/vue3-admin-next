import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import './styles/index.scss'
import 'virtual:svg-icons-register'
import registerGlobalComponents from './plugins/global-components'

import './permission' // 路由权限控制

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(registerGlobalComponents) // 自动注册全局组件

app.mount('#app')
