import { defineAsyncComponent } from 'vue'

export default function registerGlobalComponents(app, options = {}) {
  const { prefix = '', kebabCase = true } = options

  // 使用 Vite 的 import.meta.glob 动态导入所有组件
  const modules = import.meta.glob('../components/**/*.vue')

  // 遍历导入的模块并注册为全局组件
  Object.entries(modules).forEach(([path, loader]) => {
    const parts = path.split('/') // 分割路径 ['components', 'SvgIcon', 'index.vue']
    const fileName = parts.pop().replace('.vue', '') // 获取文件名 'index'

    // 组件名称
    let componentName

    // 如果文件名是 index，则使用父目录名作为组件名， 否则使用文件名
    if (fileName === 'index') {
      componentName = prefix + parts.pop() // 前缀 + 父目录名
    } else {
      componentName = prefix + fileName // 前缀 + 文件名
    }

    // 注册 PascalCase 名称
    app.component(componentName, defineAsyncComponent(loader))

    // 可选注册 kebab-case 名称
    if (kebabCase) {
      const kebabName = componentName
        .replace(/([A-Z])/g, '-$1')
        .toLowerCase()
        .replace(/^-/, '')
      app.component(kebabName, defineAsyncComponent(loader))
    }
  })
}

// 组件使用示例：
// <SvgIcon name="icon-name" size="24" color="#409EFF" />
// <svg-icon name="icon-name" size="24" color="#409EFF" />
