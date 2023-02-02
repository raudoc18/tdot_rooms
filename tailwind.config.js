/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      "colors": {
        "primary": "#5E2878"
      },
      fontFamily: {
        mono: ['var(--font-ibm)', ...fontFamily.mono],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
