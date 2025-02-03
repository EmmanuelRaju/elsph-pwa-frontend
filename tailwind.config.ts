import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				primary: 'var(--color-1)',
				secondary: 'var(--color-2)',
				tertiary: 'var(--color-3)',
				quaternary: 'var(--color-4)'
			},
			fontFamily: {
				primary: 'var(--font-body)',
				accent: 'var(--font-accent)'
			}
		}
	},

	plugins: []
} satisfies Config;
