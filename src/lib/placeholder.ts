import type { Work } from "@/content/content.types";

/**
 * 生成一张中性极简风的 SVG 占位图 data URI，
 * 用于作者还没把真实图片丢进 public/works/ 时优雅地兜底。
 * 调色板：白底 + 浅灰 + 静谧蓝，与站点主色一致。
 */
export function makePlaceholder(
  work: Pick<Work, "title" | "category" | "id">
): string {
  const palette = {
    bg: "#fafafa",
    bg2: "#f4f5f6",
    accent: "#3B6FB0",
    accentSoft: "#EAF1F8",
    line: "#d8dade",
    text: "#5a6068",
  };

  const seed = hashString(work.id || work.title);
  const shapes = Array.from({ length: 4 }, (_, i) => {
    const cx = 50 + Math.sin(seed + i * 1.7) * 28;
    const cy = 50 + Math.cos(seed + i * 2.3) * 22;
    const r = 14 + ((seed + i * 5) % 16);
    const op = 0.06 + ((seed + i * 3) % 10) / 100;
    return `<circle cx='${cx.toFixed(1)}' cy='${cy.toFixed(1)}' r='${r.toFixed(
      1
    )}' fill='${i % 2 === 0 ? palette.accent : palette.line}' opacity='${op.toFixed(
      2
    )}'/>`;
  }).join("");

  const label = escapeXml(work.title || "未命名");
  const cat =
    work.category === "photography"
      ? "PHOTOGRAPHY"
      : work.category === "installation"
        ? "INSTALLATION"
        : "PAINTING";

  const svg = `<?xml version='1.0' encoding='UTF-8'?>
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 1000' preserveAspectRatio='xMidYMid slice'>
  <defs>
    <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='${palette.bg}'/>
      <stop offset='100%' stop-color='${palette.bg2}'/>
    </linearGradient>
  </defs>
  <rect width='800' height='1000' fill='url(#g)'/>
  <g>${shapes}</g>
  <g stroke='${palette.line}' stroke-width='1' opacity='0.5'>
    <line x1='40' y1='40' x2='760' y2='40'/>
    <line x1='40' y1='960' x2='760' y2='960'/>
    <line x1='40' y1='40' x2='40' y2='960'/>
    <line x1='760' y1='40' x2='760' y2='960'/>
  </g>
  <g font-family='Inter, system-ui, sans-serif' fill='${palette.text}'>
    <text x='60' y='80' font-size='14' letter-spacing='4' fill='${palette.accent}' opacity='0.85'>${cat}</text>
    <text x='60' y='920' font-size='28' font-weight='600'>${label}</text>
  </g>
</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
