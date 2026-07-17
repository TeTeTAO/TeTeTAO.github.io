import type { Chapter } from "@/content/content.types";

interface ChapterCoverProps {
  chapter: Chapter;
  /** 该章节收录的作品数 */
  plateCount: number;
}

/**
 * 章节封面：整页浓墨背景，居中大号宋体章节名，
 * 金箔字 + 朱砂光晕，下方一行小字系列说明。
 */
export default function ChapterCover({ chapter, plateCount }: ChapterCoverProps) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-mo-deep text-paper">
      {/* 水墨晕染背景：朱砂晕 + 金箔晕 + 墨色暗角 */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 30%, rgba(156, 47, 42, 0.28), transparent 55%), radial-gradient(ellipse at 75% 70%, rgba(201, 169, 110, 0.22), transparent 50%), radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.6) 100%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto flex h-full max-w-spread flex-col items-center justify-center px-6 text-center">
        <span className="chapter-rise font-mono text-[10px] uppercase tracking-caption text-gold/80">
          卷 · {chapter.category === "photography" ? "銀鹽日記" : "顏料回聲"}
        </span>

        <h2
          className="chapter-rise mt-6 font-display text-[14vw] font-bold leading-tight text-gold md:text-[140px]"
          style={{ animationDelay: "0.2s" }}
        >
          {chapter.title}
        </h2>

        {chapter.subtitle && (
          <p
            className="chapter-rise mt-4 font-mono text-xs uppercase tracking-caption text-yuebai/70 md:text-sm"
            style={{ animationDelay: "0.5s" }}
          >
            {chapter.subtitle}
          </p>
        )}

        <div
          className="chapter-rise mt-10 flex items-center gap-4 font-mono text-[10px] uppercase tracking-caption text-paper/50"
          style={{ animationDelay: "0.8s" }}
        >
          <span className="h-px w-12 bg-vermilion/60" />
          <span>收 {plateCount} 件</span>
          <span className="h-px w-12 bg-vermilion/60" />
        </div>

        {/* 底部朱砂闲章 */}
        <span
          className="seal chapter-rise mt-8 h-14 w-14 flex-col items-center justify-center text-[15px] leading-none"
          style={{ animationDelay: "1.1s" }}
        >
          <span>{chapter.category === "photography" ? "影" : "畫"}</span>
        </span>
      </div>
    </div>
  );
}
