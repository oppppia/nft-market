import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {},
		backgroundColor: {
			main: '#192531',
			primary: '#2BD7B1',
			secondary: '#41576D',
			secondPrimary: '#089c7b'
		},
		borderColor: {
			primary: '#2BD7B1'
		},
		textColor: {
			collectableTrue: '#2BD7B1',
			collectableFalse: '#eb3b3b',
			white: '#FFF',
			secondary: '#41576D'
		}
	},

	plugins: []
} satisfies Config;
