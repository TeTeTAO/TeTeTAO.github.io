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
 * 图片组件：尝试加载 work.src，
 * 失败时自动回退到生成的梦核胶片占位图，
 * 让作者没把真实图片丢进 public/works/ 时也好看。
 * 根据 protection 配置禁用右键菜单与拖拽（挡小白，挡不住 F12）。
 */
export default function WorkImage({
  work,
  className,
  reveal = true,
  loading = "lazy",
}: WorkImageProps) {
  const [errored, setErrored] = useState(false);
  const protection = siteContent.protection;
  const disableContextMenu = protection?.disableContextMenu ?? true;
  const disableDrag = protection?.disableDrag ?? true;

  useEffect(() => {
    setErrored(false);
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
      className={`${reveal ? "image-reveal" : ""} ${className ?? ""}`}
      draggable={!disableDrag}
      onContextMenu={
        disableContextMenu ? (e) => e.preventDefault() : undefined
      }
    />
  );
}
