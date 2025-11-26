/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#2563eb',
                    hover: '#1d4ed8',
                    light: '#3b82f6',
                },
                secondary: '#0f172a',
                accent: '#10b981',
                surface: '#ffffff',
                background: '#f8fafc',
                text: {
                    primary: '#1e293b',
                    secondary: '#64748b',
                },
                border: '#e2e8f0',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                serif: ['Merriweather', 'serif'],
                mono: ['Fira Code', 'monospace'],
            },
        },
    },
    plugins: [],
}
