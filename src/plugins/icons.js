import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 白名单图标，不注册
const whiteList = ['Guide']

// 注册所有图标
export function setupElIcons(app) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    if (whiteList.includes(key)) continue // 通知图标已被占用，这里跳过
    app.component(key, component)
  }
}
