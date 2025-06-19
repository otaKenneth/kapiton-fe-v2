/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Montserrat", "ui-sans-serif", "system-ui", "sans-serif"],
        secondary: ["Montserrat", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        primary: '#87cbb9',
        primaryContrast: '#1f1f22',
        primaryBackground: '#f1f5f0'
      },
      size: {
        xxs: '0.625rem'
      }
    },
  },
  plugins: [],
}