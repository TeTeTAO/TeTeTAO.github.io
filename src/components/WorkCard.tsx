import type { Work } from "@/content/content.types";
import { siteContent } from "@/content/content.config";
import WorkImage from "./WorkImage";
import { useReaderStore } from "@/store/readerStore";

interface WorkCardProps {
  work: Work;
  /** 是否启用渐入动画（精选区不需要） */
  reveal?: boolean;
  /** 是否大尺寸（精选区用） */
  size?: "regular" | "featured";
}

/**
 * 单件作品卡：图片 + 下方标题 / 媒介年份 / 手记。
 * 图片保持原始比例（masonry 布局，object-cover 兜底）。
 * 点击图片打开灯箱。
 * 叠加 CSS 水印层（截图会带水印）。
 */
export default function WorkCard({
  work,
  reveal = true,
  size = "regular",
}: WorkCardProps) {
  const openLightbox = useReaderStore((s) => s.openLightbox);

  const protection = siteContent.protection;
  const showWatermark = protection?.watermark ?? true;
  const watermarkText = protection?.watermarkText ?? siteContent.brand;

  const catMeta = siteContent.categories.find((c) => c.id === work.category);

  return (
    <figure
      className={`work-card group ${reveal ? "reveal" : ""} ${
        size === "featured" ? "mb-0" : "mb-6 break-inside-avoid"
      }`}
      data-work-id={work.id}
    >
      <button
        type="button"
        onClick={() => openLightbox(work.id)}
        className="block w-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-blue/50"
        aria-label={`放大查看：${work.title}`}
      >
        <div className="relative overflow-hidden bg-fog">
          <WorkImage
            work={work}
            reveal={false}
            className="work-card-img block h-auto w-full select-none"
            loading={size === "featured" ? "eager" : "lazy"}
          />
          {/* 细边 */}
          <div className="pointer-events-none absolute inset-0 ring-1 ring-ink/5" />
          {/* 类别小标 */}
          <div className="absolute left-3 top-3">
            <span className="inline-block bg-white/90 px-2 py-1 font-mono text-[10px] uppercase tracking-caption text-slate backdrop-blur-sm">
              {catMeta?.caption ?? work.category}
            </span>
          </div>
          {/* CSS 水印叠层 */}
          {showWatermark && (
            <div
              className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
              aria-hidden
            >
              <div
                className="whitespace-nowrap font-mono text-[10px] uppercase tracking-caption text-ink/10 mix-blend-multiply"
                style={{
                  transform: "rotate(-28deg) scale(1.6)",
                  letterSpacing: "0.4em",
                }}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="mx-8">
                    {watermarkText}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </button>

      <figcaption className={`mt-4 ${size === "featured" ? "px-1" : ""}`}>
        <div className="flex items-baseline gap-3 font-mono text-[10px] uppercase tracking-caption text-ash">
          <span className="text-blue">·</span>
          <span>
            {work.medium} · {work.year}
          </span>
        </div>
        <h3
          className={`mt-1.5 font-display font-semibold leading-tight text-ink ${
            size === "featured" ? "text-xl md:text-2xl" : "text-lg"
          }`}
        >
          {work.title}
        </h3>
        {work.note && (
          <p
            className={`mt-2 font-sans leading-relaxed text-slate ${
              size === "featured" ? "text-sm md:text-[15px]" : "text-sm"
            }`}
          >
            {work.note}
          </p>
        )}
      </figcaption>
    </figure>
  );
}
