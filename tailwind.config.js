const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neutral: colors.neutral,
        lime: colors.lime,
      },
      screens: {
        "2.5xl": "1350px",
      },
      gridTemplateColumns: {
        30: "repeat(30, minmax(0, 1fr))",
      },
      gridColumn: {
        "span-13": "span 13 / span 13",
      },
      animation: {
        "bounce-10": "bounce-10 750ms ease-in-out infinite",
      },
      keyframes: {
        "bounce-10": {
          "0%": { transform: "none" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "none" },
        },
      },
    },
    fontFamily: {
      freesentation: ["freesentation"],
    },
  },
  plugins: [require("tailwindcss-animation-delay")],
};
