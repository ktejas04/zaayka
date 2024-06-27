/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '550px',
      // => @media (min-width: 450px) { ... }
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1300px',
      // => @media (min-width: 1300px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }

      '3xl': '1920px',
      // => @media (min-width: 1920px) { ... }
    },
    extend: {
      colors: {
        "ochre": "#e6b640",
        "dark-ochre": "#e59641",
        "coffee": "#4c302c",
        "dark-coffee": "#422924",
        "parrot-green": "#7f9e2b",
        "dark-parrot-green": "#6a962a",
        "carrot": "#d93f29",
        "dark-carrot": "#ba3227",
      },
      keyframes: {
        "fadeIn" : {
          "0%": {
            opacity: 0
          },
          "100%": {
            opacity: 1
          }
        }
      },
      animation: {
        "fade-in" : "fadeIn 3s",
        "fade-in-fast" : "fadeIn 2s",
        "fade-in-slow" : "fadeIn 4s",
        "fade-in-quick" : "fadeIn 500ms"
      }
    },
  },
  plugins: [],
}