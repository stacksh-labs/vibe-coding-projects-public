/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      colors: {
        teddy: {
          pink: '#FF8FAB',
          'pink-light': '#FFD6E0',
          orange: '#FF9A3C',
          'orange-light': '#FFE0B2',
          purple: '#C084FC',
          'purple-light': '#EDE9FE',
          yellow: '#FCD34D',
          'yellow-light': '#FEF9C3',
          green: '#6EE7B7',
          'green-light': '#D1FAE5',
          blue: '#60A5FA',
          'blue-light': '#DBEAFE',
        }
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'fun': '0 4px 15px -2px rgba(255, 143, 171, 0.4)',
        'fun-lg': '0 8px 25px -4px rgba(255, 154, 60, 0.35)',
        'card': '0 6px 20px -4px rgba(192, 132, 252, 0.3)',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pop: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        wiggle: 'wiggle 0.5s ease-in-out',
        pop: 'pop 0.3s ease-out',
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
