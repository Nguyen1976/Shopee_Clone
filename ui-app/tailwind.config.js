/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.html', './src/**/*.jsx', './src/**/*.js'],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui')
  ],
}

