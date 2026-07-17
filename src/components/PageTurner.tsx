import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReaderStore } from "@/store/readerStore";

interface PageTurnerProps {
  /** 当前 spread 在书中的"页码"标签 */
  label: string;
}

/**
 * 底部翻页控件：左侧上一页、中间页码标签、右侧下一页。
 */
export default function PageTurner({ label }: PageTurnerProps) {
  const currentIndex = useReaderStore((s) => s.currentIndex);
  const total = useReaderStore((s) => s.total);
  const prev = useReaderStore((s) => s.prev);
  const next = useReaderStore((s) => s.next);

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 pointer-events-none"
      aria-label="翻页"
    >
      <div className="mx-auto flex max-w-spread items-center justify-between px-6 pb-4 md:px-16">
        <button
          type="button"
          onClick={prev}
          disabled={currentIndex === 0}
          aria-label="上一页"
          className="pointer-events-auto inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-caption text-ink-soft transition hover:text-rouge disabled:opacity-30 disabled:hover:text-ink-soft"
        >
          <ChevronLeft size={14} strokeWidth={1.5} />
          <span className="hidden md:inline">prev</span>
        </button>

        <div className="pointer-events-auto rounded-full border border-ink/20 bg-paper/70 px-4 py-1.5 font-mono text-[10px] uppercase tracking-caption text-ink-soft backdrop-blur-sm">
          {label} · {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>

        <button
          type="button"
          onClick={next}
          disabled={currentIndex >= total - 1}
          aria-label="下一页"
          className="pointer-events-auto inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-caption text-ink-soft transition hover:text-rouge disabled:opacity-30 disabled:hover:text-ink-soft"
        >
          <span className="hidden md:inline">next</span>
          <ChevronRight size={14} strokeWidth={1.5} />
        </button>
      </div>
    </nav>
  );
}
