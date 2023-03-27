/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./assets/**/*.js",
    "./templates/**/*.html.twig",
  ],
  theme: {
    extend: {
        colors: {
            colorGreen: '#1A6E6A',
            colorOrange : "#FC6B3B",
            colorBlueGreen : "#19647E"
        }
    },
    fontFamily : {
      sans: ['bely-display', 'sans-serif'],
    },
  },
  plugins: [],
}
