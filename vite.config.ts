import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import * as path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		//设置别名
		alias: {
			'@': path.resolve(__dirname, 'src')
		}
	},
	server: {
		port: 8080, //启动端口
		proxy: {
			'/api': {
				target: 'your https address',
				changeOrigin: true,
				rewrite: (path: string) => path.replace(/^\/api/, '')
			}
		}
	},
	plugins: [
		AutoImport({
			// 需要去解析的文件
			include: [
				/\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
				/\.vue$/,
				/\.vue\?vue/, // .vue
				/\.md$/ // .md
			],
			// imports 指定自动引入的包位置（名）
			imports: ['vue', 'pinia', 'vue-router'],
			// 生成相应的自动导入json文件。
			eslintrc: {
				// 启用
				enabled: true,
				// 生成自动导入json文件位置
				filepath: './.eslintrc-auto-import.json',
				// 全局属性值
				globalsPropValue: true
			},
			resolvers: [ElementPlusResolver()]
		}),
		Components({
			// imports 指定组件所在目录，默认为 src/components
			dirs: ['src/components/', 'src/views/'],
			// 需要去解析的文件
			include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
			resolvers: [
				ElementPlusResolver(),
				IconsResolver({
					// icon自动引入的组件前缀 - 为了统一组件icon组件名称格式
					prefix: 'icon'
				})
			]
		}),
		vue(),
		vueJsx(),
		Icons({
			compiler: 'vue3',
			// 自动安装
			autoInstall: true
		})
	],
	build: {
		outDir: 'dist',
		minify: 'esbuild',
		chunkSizeWarningLimit: 1500,
		rollupOptions: {
			output: {
				chunkFileNames: 'assets/js/[name]-[hash].js',
				entryFileNames: 'assets/js/[name]-[hash].js',
				assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
			}
		}
	}
})
