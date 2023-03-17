/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  mode: 'jit',
  content: ['./*.html', './js/*.js'],
  darkMode:'class',
  theme: {
    extend: {},
  },
  plugins: [
    require('autoprefixer')
  ]
}
