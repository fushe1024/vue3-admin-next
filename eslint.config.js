// ESLint 9 扁平配置文件
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfig([
  // 指定需要检查的文件类型
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}']
  },

  // 忽略构建和测试输出目录
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/node_modules/**']),

  // 设置浏览器环境全局变量
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ElMessage: 'readonly',
        ElNotification: 'readonly'
      }
    }
  },

  // 应用基础规则集
  js.configs.recommended, // ESLint 官方推荐规则
  ...pluginVue.configs['flat/essential'], // Vue 必要规则
  skipFormatting, // 禁用与 Prettier 冲突的格式规则

  // 自定义项目规则
  {
    rules: {
      'no-var': 'error', // 强制使用 let/const
      'vue/multi-word-component-names': 'off', // 允许单单词 Vue 组件名
      'no-multiple-empty-lines': ['warn', { max: 1 }], // 限制空行数量
      'no-unexpected-multiline': 'error' // 禁止混淆的多行代码
    }
  }
])
