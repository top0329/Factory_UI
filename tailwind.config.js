/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      // add colors
      primary: '#1774FF',
      secondary: '#353535',
      black: '#090909',
      white: '#FFFFFF',
      'light-gray': '#A9A9A9',
    },
  },
  plugins: [],
};
