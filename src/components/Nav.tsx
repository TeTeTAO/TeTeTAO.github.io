import { useState } from "react";

/**
 * 右下角浮动导航：三个小圆点（作品 / 关于 / 联络）。
 * 鼠标悬停整组时展开标签，平时只显示圆点，不挡主视觉。
 * 透明背景 + 毛玻璃，融入任何画面。
 */
const LINKS = [
  { href: "#works", label: "作品", index: "01" },
  { href: "#about", label: "关于", index: "02" },
  { href: "#contact", label: "联络", index: "03" },
];

export default function Nav() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {LINKS.map((l, i) => (
        <a
          key={l.href}
          href={l.href}
          className="group flex items-center gap-2.5"
          aria-label={l.label}
        >
          {/* 标签：默认收起，hover 整组时展开 */}
          <span
            className={`overflow-hidden whitespace-nowrap rounded-full bg-white/85 px-3 py-1 font-mono text-[10px] uppercase tracking-caption text-slate backdrop-blur-md transition-all duration-300 ${
              expanded
                ? "max-w-[120px] opacity-100"
                : "max-w-0 opacity-0 px-0"
            }`}
            style={{ transitionDelay: expanded ? `${i * 40}ms` : "0ms" }}
          >
            <span className="text-blue">{l.index}</span> {l.label}
          </span>

          {/* 圆点 */}
          <span className="block h-2.5 w-2.5 rounded-full bg-ink/70 ring-2 ring-white/60 backdrop-blur-sm transition-all duration-300 group-hover:bg-blue group-hover:scale-125" />
        </a>
      ))}
    </div>
  );
}
