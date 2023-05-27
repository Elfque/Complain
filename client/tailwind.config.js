/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        greeny: "#26A191",
        whity: "#F3F3F3",
        greyey: "#96999D",
        whiter: "#FAFAFA",
        blackt: "#1A1A1A",
      },
      gridTemplateColumns: {
        messageGrid: "1fr 40px",
      },
    },
  },
  plugins: [],
};
