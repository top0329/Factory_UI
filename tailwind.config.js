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
      landing: '#040309',
      cyan: '#1FCFF1',
      yellow: '#F9D413',
      purple: '#8F2DBD',
      default: '#040a0f',
    },
  },
  plugins: [],
};
