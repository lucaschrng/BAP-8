/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./assets/**/*.js",
    "./templates/**/*.html.twig",
  ],
  theme: {
    extend: {
      fontFamily : {
        sans: ['bely-display', 'sans-serif'],
        txt: ['finalsix', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
