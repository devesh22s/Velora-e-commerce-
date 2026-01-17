/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#1f9d95', // Humara Teal color
        brandDark: '#177e77',
      }
    },
  },
  plugins: [],
}