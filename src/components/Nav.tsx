import { useEffect, useState } from "react";
import { siteContent } from "@/content/content.config";

/**
 * 顶部导航：sticky，滚动时由透明变白底 + 细边。
 * 链接到页面锚点（#works #about #contact）。
 */
const LINKS = [
  { href: "#works", label: "作品" },
  { href: "#about", label: "关于" },
  { href: "#contact", label: "联络" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-haze bg-white/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-gallery items-center justify-between px-6 md:px-10">
        <a
          href="#top"
          className="font-display text-base font-semibold tracking-tight text-ink hover:text-blue transition-colors"
        >
          {siteContent.brand}
        </a>

        <nav className="flex items-center gap-7">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-sans text-sm text-slate hover:text-ink transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
