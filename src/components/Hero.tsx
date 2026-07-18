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
    </section>
  );
}
