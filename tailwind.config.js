/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jawa: {
          black: '#0D0D0D',
          'black-light': '#1A1A1A',
          'black-card': '#141414',
          gold: '#D4A847',
          'gold-light': '#F0D78C',
          'gold-dark': '#B8922F',
          cream: '#FFF8E7',
        }
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        script: ['Poppins', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
