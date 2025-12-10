/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        elsie: ['"Elsie Swash Caps"', "serif"],
      },
    },
  },
  plugins: [],
};
