const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    content: [],
    extend: {
      colors: {
        neutral: colors.neutral,
        lime: colors.lime,
      },
    },
    fontFamily: {
      freesentation: ["freesentation"],
    },
  },
  plugins: [],
};
