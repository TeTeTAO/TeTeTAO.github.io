/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        paper: "#f1e8d6",
        "paper-warm": "#ead9b9",
        "paper-dim": "#e2d4b3",
        ink: "#2a211c",
        "ink-soft": "#5a4a3e",
        "ink-faint": "#8a7a6c",
        rouge: "#b5553a",
        "rouge-deep": "#8a3d28",
        sage: "#5e7d74",
        lavender: "#c9b8d6",
        cream: "#f2d98a",
        cocoa: "#2a211c",
        "cocoa-deep": "#1a1410",
        "cocoa-soft": "#3d322a",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        body: ['"EB Garamond"', "Georgia", "serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        masthead: "0.18em",
        caption: "0.22em",
      },
      maxWidth: {
        spread: "1440px",
      },
    },
  },
  plugins: [],
};
