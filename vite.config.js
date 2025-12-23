import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default ({ mode }) => {
  // eslint-disable-next-line
  const env = loadEnv(mode, process.cwd())

  return defineConfig({
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // Specify the icon folder to cache
        iconDirs: [fileURLToPath(new URL('./src/assets/icons', import.meta.url))],
        // Specify symbolId format
        symbolId: 'icon-[name]'
      }),
      AutoImport({
        resolvers: [
          // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
          ElementPlusResolver()
        ]
      }),
      Components({
        resolvers: [
          // Auto register Element Plus components
          ElementPlusResolver()
        ]
      }),
      vueDevTools()
    ],
    // configure path alias
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    // development server configuration
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_PROXY_URL, // proxy address
          changeOrigin: true // is cross-origin
        }
      }
    },
    // CSS preprocessor configuration
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variables.scss" as *; @use "@/styles/mixins.scss" as *;`
        }
      }
    }
  })
}
