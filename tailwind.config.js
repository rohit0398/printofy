/* eslint-disable global-require */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "0rem",
        sm: "0rem",
        lg: "0rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      colors: {
        "app-purple": "#E93CCF",
        "app-dark-purple": "#932582",
        "app-teal": "#4BC1C1",
        "app-dark-gray": "#121212",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        noto: ["Noto Sans", "sans-serif"],
        aboreto: ["Aboreto", "cursive"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class", // only generate classes
    }),
  ],
};
