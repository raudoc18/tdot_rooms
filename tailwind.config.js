/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      "colors": {
        "primary": "#5E2878"
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
