import { siteContent } from "@/content/content.config";

/**
 * Hero：占近一屏，居中大标题 + tagline + 滚动提示。
 * 若配置了 heroImage 则作为背景图（带轻微暗化保证文字可读）。
 */
export default function Hero() {
  const { brand, tagline, heroImage } = siteContent;

  return (
    <section
      id="top"
      className={`relative flex min-h-[88vh] items-center justify-center overflow-hidden ${
        heroImage ? "" : "bg-white"
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
          <div className="absolute inset-0 bg-white/55" />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-gallery px-6 text-center md:px-10">
        <div className="mb-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider2 text-ash">
          <span className="h-px w-8 bg-stone" />
          <span>Portfolio · {new Date().getFullYear()}</span>
          <span className="h-px w-8 bg-stone" />
        </div>

        <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink md:text-7xl">
          {brand}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-slate md:text-lg">
          {tagline}
        </p>

        <div className="mt-10 flex items-center justify-center gap-3">
          <a
            href="#works"
            className="inline-flex items-center gap-2 rounded-full bg-blue px-6 py-2.5 font-sans text-sm font-medium text-white transition-colors hover:bg-blue-deep"
          >
            浏览作品
          </a>
          <a
            href="#about"
            className="inline-flex items-center gap-2 rounded-full border border-haze px-6 py-2.5 font-sans text-sm font-medium text-charcoal transition-colors hover:border-ash hover:text-ink"
          >
            关于
          </a>
        </div>
      </div>

      <a
        href="#works"
        aria-label="向下滚动"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] uppercase tracking-wider2 text-ash transition-colors hover:text-blue"
      >
        <span className="block animate-pulse">↓ scroll</span>
      </a>
    </section>
  );
}
