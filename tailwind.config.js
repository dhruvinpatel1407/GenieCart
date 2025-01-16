/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{jsx,js}"],
  theme: {
    extend: {
      screens: {
        xs: "500px", // Define a custom breakpoint for 500px
      },
    },
  },
  plugins: [],
};
