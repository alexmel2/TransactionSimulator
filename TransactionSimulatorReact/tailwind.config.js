/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // זה אומר ל-Tailwind לחפש בתוך כל קבצי ה-React
  ],
  theme: {
    extend: {
      colors: {
        shvaPurple: '#D9D3E9',
        shvaPrimary: '#7B61FF',
      }
    },
  },
  plugins: [],
}