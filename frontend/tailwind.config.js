/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
],
   safelist: [
    'grid-cols-[4fr_0.5fr_0.5fr]',
    'sm:grid-cols-[4fr_2fr_0.5fr]',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}