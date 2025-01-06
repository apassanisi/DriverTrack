/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./components/**/*.vue" // Added this line
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
      },
      colors: {
        'knight-red': '#B80000',
        'swift-blue': '#0057A6',
        'dark-gray': '#333333',
        'light-gray': '#CCCCCC',
        'subtle-gray': '#F5F5F5',
        'highlight-yellow': '#FFC107',
        'text-white': '#FFFFFF',
        'text-black': '#000000',
      },
    },
  },
  plugins: [],
}