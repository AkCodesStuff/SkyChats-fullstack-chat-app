import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui:{
    themes:["light","dark","cupcake","retro","bumblebee","emerald","corporate","synthware","cyberpunk","valentine","halloween","garden","forest","aqua","lofi","pastel"]
  }
}