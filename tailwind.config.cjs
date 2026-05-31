/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        barlow: ["Barlow", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        latar: "#f3f4f6",
        teks: "#374151",
        "teks-samping": "#6b7280",
        garis: "#e5e7eb",
        hijau: "#00B074",
        merah: "#ef4444",
        biru: "#3b82f6",
        kuning: "#f59e0b",
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease-out",
        slideInUp: "slideInUp 0.6s ease-out",
        slideInDown: "slideInDown 0.6s ease-out",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideInUp: {
          from: { transform: "translateY(30px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        slideInDown: {
          from: { transform: "translateY(-30px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
}

