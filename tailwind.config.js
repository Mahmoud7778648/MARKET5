/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Include app directory for Next.js with App Router
    "./pages/**/*.{js,ts,jsx,tsx}", // For Page Router
    "./components/**/*.{js,ts,jsx,tsx}", // Your components
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fdf4ff",
          100: "#fae8ff",
          200: "#f5d0fe",
          300: "#f0abfc",
          400: "#e879f9",
          500: "#d946ef",
          600: "#c026d3",
          700: "#FF0080",
          800: "#FF5580",
          900: "#701a75",
          950: "#4a044e",
        },
      },
    },
    plugins: [],
  },
};
