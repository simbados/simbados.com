/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		colors: {
			// Using modern `rgb`
			navbarBg: 'rgb(var(--navbar-bg))',
			accentColor: 'rgb(var(--accent-color))',
			mainColor: 'rgb(var(--main-color))',
		}
	},
	plugins: [],
}
