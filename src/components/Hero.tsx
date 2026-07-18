import { siteContent } from "@/content/content.config";

/**
 * Hero：全屏背景图 + 居中叠字。
 * 文字层次：打招呼（小字）→ 品牌名（大字）→ tagline。
 * 白色文字 + 细阴影，在任何背景图上都清晰可读。
 */
export default function Hero() {
  const { brand, heroGreeting, tagline, heroImage } = siteContent;

  return (
    <section
      id="top"
      className={`relative flex min-h-screen items-center justify-center overflow-hidden ${
        heroImage ? "bg-charcoal" : "bg-white"
      }`}
    >
      {heroImage && (
        <>
          <img
            src={heroImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-black/15" />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-gallery px-6 text-center md:px-10">
        {heroGreeting && (
          <p
            className={`font-sans text-sm uppercase tracking-wider2 ${
              heroImage ? "text-white/90" : "text-ash"
            }`}
            style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}
          >
            {heroGreeting}
          </p>
        )}

        <h1
          className={`mt-4 font-display text-6xl font-semibold leading-[1.05] tracking-tight md:text-8xl ${
            heroImage ? "text-white" : "text-ink"
          }`}
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.35)" }}
        >
          {brand}
        </h1>

        <p
          className={`mx-auto mt-6 max-w-xl font-sans text-base leading-relaxed md:text-lg ${
            heroImage ? "text-white/90" : "text-slate"
          }`}
          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}
        >
          {tagline}
        </p>
      </div>

      <a
        href="#works"
        aria-label="向下滚动"
        className={`absolute bottom-10 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] uppercase tracking-wider2 transition-colors ${
          heroImage ? "text-white/80 hover:text-white" : "text-ash hover:text-blue"
        }`}
      >
        <span className="block animate-pulse">↓ scroll</span>
      </a>
    </section>
  );
}
