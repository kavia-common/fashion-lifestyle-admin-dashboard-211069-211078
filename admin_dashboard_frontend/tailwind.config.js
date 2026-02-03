/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#3b82f6",
          success: "#06b6d4",
        },
      },
      fontSize: {
        // Desktop-optimized baseline: 14px
        base: ["14px", { lineHeight: "20px" }],
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.06), 0 1px 1px rgba(0,0,0,0.04)",
      },
      borderRadius: {
        xl: "12px",
      },
    },
  },
  plugins: [],
};
