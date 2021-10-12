import preprocess from 'svelte-preprocess';
// svelte.config.js
import adapter from '@sveltejs/adapter-static';
export default {
	kit: {
		adapter: adapter({
			// default options are shown
			pages: 'build',
			assets: 'build',
			fallback: null
		}),

		vite: {
			css: {
				preprocessorOptions: {
					scss: {
						additionalData: '@import "src/variables.scss";'
					}
				}
			}
		}
	},

	preprocess: [
		preprocess({
			scss: {
				prependData: '@import "src/variables.scss";'
			}
		})
	]
};
