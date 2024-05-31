/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        dark1: "#070F2B",
        dark2: "#1B1A55",
        dark3: "#535C91",
        dark4: "#9290C3",
      },
    },
  },
  plugins: [],
};
