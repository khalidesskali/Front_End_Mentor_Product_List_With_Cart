/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(14, 86%, 42%)",
        secondary: "hsl(159, 69%, 38%)",
      },
      padding: {
        "10px": "10px",
        "15px": "15px",
      },
      margin: {
        "10px": "10px",
        "15px": "15px",
      },
      screens: {
        tablet: "576px",
        "l-tablet": "768px",
        laptop: "992px",
        desk: "1280px",
      },
    },
  },
  plugins: [],
};
