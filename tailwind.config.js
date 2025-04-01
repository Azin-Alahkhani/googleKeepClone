/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Set Inter as the default sans-serif
      },
    },
    container: {
      center: true,
      padding: '2rem',
    },
  },
  plugins: [
  ],
}
