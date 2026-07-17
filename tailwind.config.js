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
        // 宣纸系（底色）
        paper: "#ede2cb", // 主宣纸，米黄偏暖
        "paper-warm": "#f2ead6", // 浅宣纸
        "paper-dim": "#e3d6b8", // 深宣纸
        // 墨色系
        ink: "#1c1714", // 浓墨
        "ink-soft": "#4a3f37", // 淡墨
        "ink-faint": "#7a6f63", // 远墨
        // 朱砂系（强调）
        vermilion: "#9c2f2a", // 朱砂正红
        "vermilion-bright": "#c14a3f", // 朱砂浅
        "vermilion-deep": "#6e1f1c", // 朱砂深
        // 石青系（青绿）
        shiqing: "#2f5d6e", // 石青
        "shiqing-light": "#4a7d8a", // 石青浅
        // 胭脂系
        yanzhi: "#7a2a3a", // 胭脂
        // 赭石
        zheshi: "#9c6b3f", // 赭石
        // 黛色
        dai: "#3a4a55", // 黛蓝灰
        // 月白
        yuebai: "#d8dee0", // 月白
        // 金箔
        gold: "#c9a96e", // 金箔
        "gold-deep": "#a8895a", // 深金
        // 浓墨深底（章节封面用）
        mo: "#1c1714",
        "mo-deep": "#0f0c0a",
        "mo-soft": "#2e2620",
        // 兼容旧名（保留 cream/lavender/cocoa 防止遗漏引用报错）
        cream: "#c9a96e",
        lavender: "#7a2a3a",
        cocoa: "#1c1714",
        "cocoa-deep": "#0f0c0a",
        "cocoa-soft": "#2e2620",
        rouge: "#9c2f2a",
        "rouge-deep": "#6e1f1c",
        sage: "#2f5d6e",
      },
      fontFamily: {
        display: ['"Noto Serif SC"', '"Cormorant Garamond"', "Songti SC", "STSong", "serif"],
        body: ['"Noto Serif SC"', '"EB Garamond"', "Songti SC", "STSong", "serif"],
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
