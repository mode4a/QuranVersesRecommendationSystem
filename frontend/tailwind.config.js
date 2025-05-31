/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        emerald: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
        sand: {
          50: "#FCFAF6",
          100: "#F6F1E9",
          200: "#EFE6D5",
          300: "#E6D7BC",
          400: "#DCCA98",
          500: "#CFB978",
          600: "#C3A957",
          700: "#B79A3B",
          800: "#A48A34",
          900: "#8C742C",
        },
      },
      fontFamily: {
        primary: ["Raleway", "sans-serif"],
        arabic: ["Amiri", "serif"],
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
