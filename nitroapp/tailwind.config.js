module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        lightgrey: '#f9f9f9',
        darkgrey: '#f5f5f5',
        almostblack: '#1d1d1d',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
