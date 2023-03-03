/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}"
  ],
  mode: "jit",
  darkMode: "class",
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      xxl: "1400px"
    },
    colors: {
      black: "#292929",
      white: "#fff",
      primary: {
        100: "#d0d3d8",
        200: "#b9bcc5",
        300: "#a1a6b1",
        400: "#8a909e",
        500: "#727a8b",
        600: "#5b6477",
        700: "#434d64",
        800: "#2c3750",
        900: "#14213D"
      },
      secondary: {
        100: "#feedcf",
        200: "#fee3b8",
        300: "#fedaa0",
        400: "#fed188",
        500: "#fdc870",
        600: "#fdbf58",
        700: "#fdb541",
        800: "#fcac29",
        900: "#FCA311"
      },
      tertiary: {
        100: "#fafafa",
        200: "#f7f7f7",
        300: "#f5f5f5",
        400: "#f2f2f2",
        500: "#efefef",
        600: "#ededed",
        700: "#eaeaea",
        800: "#e8e8e8",
        900: "#e5e5e5"
      }
    },
    extend: {
      fontFamily: {
        jost: ["Jost", "sans-serif"]
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
}
