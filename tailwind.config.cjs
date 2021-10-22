module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.svelte'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'rale': 'Raleway',
        'sub': 'Poppins'
      },
      colors: {
        'red': '#FF004D',
        'green': '#B2FF65',
        'green-dark': '#6A925C',
        'gray-light': '#636E80',
        'gray': '#25292F',
        'gray-dark': '#1B1D21',
      },
      gridTemplateColumns: {
        'nav': '20% 1fr 20%;',
      },
      keyframes: {
        fatten: {
          '0%': { fontWeight: '1'},
          '100%': { fontWeight: '900'}
        },
        'fat-100': {
          '0%': { fontWeight: '1'},
          '100%': { fontWeight: '100'}
        },
        'fat-200': {
          '0%': { fontWeight: '1'},
          '100%': { fontWeight: '200'}
        },
        'fat-300': {
          '0%': { fontWeight: '1'},
          '100%': { fontWeight: '300'}
        },
        'fat-400': {
          '0%': { fontWeight: '1'},
          '100%': { fontWeight: '400'}
        },
        'fat-500': {
          '0%': { fontWeight: '1'},
          '100%': { fontWeight: '500'}
        },
        'fat-600': {
          '0%': { fontWeight: '1'},
          '100%': { fontWeight: '600'}
        },
        'fat-700': {
          '0%': { fontWeight: '1'},
          '100%': { fontWeight: '700'}
        },
        'fat-800': {
          '0%': { fontWeight: '1'},
          '100%': { fontWeight: '800'}
        },
        'fat-900': {
          '0%': { fontWeight: '1'},
          '100%': { fontWeight: '900'}
        },
      },
      animation: {
        fatten: 'fatten 1s ease-in-out',
        'fat-100': 'fat-100 1s ease-in-out forwards',
        'fat-200': 'fat-200 1s ease-in-out forwards',
        'fat-300': 'fat-300 1s ease-in-out forwards',
        'fat-400': 'fat-400 1s ease-in-out forwards',
        'fat-500': 'fat-500 1s ease-in-out forwards',
        'fat-600': 'fat-600 1s ease-in-out forwards',
        'fat-700': 'fat-700 1s ease-in-out forwards',
        'fat-800': 'fat-800 1s ease-in-out forwards',
        'fat-900': 'fat-900 1s ease-in-out forwards',
      },
      transitionDelay: {
        '1': '50ms',
        '2': '100ms',
        '3': '150ms',
        '4': '200ms',
        '5': '250ms',
        '6': '300ms',
        '7': '350ms',
        '8': '400ms',
        '9': '450ms',
        '10': '500ms',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
