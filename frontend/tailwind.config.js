/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          
        },
        purple: {
          200: "#e1e7fe",
          500: "#5951d1",
          600: "#5046e4",
        }
      }
    },
  },
  plugins: [],
}