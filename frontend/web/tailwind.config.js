/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./node_modules/flashmessage-js/**/*.{js,ts,jsx,tsx}", 
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };