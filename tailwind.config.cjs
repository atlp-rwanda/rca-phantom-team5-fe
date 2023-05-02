/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10',
        11: '11',
        12: '12',
      },
      colors: {
        primary: {
          100: '#ECECF8',
          DEFAULT: '#233862'
        },
        orange: "#FFA500",
      },
      boxShadow: {
        buses: '0px 4px 70px rgba(193, 193, 246, 0.45)'
      }
    },
  },
  variants: {
    lineClamp: ['responsive'],
  },
  plugins: [require('@tailwindcss/line-clamp')],
  mode: 'jit',
  darkMode: 'class',
};