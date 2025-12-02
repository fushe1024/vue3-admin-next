import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vite.dev/config/
export default ({ mode }) => {
  // eslint-disable-next-line
  const env = loadEnv(mode, process.cwd())

  return defineConfig({
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [fileURLToPath(new URL('./src/assets/icons', import.meta.url))],
        // 指定symbolId格式
        symbolId: 'icon-[name]'
      }),
      vueDevTools(),
      // 自动导入函数式 API（ElMessage、ElNotification 等）
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),

      // 自动导入组件（<el-button> 等）
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_PROXY_URL, // 代理目标地址
          changeOrigin: true // 是否跨域
          // rewrite: (path) => path.replace(/^\/api/, '') // 重写路径：去掉路径中 /api
        }
      }
    }
  })
}
