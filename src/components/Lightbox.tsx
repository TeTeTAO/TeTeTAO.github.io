import { useEffect } from "react";
import { siteContent } from "@/content/content.config";
import { useReaderStore } from "@/store/readerStore";
import WorkImage from "./WorkImage";

/**
 * 图片放大灯箱：全屏深可可背景 + 中央图片 + 右下角元信息。
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
    return () => window.removeEventListener("keydown", onKey);
  }, [workId, close]);

  if (!workId) return null;

  const work = siteContent.works.find((w) => w.id === workId);
  if (!work) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${work.title} — 放大查看`}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12"
    >
      {/* 背景 */}
      <button
        type="button"
        aria-label="关闭"
        onClick={close}
        className="absolute inset-0 cursor-zoom-out bg-cocoa-deep/85 lightbox-fade"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 30% 30%, rgba(201, 184, 214, 0.18), transparent 55%), radial-gradient(ellipse at 75% 70%, rgba(242, 217, 138, 0.14), transparent 55%)",
        }}
      />

      {/* 中央图片 */}
      <figure className="lightbox-image relative z-10 flex max-h-full max-w-5xl flex-col">
        <div className="relative overflow-hidden bg-cocoa">
          <WorkImage
            work={work}
            reveal={false}
            className="max-h-[78vh] w-auto object-contain"
            loading="eager"
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-cream/20" />
        </div>
        <figcaption className="mt-4 flex items-baseline justify-between gap-6 text-cream">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-caption text-cream/60">
              № {work.id} · {work.medium} · {work.year}
            </div>
            <h3 className="mt-1 font-display text-2xl font-semibold italic">
              {work.title}
            </h3>
            {work.note && (
              <p className="mt-2 max-w-md font-body text-sm italic text-cream/70">
                {work.note}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={close}
            className="shrink-0 font-mono text-[10px] uppercase tracking-caption text-cream/70 hover:text-cream"
          >
            [ esc ] close
          </button>
        </figcaption>
      </figure>
    </div>
  );
}
