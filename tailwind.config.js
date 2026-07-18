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
        // 中性主色系：白 / 浅灰 / 炭黑
        white: "#ffffff",
        mist: "#fafafa", // 最浅灰，section 交替底
        fog: "#f4f5f6", // 浅灰，卡片底/分隔
        haze: "#eceef0", // 灰，边框/hover
        stone: "#d8dade", // 中浅灰，禁用/次要边框
        ash: "#8a8f96", // 中灰，次要文字
        slate: "#5a6068", // 深灰，正文辅助
        charcoal: "#2a2d33", // 炭黑，正文
        ink: "#15171a", // 近黑，标题
        // 强调色：静谧蓝
        blue: "#3B6FB0", // 静谧蓝主色
        "blue-deep": "#2E5A8E", // hover/按下
        "blue-soft": "#EAF1F8", // 浅蓝底
        "blue-mist": "#F4F8FC", // 最浅蓝
        // 兼容旧名（防止遗漏引用报错，统一映射到新中性色）
        paper: "#ffffff",
        "paper-warm": "#fafafa",
        "paper-dim": "#f4f5f6",
        rouge: "#3B6FB0",
        "rouge-deep": "#2E5A8E",
        cream: "#8a8f96",
        lavender: "#3B6FB0",
        cocoa: "#15171a",
        "cocoa-deep": "#000000",
        "cocoa-soft": "#2a2d33",
        sage: "#3B6FB0",
        vermilion: "#3B6FB0",
        gold: "#8a8f96",
        mo: "#15171a",
        "mo-deep": "#000000",
        "mo-soft": "#2a2d33",
        yuebai: "#fafafa",
        yanzhi: "#3B6FB0",
        zheshi: "#8a8f96",
        dai: "#5a6068",
        shiqing: "#3B6FB0",
      },
      fontFamily: {
        sans: ['"Inter"', '"Noto Sans SC"', "system-ui", "sans-serif"],
        display: ['"Inter"', '"Noto Sans SC"', "system-ui", "sans-serif"],
        body: ['"Inter"', '"Noto Sans SC"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
        hand: ['"Gloria Hallelujah"', "cursive"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.02em",
        caption: "0.08em",
        wider2: "0.16em",
      },
      maxWidth: {
        gallery: "1280px",
        prose: "720px",
      },
    },
  },
  plugins: [],
};
