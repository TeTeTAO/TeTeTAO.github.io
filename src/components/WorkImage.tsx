import { useEffect, useState } from "react";
import type { Work } from "@/content/content.types";
import { makePlaceholder } from "@/lib/placeholder";
import { siteContent } from "@/content/content.config";

interface WorkImageProps {
  work: Pick<Work, "id" | "src" | "title" | "category" | "alt">;
  className?: string;
  /** 是否启用渐入动画 */
  reveal?: boolean;
  loading?: "lazy" | "eager";
}

/**
 * 图片组件：渐进模糊加载。
 * 加载前显示模糊 + 放大的占位（blur + scale），
 * 加载完成后过渡到清晰。失败时回退到 SVG 占位图。
 * 根据 protection 配置禁用右键菜单与拖拽（挡小白，挡不住 F12）。
 */
export default function WorkImage({
  work,
  className,
  reveal = true,
  loading = "lazy",
}: WorkImageProps) {
  const [errored, setErrored] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const protection = siteContent.protection;
  const disableContextMenu = protection?.disableContextMenu ?? true;
  const disableDrag = protection?.disableDrag ?? true;

  useEffect(() => {
    setErrored(false);
    setLoaded(false);
  }, [work.src]);

  const src = errored ? makePlaceholder(work) : work.src;
  const alt = work.alt ?? work.title ?? "";

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={() => setErrored(true)}
      onLoad={() => setLoaded(true)}
      draggable={!disableDrag}
      onContextMenu={
        disableContextMenu ? (e) => e.preventDefault() : undefined
      }
      className={`${className ?? ""} transition-all duration-700 ${
        loaded
          ? "blur-0 scale-100 opacity-100"
          : "blur-xl scale-105 opacity-60"
      }`}
    />
  );
}
