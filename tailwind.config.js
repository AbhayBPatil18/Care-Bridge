/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "ui-sans-serif", "system-ui"] },
      colors: {
        care: {
          primary: "#2563EB",
          teal: "#0D9488",
          success: "#10B981",
          warning: "#F59E0B",
          danger: "#EF4444",
          navy: "#0F172A",
          panel: "#F8FAFC"
        }
      },
      boxShadow: {
        soft: "0 18px 45px rgba(15, 23, 42, 0.09)"
      }
    }
  },
  plugins: []
};
