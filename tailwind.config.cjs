/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0066FF',
                    dark: '#0052CC',
                    light: '#3385FF',
                },
                gradient: {
                    start: '#0066FF',
                    end: '#00D4FF',
                },
            },
            fontFamily: {
                sans: ['Inter', '-apple-system', 'Noto Sans SC', 'sans-serif'],
                display: ['Cal Sans', 'Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}