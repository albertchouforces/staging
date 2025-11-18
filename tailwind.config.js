/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/react-app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d7fe',
          300: '#a5bbfc',
          400: '#8196f8',
          500: '#6270f1',
          600: '#4b50e5',
          700: '#3d3fca',
          800: '#3436a3',
          900: '#1e1b4b',
        },
      },
    },
  },
  plugins: [],
};
