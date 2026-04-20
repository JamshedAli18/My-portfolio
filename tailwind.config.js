/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        name:    ["'Syne'", "sans-serif"],
        body:    ["'DM Sans'", "sans-serif"],
      },
      colors: {
        ink:            "#0f0f0d",
        paper:          "#f5f3ee",
        warm:           "#e8e4dc",
        muted:          "#9b9690",
        accent:         "#c8472a",
        "accent-light": "#f0ede8",
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter:  "-0.02em",
      },
    },
  },
  plugins: [],
};