/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    animation: {
      marquee: "marquee 25s linear infinite",
      "marquee-reverse": "marquee 25s linear infinite reverse",
      "marquee-up": "marqueeVertical 25s linear infinite",
      "marquee-down": "marqueeVertical 25s linear infinite reverse",
    },
    keyframes: {
      marquee: {
        "0%": { transform: "translateX(0%)" },
        "100%": { transform: "translateX(-50%)" },
      },
      marqueeVertical: {
        "0%": { transform: "translateY(0%)" },
        "100%": { transform: "translateY(-50%)" },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
