/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/**/*.html',
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      minWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
      maxWidth: {
        '1/2': '50%',
      },
    },
  },
  variants: {},
  plugins: [],
}

