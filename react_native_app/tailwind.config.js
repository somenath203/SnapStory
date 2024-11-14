/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        pblack: ['Poppins-Black', 'sans-serif'],
        pbold: ['Poppins-Bold', 'sans-serif'],
        pitalics: ['Poppins-Italics', 'sans-serif'],
      }
    },
  },
  plugins: [],
}