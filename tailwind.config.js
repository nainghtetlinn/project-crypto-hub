module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: '540px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
