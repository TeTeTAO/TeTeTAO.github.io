import type { Work } from "@/content/content.types";

/**
 * 生成一张梦核胶片感的 SVG 占位图 data URI，
 * 用于作者还没把真实图片丢进 public/works/ 时优雅地兜底。
 */
export function makePlaceholder(work: Pick<Work, "title" | "category" | "id">): string {
  const palette =
    work.category === "photography"
      ? {
          bg1: "#3d322a",
          bg2: "#1a1410",
          accent: "#f2d98a",
          glow: "rgba(201, 184, 214, 0.5)",
        }
      : {
          bg1: "#ead9b9",
          bg2: "#c9b48c",
          accent: "#b5553a",
          glow: "rgba(242, 217, 138, 0.55)",
        };

  const seed = hashString(work.id || work.title);
  const shapes = Array.from({ length: 6 }, (_, i) => {
    const cx = 50 + Math.sin(seed + i * 1.7) * 30;
    const cy = 50 + Math.cos(seed + i * 2.3) * 24;
    const r = 18 + ((seed + i * 5) % 22);
    const op = 0.12 + ((seed + i * 3) % 18) / 100;
    return `<circle cx='${cx.toFixed(1)}' cy='${cy.toFixed(1)}' r='${r.toFixed(1)}' fill='${accentOrLavender(i)}' opacity='${op.toFixed(2)}' filter='url(#b)'/>`;
  }).join("");

  function accentOrLavender(i: number) {
    return i % 2 === 0 ? palette.accent : "#c9b8d6";
  }

  const label = escapeXml(work.title || "未命名");
  const cat =
    work.category === "photography" ? "PHOTOGRAPH" : "PAINTING";

  const svg = `<?xml version='1.0' encoding='UTF-8'?>
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 1000' preserveAspectRatio='xMidYMid slice'>
  <defs>
    <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='${palette.bg1}'/>
      <stop offset='100%' stop-color='${palette.bg2}'/>
    </linearGradient>
    <radialGradient id='glow' cx='50%' cy='42%' r='55%'>
      <stop offset='0%' stop-color='${palette.glow}'/>
      <stop offset='100%' stop-color='transparent'/>
    </radialGradient>
    <filter id='b'>
      <feGaussianBlur stdDeviation='14'/>
    </filter>
    <filter id='n'>
      <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>
      <feColorMatrix values='0 0 0 0 0.16 0 0 0 0 0.13 0 0 0 0 0.11 0 0 0 0.4 0'/>
    </filter>
  </defs>
  <rect width='800' height='1000' fill='url(#g)'/>
  <rect width='800' height='1000' fill='url(#glow)'/>
  <g>${shapes}</g>
  <rect width='800' height='1000' filter='url(#n)' opacity='0.55'/>
  <g font-family='Georgia, serif' fill='${palette.accent}' opacity='0.85'>
    <text x='40' y='60' font-size='22' letter-spacing='6'>${cat}</text>
    <text x='40' y='960' font-size='34' font-style='italic'>${label}</text>
  </g>
  <g stroke='${palette.accent}' stroke-width='1' opacity='0.35'>
    <line x1='20' y1='20' x2='780' y2='20'/>
    <line x1='20' y1='980' x2='780' y2='980'/>
    <line x1='20' y1='20' x2='20' y2='980'/>
    <line x1='780' y1='20' x2='780' y2='980'/>
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
