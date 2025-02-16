import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {},
		backgroundColor: {
			main: '#192531',
			primary: '#2BD7B1',
			secondary: '#41576D'
		},
		borderColor: {
			primary: '#2BD7B1'
		},
		textColor: {
			white: '#FFF',
			secondary: '#41576D'
		}
	},

	plugins: []
} satisfies Config;
