import { useState } from "react";
import { siteContent } from "@/content/content.config";

/**
 * Hero：全屏背景图 + 居中手绘字。
 * 默认显示「你好」（马善政毛笔行书），hover 变「特特特」。
 * mix-blend-mode: multiply 让黑色字融入图里，像印上去一样不突兀。
 * 图片渐进淡入：加载前白底，加载完淡入显示。
 */
export default function Hero() {
  const { heroGreeting, tagline, heroImage } = siteContent;
  const [hovered, setHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {heroImage && (
        <>
          <img
            src={heroImage}
            alt=""
            draggable={false}
            onLoad={() => setImgLoaded(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
          {/* 图片加载后加一层极淡的白色雾化，让字更清晰 */}
          <div
            className={`absolute inset-0 bg-white/10 transition-opacity duration-700 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-gallery px-6 text-center md:px-10">
        {heroGreeting && (
          <p
            className="font-sans text-sm uppercase tracking-wider2 text-slate"
            style={{ mixBlendMode: "multiply" }}
          >
            {heroGreeting}
          </p>
        )}

        {/* 手绘字主体：默认「你好」，hover 变「特特特」 */}
        <h1
          className="relative mt-6 font-hand text-7xl leading-[1.1] text-ink md:text-9xl"
          style={{
            mixBlendMode: "multiply",
          }}
        >
          <span
            className={`absolute inset-x-0 text-center transition-opacity duration-300 ${
              hovered ? "opacity-0" : "opacity-100"
            }`}
          >
            你好
          </span>
          <span
            className={`absolute inset-x-0 text-center transition-opacity duration-300 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          >
            特特特
          </span>
          {/* 占位撑开高度，避免 absolute 塌陷 */}
          <span className="invisible">特特特</span>
        </h1>

        <p
          className="mx-auto mt-8 max-w-xl font-sans text-base leading-relaxed text-slate md:text-lg"
          style={{ mixBlendMode: "multiply" }}
        >
          {tagline}
        </p>
      </div>

      <a
        href="#works"
        aria-label="向下滚动"
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] uppercase tracking-wider2 text-slate transition-colors hover:text-blue"
        style={{ mixBlendMode: "multiply" }}
      >
        <span className="block animate-pulse">↓ scroll</span>
      </a>
    </section>
  );
}
