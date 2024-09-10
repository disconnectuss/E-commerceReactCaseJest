/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2A59FE", // custom blue theme
        secondary: "#000000", //  custom  black theme
        white: "#FFFFFF", // custom white theme
        bodyBg: "#F9F9F9", // custom background theme
        boxTitle: "#333333B2", // custom gray for title
      },
    },
  },
  plugins: [],
};
