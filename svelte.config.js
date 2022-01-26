// import preprocess from 'svelte-preprocess';
// // svelte.config.js
// import adapter from '@sveltejs/adapter-static';
// export default {
// 	kit: {
// 		adapter: adapter({
// 			// default options are shown
// 			pages: 'build',
// 			assets: 'build',
// 			fallback: null
// 		}),

// 		vite: {
// 			css: {
// 				preprocessorOptions: {
// 					scss: {
// 						additionalData: '@import "src/variables.scss";'
// 					}
// 				}
// 			}
// 		}
// 	},

// 	preprocess: [
// 		preprocess({
// 			scss: {
// 				prependData: '@import "src/variables.scss";'
// 			}
// 		})
// 	]
// };

import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
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
	
};

export default config;
