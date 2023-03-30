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
      txt: ['finalsix', 'sans-serif'],
    },
    screens: {
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1500px',
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
}
