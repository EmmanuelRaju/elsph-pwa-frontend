import { paraglide } from '@inlang/paraglide-sveltekit/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';

export default defineConfig({
	resolve: {
		alias: {
			'node:async_hooks': '/dev/null' // Redirects to a dummy file
		}
	},
	plugins: [
		sveltekit(),
		paraglide({
			project: './project.inlang',
			outdir: './src/lib/paraglide'
		}),
		SvelteKitPWA({
			registerType: 'autoUpdate',
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg,mp3}'],
				maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MB,
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/.*supabase\.co\/storage\/.*/i,
						handler: 'CacheFirst',
						options: {
							cacheName: 'supabase-storage',
							expiration: {
								maxEntries: 50,
								maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
							}
						}
					}
				]
			}
		})
	]
});
