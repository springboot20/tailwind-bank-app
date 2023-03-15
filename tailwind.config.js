/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  mode: 'jit',
  content: ['./*.html', './js/*.js'],
  theme: {
    extend: {},
  },
  plugins: [
    require('autoprefixer')
  ]
}
