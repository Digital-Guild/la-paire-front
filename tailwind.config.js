/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Urbanist", "sans-serif"],
    },
    colors: {
      primary: {
        500: "#FE6759",
      },
      secondary: {
        50: "#F2F2F2",
        100: "#E6E6E6",
        400: "#5D5A88",
        500: "#010101",
        600: "#666666",
      },
      background: {
        primary: "#FAFAFA",
      },
      shade: {
        black: "#000000",
        white: "#FFFFFF",
      },
      transparent: "transparent",
    },
    extend: {},
  },
  plugins: [],
};
