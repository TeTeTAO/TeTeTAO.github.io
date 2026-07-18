import { useState } from "react";
import { siteContent } from "@/content/content.config";

/**
 * Hero：纯背景图，无任何叠字。
 * 图片渐进淡入：加载前白底，加载完淡入显示。
 * 导航在右下角 Nav 组件，Hero 区域完全干净。
 */
export default function Hero() {
  const { heroImage } = siteContent;
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white"
    >
      {heroImage && (
        <img
          src={heroImage}
          alt=""
          draggable={false}
          onLoad={() => setImgLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* scroll 提示：底部居中，避开右下角导航 */}
      <a
        href="#works"
        aria-label="向下滚动"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-wider2 text-ink/70 mix-blend-multiply transition-colors hover:text-blue"
      >
        <span>scroll</span>
        <span className="block animate-bounce text-base leading-none">↓</span>
      </a>
    </section>
  );
}
