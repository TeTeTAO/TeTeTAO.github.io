import type { Chapter } from "@/content/content.types";

interface ChapterCoverProps {
  chapter: Chapter;
  /** 该章节收录的作品数 */
  plateCount: number;
}

/**
 * 章节封面：整页深可可背景，居中大号章节名，
 * 下方一行小字系列说明。
 */
export default function ChapterCover({ chapter, plateCount }: ChapterCoverProps) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-cocoa-deep text-paper">
      {/* 梦核光晕背景 */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 30%, rgba(201, 184, 214, 0.22), transparent 55%), radial-gradient(ellipse at 75% 70%, rgba(242, 217, 138, 0.18), transparent 50%), radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto flex h-full max-w-spread flex-col items-center justify-center px-6 text-center">
        <span className="font-mono text-[10px] uppercase tracking-caption text-cream/70 chapter-rise">
          Chapter · {chapter.category === "photography" ? "Photographs" : "Paintings"}
        </span>

        <h2
          className="chapter-rise mt-6 font-display text-[14vw] font-semibold leading-tight text-cream md:text-[140px]"
          style={{ animationDelay: "0.2s" }}
        >
          {chapter.title}
        </h2>

        {chapter.subtitle && (
          <p
            className="chapter-rise mt-4 font-mono text-xs uppercase tracking-caption text-lavender/80 md:text-sm"
            style={{ animationDelay: "0.5s" }}
          >
            {chapter.subtitle}
          </p>
        )}

        <div
          className="chapter-rise mt-10 flex items-center gap-4 font-mono text-[10px] uppercase tracking-caption text-paper/50"
          style={{ animationDelay: "0.8s" }}
        >
          <span className="h-px w-12 bg-paper/30" />
          <span>{plateCount} plates</span>
          <span className="h-px w-12 bg-paper/30" />
        </div>
      </div>
    </div>
  );
}
