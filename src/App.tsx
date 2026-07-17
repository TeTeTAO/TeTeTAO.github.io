import { useEffect, useMemo, useRef } from "react";
import { siteContent } from "@/content/content.config";
import type { Work } from "@/content/content.types";
import { composeSpreads } from "@/lib/spreadComposer";
import { useReaderStore } from "@/store/readerStore";
import GrainOverlay from "@/components/GrainOverlay";
import CoverSpread from "@/components/CoverSpread";
import ChapterCover from "@/components/ChapterCover";
import PortfolioSpread from "@/components/PortfolioSpread";
import ColophonSpread from "@/components/ColophonSpread";
import Lightbox from "@/components/Lightbox";
import PageTurner from "@/components/PageTurner";

/** 计算 spread 编号 → 起始序号（用于作品编号 № 01..） */
function computeOrdinals(works: Work[]): Map<number, number> {
  const sorted = [...works].sort((a, b) => a.spread - b.spread);
  const map = new Map<number, number>();
  let ordinal = 1;
  let lastSpread: number | null = null;
  for (const w of sorted) {
    if (lastSpread !== w.spread) {
      map.set(w.spread, ordinal);
      lastSpread = w.spread;
    }
    ordinal += 1;
  }
  return map;
}

/** 统计每个章节收录的作品数 */
function computeChapterPlateCount(): Map<string, number> {
  const map = new Map<string, number>();
  for (const w of siteContent.works) {
    if (!w.chapterId) continue;
    map.set(w.chapterId, (map.get(w.chapterId) ?? 0) + 1);
  }
  return map;
}

export default function App() {
  const spreads = useMemo(() => composeSpreads(siteContent), []);
  const ordinals = useMemo(() => computeOrdinals(siteContent.works), []);
  const chapterCounts = useMemo(() => computeChapterPlateCount(), []);

  const currentIndex = useReaderStore((s) => s.currentIndex);
  const setTotal = useReaderStore((s) => s.setTotal);
  const next = useReaderStore((s) => s.next);
  const prev = useReaderStore((s) => s.prev);
  const lightboxOpen = useReaderStore((s) => s.lightboxWorkId !== null);

  // 初始化总数 + 从 URL hash 恢复
  useEffect(() => {
    setTotal(spreads.length);
    const hash = window.location.hash;
    const m = hash.match(/^#spread-(\d+)$/);
    if (m) {
      const i = parseInt(m[1], 10);
      if (!Number.isNaN(i) && i >= 0 && i < spreads.length) {
        useReaderStore.setState({ currentIndex: i });
      }
    }
  }, [spreads.length, setTotal]);

  // 键盘翻页
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxOpen) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, lightboxOpen]);

  // 滚轮翻页（带节流，避免连续触发）
  const wheelLock = useRef(false);
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (lightboxOpen) return;
      if (wheelLock.current) return;
      // 让关于页内部可滚动
      const current = spreads[currentIndex];
      if (current?.kind === "colophon") {
        const el = document.querySelector(".allow-scroll");
        if (el && el.scrollHeight > el.clientHeight) {
          const atTop = (el as HTMLElement).scrollTop <= 0;
          const atBottom =
            (el as HTMLElement).scrollTop + el.clientHeight >= el.scrollHeight - 1;
          if (e.deltaY < 0 && !atTop) return;
          if (e.deltaY > 0 && !atBottom) return;
        }
      }
      if (Math.abs(e.deltaY) < 24) return;
      wheelLock.current = true;
      if (e.deltaY > 0) next();
      else prev();
      window.setTimeout(() => {
        wheelLock.current = false;
      }, 700);
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [next, prev, currentIndex, spreads, lightboxOpen]);

  // 触屏滑动翻页
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  useEffect(() => {
    const onStart = (e: TouchEvent) => {
      if (lightboxOpen) return;
      const t = e.touches[0];
      touchStart.current = { x: t.clientX, y: t.clientY };
    };
    const onEnd = (e: TouchEvent) => {
      if (lightboxOpen || !touchStart.current) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - touchStart.current.x;
      const dy = t.clientY - touchStart.current.y;
      touchStart.current = null;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 60) {
        if (dx < 0) next();
        else prev();
      }
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [next, prev, lightboxOpen]);

  const current = spreads[currentIndex] ?? spreads[0];

  const label = (() => {
    switch (current.kind) {
      case "cover":
        return "COVER";
      case "chapter":
        return "CHAPTER";
      case "portfolio":
        return `PLATE ${String(current.spreadNumber).padStart(2, "0")}`;
      case "colophon":
        return "COLOPHON";
    }
  })();

  return (
    <div className="relative h-full w-full overflow-hidden">
      <GrainOverlay />

      <main
        key={currentIndex}
        className="spread-enter absolute inset-0 flex h-full w-full items-stretch justify-center"
      >
        {current.kind === "cover" && <CoverSpread spreads={spreads} />}

        {current.kind === "chapter" && (
          <ChapterCover
            chapter={current.chapter}
            plateCount={
              current.chapter.id
                ? chapterCounts.get(current.chapter.id) ?? 0
                : 0
            }
          />
        )}

        {current.kind === "portfolio" && (
          <PortfolioSpread
            spreadNumber={current.spreadNumber}
            works={current.works}
            startOrdinal={ordinals.get(current.spreadNumber) ?? 1}
          />
        )}

        {current.kind === "colophon" && <ColophonSpread />}
      </main>

      <PageTurner label={label} />
      <Lightbox />

      {/* 边角提示：首次访问时引导翻页 */}
      {currentIndex === 0 && (
        <div className="pointer-events-none fixed bottom-20 right-8 z-30 hidden font-mono text-[10px] uppercase tracking-caption text-ink-faint md:block">
          <span className="animate-pulse">↓ scroll / → arrow to turn</span>
        </div>
      )}
    </div>
  );
}
