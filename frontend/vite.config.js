import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import AsyncCatch from 'vite-plugin-async-catch'
import styleImport from 'vite-plugin-style-import'
// new gz
import compressPlugin from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AsyncCatch({ catchCode: `console.error(e)` }),
    styleImport({
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          ensureStyleFile: true,
          resolveStyle: (name) => {
            return `element-plus/lib/theme-chalk/${name}.css`
          },
          resolveComponent: (name) => {
            return `element-plus/lib/${name}`
          },
        },
      ],
    }),
    // gz
    compressPlugin({
      ext: '.gz',//gz br
      algorithm: 'gzip', //brotliCompress gzip
      deleteOriginFile:false
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: '../backend/static',
  },
})


