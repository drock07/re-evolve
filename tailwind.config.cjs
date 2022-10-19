/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        'site-layout': '100px 1fr 100px',
      },
      gridTemplateRows: {
        'site-layout': '60px 1fr 60px',
      },
    },
  },
  plugins: [],
}
