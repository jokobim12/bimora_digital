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
        heading: ['var(--font-heading)', 'Inter', 'sans-serif'],
        serif: ['var(--font-serif)', 'Cormorant Garamond', 'serif'],
        script: ['var(--font-script)', 'Great Vibes', 'cursive'],
        body: ['var(--font-body)', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 20px rgba(212, 168, 71, 0.3)',
        'gold-glow-lg': '0 0 35px rgba(212, 168, 71, 0.4)',
      }
    },
  },
  plugins: [],
}
