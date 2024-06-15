/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
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
    },
  },
  plugins: [],
}