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
      animation: {
        "bounce-10": "bounce-big 750ms ease-in-out infinite",
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
