import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 注册所有图标
export function setupElIcons(app) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    if (key === 'Notification') continue // 通知图标已被占用，这里跳过
    app.component(key, component)
  }
}
