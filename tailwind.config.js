/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: 'hsl(209, 23%, 22%)',       // Used for dark backgrounds
        veryDarkBlue: 'hsl(200, 15%, 8%)',    // Used for text or darkest areas
        // Add more custom theme colors here if needed
      },
    },
  },
  plugins: [],
}
