/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        rose: {
          50:  '#fff1f3',
          100: '#ffe0e5',
          200: '#ffc6cf',
          300: '#ff9aaa',
          400: '#ff6380',
          500: '#e8738a',
          600: '#d45470',
          700: '#b23058',
          800: '#952b50',
          900: '#7f284a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
