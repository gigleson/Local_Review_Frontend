/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#D32323", // Yelp Red
        dark: "#2D2D2D", // Yelp Black
        light: "#F5F5F5", // Yelp Gray
      },
    },
  },
  plugins: [],
}

