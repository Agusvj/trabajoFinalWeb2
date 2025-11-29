/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        wood: {
          50: '#faf9f7',
          100: '#f5f3ef',
          200: '#e8e4dc',
          300: '#d4cdc0',
          400: '#b8ad9a',
          500: '#9d8f7a',
          600: '#8a7a65',
          700: '#6f6254',
          800: '#5a5047',
          900: '#4a433c',
        },
        stone: {
          50: '#f8f8f7',
          100: '#efeeec',
          200: '#dddbd7',
          300: '#c4c1ba',
          400: '#a8a399',
          500: '#8e8679',
          600: '#736d62',
          700: '#5d5850',
          800: '#4d4944',
          900: '#3d3a36',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
