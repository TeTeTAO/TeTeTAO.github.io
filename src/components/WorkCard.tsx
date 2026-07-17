import type { Orientation, Work } from "@/content/content.types";
import { gridColumnFor, gridRowFor, getGridPos, isTallSlot } from "@/lib/slotGrid";
import WorkImage from "./WorkImage";
import { useReaderStore } from "@/store/readerStore";
import { siteContent } from "@/content/content.config";

interface WorkCardProps {
  work: Work;
  /** 在跨页内的序号，用于编号显示 */
  ordinal: number;
}

/** 按 orientation 选 aspect ratio，避免横图被裁切 */
function aspectFor(orientation: Orientation | undefined): string {
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
 * 大图槽位（full-bleed / left-full / right-full / center-full）撑满高度，图片占比最大化。
 * 叠加 CSS 水印层（截图会带水印），保护 deployed site 上的图片。
 */
export default function WorkCard({ work, ordinal }: WorkCardProps) {
  const openLightbox = useReaderStore((s) => s.openLightbox);
  const span = work.span ?? 6;
  const rotate = work.rotate ?? 0;
  const offset = work.offset ?? {};
  const pos = getGridPos(work.slot);

  const tall = isTallSlot(work.slot);

  const style: React.CSSProperties = {
    gridColumn: gridColumnFor(work.slot, span),
    gridRow: gridRowFor(work.slot),
    justifySelf: tall ? "stretch" : "start",
    alignSelf: pos.align,
    transform: `translate(${offset.x ?? 0}px, ${offset.y ?? 0}px) rotate(${rotate}deg)`,
  };

  const protection = siteContent.protection;
  const showWatermark = protection?.watermark ?? true;
  const watermarkText = protection?.watermarkText ?? siteContent.magazineName;

  // 大图槽位：图撑满高度，caption 叠在图上或缩在底部
  if (tall) {
    return (
      <figure
        style={style}
        className={`work-frame group relative h-full w-full`}
        data-work-id={work.id}
      >
        <button
          type="button"
          onClick={() => openLightbox(work.id)}
          className="block h-full w-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-vermilion/60"
          aria-label={`放大查看：${work.title}`}
        >
          <div className="relative h-full w-full overflow-hidden bg-mo/20">
            <WorkImage
              work={work}
              className="h-full w-full object-cover select-none"
              loading={ordinal <= 2 ? "eager" : "lazy"}
            />
            {/* 朱砂细边 */}
            <div className="pointer-events-none absolute inset-0 ring-1 ring-ink/20" />
            {/* 底部墨色渐隐，承载 caption */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-mo-deep/85 via-mo-deep/30 to-transparent" />
            {/* 顶部朱砂印章感编号 */}
            <div className="absolute left-4 top-4 flex items-center gap-2">
              <span className="seal px-2 py-1 font-mono text-[10px] uppercase tracking-caption">
                № {String(ordinal).padStart(2, "0")}
              </span>
            </div>
            {/* CSS 水印叠层 */}
            {showWatermark && (
              <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
                aria-hidden
              >
                <div
                  className="whitespace-nowrap font-mono text-[10px] uppercase tracking-caption text-paper/20 mix-blend-overlay"
                  style={{
                    transform: "rotate(-28deg) scale(1.8)",
                    letterSpacing: "0.45em",
                  }}
                >
                  {Array.from({ length: 6 }).map((_, i) => (
                    <span key={i} className="mx-10">
                      {watermarkText}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {/* 叠在图上的 caption */}
            <figcaption className="absolute inset-x-0 bottom-0 px-6 pb-5 pt-10 text-paper">
              <div className="flex items-baseline gap-3 font-mono text-[10px] uppercase tracking-caption text-gold/90">
                <span className="h-px w-8 bg-gold/60" />
                <span>
                  {work.medium} · {work.year}
                </span>
              </div>
              <h3 className="mt-1 font-display text-3xl font-semibold leading-tight text-paper md:text-4xl">
                {work.title}
              </h3>
              {work.note && (
                <p className="mt-2 max-w-xl font-body text-[15px] italic leading-relaxed text-paper/80">
                  {work.note}
                </p>
              )}
            </figcaption>
          </div>
        </button>
      </figure>
    );
  }

  // 普通槽位：图 + 下方 caption
  return (
    <figure
      style={style}
      className="work-frame group max-w-full"
      data-work-id={work.id}
    >
      <button
        type="button"
        onClick={() => openLightbox(work.id)}
        className="block w-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-vermilion/60"
        aria-label={`放大查看：${work.title}`}
      >
        <div
          className={`relative overflow-hidden bg-mo/20 ${aspectFor(work.orientation)}`}
        >
          <WorkImage
            work={work}
            className="h-full w-full object-cover select-none"
            loading={ordinal <= 2 ? "eager" : "lazy"}
          />
          {/* 朱砂细边 */}
          <div className="pointer-events-none absolute inset-0 ring-1 ring-ink/20" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-mo-deep/25 via-transparent to-gold/10" />
          {/* 左上朱砂印章编号 */}
          <div className="absolute left-3 top-3">
            <span className="seal px-2 py-0.5 font-mono text-[10px] uppercase tracking-caption">
              № {String(ordinal).padStart(2, "0")}
            </span>
          </div>
          {/* CSS 水印叠层 */}
          {showWatermark && (
            <div
              className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
              aria-hidden
            >
              <div
                className="whitespace-nowrap font-mono text-[10px] uppercase tracking-caption text-paper/20 mix-blend-overlay"
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

      <figcaption className="mt-3 max-w-full">
        <div className="flex items-baseline gap-3 font-mono text-[10px] uppercase tracking-caption text-ink-faint">
          <span className="text-vermilion">№ {String(ordinal).padStart(2, "0")}</span>
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
