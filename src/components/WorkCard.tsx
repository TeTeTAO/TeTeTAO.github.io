import type { Orientation, Work } from "@/content/content.types";
import { gridColumnFor, gridRowFor, getGridPos } from "@/lib/slotGrid";
import WorkImage from "./WorkImage";
import { useReaderStore } from "@/store/readerStore";
import { siteContent } from "@/content/content.config";

interface WorkCardProps {
  work: Work;
  /** 在跨页内的序号，用于编号显示 */
  ordinal: number;
}

/** 按 orientation 选 aspect ratio，避免横图被裁切 */
function aspectFor(orientation: Orientation | undefined, isFullBleed: boolean): string {
  if (isFullBleed) return "aspect-[16/9]";
  switch (orientation) {
    case "landscape":
      return "aspect-[3/2]";
    case "square":
      return "aspect-square";
    case "portrait":
    default:
      return "aspect-[4/5]";
  }
}

/**
 * 单件作品卡：图 + 编号 + 标题 + 媒介年份 + 手记
 * 点击图片打开灯箱。
 * 叠加 CSS 水印层（截图会带水印），保护 deployed site 上的图片。
 */
export default function WorkCard({ work, ordinal }: WorkCardProps) {
  const openLightbox = useReaderStore((s) => s.openLightbox);
  const span = work.span ?? 6;
  const rotate = work.rotate ?? 0;
  const offset = work.offset ?? {};
  const pos = getGridPos(work.slot);

  const style: React.CSSProperties = {
    gridColumn: gridColumnFor(work.slot, span),
    gridRow: gridRowFor(work.slot),
    justifySelf: work.slot === "full-bleed" ? "stretch" : "start",
    alignSelf: pos.align,
    transform: `translate(${offset.x ?? 0}px, ${offset.y ?? 0}px) rotate(${rotate}deg)`,
  };

  const isFullBleed = work.slot === "full-bleed";
  const protection = siteContent.protection;
  const showWatermark = protection?.watermark ?? true;
  const watermarkText = protection?.watermarkText ?? siteContent.magazineName;

  return (
    <figure
      style={style}
      className={`work-frame group ${isFullBleed ? "h-full w-full" : "max-w-full"}`}
      data-work-id={work.id}
    >
      <button
        type="button"
        onClick={() => openLightbox(work.id)}
        className="block w-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-rouge/60"
        aria-label={`放大查看：${work.title}`}
      >
        <div
          className={`relative overflow-hidden bg-cocoa/20 ${aspectFor(
            work.orientation,
            isFullBleed,
          )}`}
        >
          <WorkImage
            work={work}
            className="h-full w-full object-cover select-none"
            loading={ordinal <= 2 ? "eager" : "lazy"}
          />
          {/* 胶片白边 */}
          <div className="pointer-events-none absolute inset-0 ring-1 ring-ink/15" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cocoa-deep/25 via-transparent to-cream/10" />
          {/* CSS 水印叠层：平铺半透明文字，截图会带上，但不影响原图文件 */}
          {showWatermark && (
            <div
              className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
              aria-hidden
            >
              <div
                className="whitespace-nowrap font-mono text-[10px] uppercase tracking-caption text-paper/25 mix-blend-overlay"
                style={{
                  transform: "rotate(-28deg) scale(1.6)",
                  letterSpacing: "0.4em",
                }}
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <span key={i} className="mx-8">
                    {watermarkText}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </button>

      <figcaption
        className={`mt-3 ${isFullBleed ? "max-w-xl" : "max-w-full"}`}
      >
        <div className="flex items-baseline gap-3 font-mono text-[10px] uppercase tracking-caption text-ink-faint">
          <span className="text-rouge">№ {String(ordinal).padStart(2, "0")}</span>
          <span className="h-px flex-1 bg-ink/20" />
          <span>
            {work.medium} · {work.year}
          </span>
        </div>
        <h3 className="mt-1 font-display text-2xl font-semibold leading-tight text-ink">
          {work.title}
        </h3>
        {work.note && (
          <p className="mt-2 font-body text-[15px] italic leading-relaxed text-ink-soft">
            {work.note}
          </p>
        )}
      </figcaption>
    </figure>
  );
}
