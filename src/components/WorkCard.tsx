import type { Work } from "@/content/content.types";
import { gridColumnFor, gridRowFor, getGridPos } from "@/lib/slotGrid";
import WorkImage from "./WorkImage";
import { useReaderStore } from "@/store/readerStore";

interface WorkCardProps {
  work: Work;
  /** 在跨页内的序号，用于编号显示 */
  ordinal: number;
}

/**
 * 单件作品卡：图 + 编号 + 标题 + 媒介年份 + 手记
 * 点击图片打开灯箱。
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
          className={`relative overflow-hidden bg-cocoa/20 ${
            isFullBleed ? "aspect-[16/9]" : "aspect-[4/5]"
          }`}
        >
          <WorkImage
            work={work}
            className="h-full w-full object-cover"
            loading={ordinal <= 2 ? "eager" : "lazy"}
          />
          {/* 胶片白边 */}
          <div className="pointer-events-none absolute inset-0 ring-1 ring-ink/15" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cocoa-deep/25 via-transparent to-cream/10" />
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
