import { useEffect } from "react";
import { siteContent } from "@/content/content.config";
import { useReaderStore } from "@/store/readerStore";
import WorkImage from "./WorkImage";

/**
 * 图片放大灯箱：全屏近黑背景 + 中央图片 + 下方元信息。
 * ESC / 点击空白 / 点击关闭按钮 关闭。
 */
export default function Lightbox() {
  const workId = useReaderStore((s) => s.lightboxWorkId);
  const close = useReaderStore((s) => s.closeLightbox);

  useEffect(() => {
    if (!workId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    // 锁定背景滚动
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [workId, close]);

  if (!workId) return null;

  const work = siteContent.works.find((w) => w.id === workId);
  if (!work) return null;

  const catMeta = siteContent.categories.find((c) => c.id === work.category);

  const protection = {
    watermark: siteContent.protection?.watermark ?? true,
    watermarkText:
      siteContent.protection?.watermarkText ?? siteContent.brand,
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${work.title} — 放大查看`}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
    >
      {/* 背景 */}
      <button
        type="button"
        aria-label="关闭"
        onClick={close}
        className="lightbox-fade absolute inset-0 cursor-zoom-out bg-ink/90"
      />

      {/* 中央图片 */}
      <figure className="lightbox-image relative z-10 flex max-h-full max-w-5xl flex-col">
        <div className="relative overflow-hidden bg-charcoal">
          <WorkImage
            work={work}
            reveal={false}
            className="max-h-[80vh] w-auto object-contain select-none"
            loading="eager"
          />
          {/* 灯箱水印叠层 */}
          {protection.watermark && (
            <div
              className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
              aria-hidden
            >
              <div
                className="whitespace-nowrap font-mono text-[11px] uppercase tracking-caption text-white/15 mix-blend-overlay"
                style={{
                  transform: "rotate(-28deg) scale(1.8)",
                  letterSpacing: "0.5em",
                }}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="mx-10">
                    {protection.watermarkText}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <figcaption className="mt-4 flex items-end justify-between gap-6 text-white">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-caption text-blue">
              {[catMeta?.caption ?? work.category, work.medium, work.year].filter(Boolean).join(" · ")}
            </div>
            <h3 className="mt-1.5 font-display text-2xl font-semibold leading-tight">
              {work.title}
            </h3>
            {work.note && (
              <p className="mt-2 max-w-md font-sans text-sm leading-relaxed text-white/65">
                {work.note}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={close}
            className="shrink-0 font-mono text-[10px] uppercase tracking-caption text-white/60 transition-colors hover:text-white"
          >
            [ esc ] close
          </button>
        </figcaption>
      </figure>
    </div>
  );
}
