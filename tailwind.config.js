/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4fa',
          100: '#d9e2f5',
          200: '#b3c6eb',
          300: '#8da9e0',
          400: '#678dd6',
          500: '#4171cb',
          600: '#3056a3',
          700: '#1E3A8A',
          800: '#162a63',
          900: '#0f1b42',
        },
      },
    },
  },
  plugins: [],
}
