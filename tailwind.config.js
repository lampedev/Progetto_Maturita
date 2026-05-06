/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#0ea5e9',
          dark: '#0284c7',
        },
        surface: '#ffffff',
        muted: '#f4f4f5',
      },
      fontFamily: {
        sans: ['Geist Sans', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        wrapper: '1400px',
      },
      borderRadius: {
        '4xl': '2.5rem',
      },
    },
  },
  plugins: [],
}
