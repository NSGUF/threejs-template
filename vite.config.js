import { createVuePlugin } from 'vite-plugin-vue2';
import glsl from 'rollup-plugin-glsl';

const path = require('path');

export default {
	build: {
		sourcemap: true,
	},
	resolve: {
		// 添加 '.js'、'.ts' 和 '.vue' 扩展名
		extensions: ['.js', '.ts', '.vue']
	},
	alias: {
		'@': path.resolve(__dirname, 'src')
	},
	server: {
		port: 4040,
		host: '0.0.0.0',
		cors: true,
		strictPort: false,
		fs: {
			allow: ['../../']
		}
	},
	plugins: [
		createVuePlugin(),
		glsl({
			// By default, everything gets included
			include: '**/*.glsl',
			// Undefined by default
			exclude: ['**/index.html'],
			// Source maps are on by default
			// sourceMap: false,
		})],
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true,
			},
		},
	},
};
