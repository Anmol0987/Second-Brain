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
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        pulseDot: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.6)', opacity: '0.4' },
        },
      },
      animation: {
        pulseDot: 'pulseDot 1.2s ease-in-out infinite',
      },
    },
  },
};
