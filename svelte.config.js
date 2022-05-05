import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import path from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),

		package: {
			files: file => !file.startsWith('demo'),
			exports: file => file === 'index.ts'
		},

		vite: {
			resolve: {
				alias: {
					'valtio-svelte': path.resolve('src/lib/index.ts')
				}
			}
		}
	}
};

export default config;
