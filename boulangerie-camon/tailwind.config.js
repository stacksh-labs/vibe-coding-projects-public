/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#f8f1e5',
        parchment: '#efe1cc',
        wheat: '#dfbf88',
        terracotta: '#b86f45',
        ember: '#7a3f25',
        cocoa: '#3b261b'
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Source Sans 3"', 'sans-serif']
      },
      boxShadow: {
        warm: '0 12px 35px rgba(95, 52, 28, 0.18)'
      }
    }
  },
  plugins: []
}
