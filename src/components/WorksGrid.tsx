import { useEffect, useMemo, useRef, useState } from "react";
import { siteContent } from "@/content/content.config";
import type { Category, Work } from "@/content/content.types";
import WorkImage from "./WorkImage";
import { useReaderStore } from "@/store/readerStore";

type Filter = "all" | Category;

/**
 * 作品轮播：
 *  - 类别筛选 tab（全部 / 绘画 / 装置 / 摄影）
 *  - 单图居中展示，左右箭头切换
 *  - 键盘 ← / → 翻图
 *  - 触屏左右滑动
 *  - 底部点点指示当前位置
 *  - 点击图片打开灯箱
 */
export default function WorksGrid() {
  const { works, categories } = siteContent;
  const [filter, setFilter] = useState<Filter>("all");
  const [index, setIndex] = useState(0);

  const openLightbox = useReaderStore((s) => s.openLightbox);

  const list = useMemo(() => {
    if (filter === "all") return works;
    return works.filter((w) => w.category === filter);
  }, [works, filter]);

  // 切换类别时回到第一张
  useEffect(() => {
    setIndex(0);
  }, [filter]);

  // 防止越界（list 长度变化时）
  useEffect(() => {
    if (index > list.length - 1) setIndex(0);
  }, [list.length, index]);

  const go = (delta: number) => {
    if (list.length === 0) return;
    setIndex((i) => (i + delta + list.length) % list.length);
  };

  // 键盘左右
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const section = document.getElementById("works");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4;
      if (!inView) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [list.length]);

  // 触屏滑动
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      go(dx < 0 ? 1 : -1);
    }
  };

  const tabs: { id: Filter; label: string }[] = [
    { id: "all", label: "全部" },
    ...categories.map((c) => ({ id: c.id as Filter, label: c.label })),
  ];

  const current = list[index];
  const catMeta = current
    ? siteContent.categories.find((c) => c.id === current.category)
    : undefined;

  return (
    <section id="works" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-gallery px-6 md:px-10">
        {/* 标题 */}
        <div className="reveal mb-10 flex items-baseline gap-4 md:mb-14">
          <span className="font-mono text-[11px] uppercase tracking-wider2 text-blue">
            01
          </span>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            作品
          </h2>
          <span className="ml-auto hidden font-mono text-[11px] uppercase tracking-caption text-ash md:inline">
            {list.length > 0 ? `${index + 1} / ${list.length}` : `Works · ${works.length}`}
          </span>
        </div>

        {/* 筛选 tab */}
        <div className="reveal mb-12 flex flex-wrap items-center gap-2 border-b border-haze pb-4">
          {tabs.map((t) => {
            const active = filter === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setFilter(t.id)}
                className={`rounded-full px-4 py-1.5 font-sans text-sm transition-colors ${
                  active
                    ? "bg-ink text-white"
                    : "text-slate hover:text-ink hover:bg-fog"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* 轮播主体 */}
        {current ? (
          <div
            className="reveal relative"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* 左箭头 */}
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={list.length <= 1}
              aria-label="上一张"
              className="absolute left-0 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-haze bg-white/80 text-ink backdrop-blur-sm transition-all hover:border-ink hover:bg-white disabled:opacity-30 disabled:hover:border-haze disabled:hover:bg-white/80 md:flex"
            >
              <span className="text-xl leading-none">←</span>
            </button>

            {/* 右箭头 */}
            <button
              type="button"
              onClick={() => go(1)}
              disabled={list.length <= 1}
              aria-label="下一张"
              className="absolute right-0 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-haze bg-white/80 text-ink backdrop-blur-sm transition-all hover:border-ink hover:bg-white disabled:opacity-30 disabled:hover:border-haze disabled:hover:bg-white/80 md:flex"
            >
              <span className="text-xl leading-none">→</span>
            </button>

            {/* 当前作品 */}
            <div className="mx-auto max-w-3xl">
              <button
                type="button"
                onClick={() => openLightbox(current.id)}
                className="block w-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-blue/50"
                aria-label={`放大查看：${current.title}`}
              >
                <div className="relative overflow-hidden bg-fog aspect-[4/5] md:aspect-[3/2]">
                  <WorkImage
                    key={current.id}
                    work={current}
                    reveal={false}
                    className="work-card-img block h-full w-full select-none object-contain"
                    loading="eager"
                  />
                  {/* 类别小标 */}
                  <div className="absolute left-3 top-3">
                    <span className="inline-block bg-white/90 px-2 py-1 font-mono text-[10px] uppercase tracking-caption text-slate backdrop-blur-sm">
                      {catMeta?.caption ?? current.category}
                    </span>
                  </div>
                </div>
              </button>

              {/* 文字 */}
              <figcaption className="mt-5 flex items-baseline justify-between gap-4">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-caption text-ash">
                    {current.medium} · {current.year}
                  </div>
                  <h3 className="mt-1.5 font-display text-2xl font-semibold leading-tight text-ink">
                    {current.title}
                  </h3>
                  {current.note && (
                    <p className="mt-2 max-w-xl font-sans text-sm leading-relaxed text-slate">
                      {current.note}
                    </p>
                  )}
                </div>
                <span className="hidden shrink-0 font-mono text-[10px] uppercase tracking-caption text-ash md:inline">
                  点击图片放大
                </span>
              </figcaption>
            </div>

            {/* 点点指示 */}
            {list.length > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                {list.map((w, i) => (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`第 ${i + 1} 张`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === index
                        ? "w-6 bg-ink"
                        : "w-1.5 bg-stone hover:bg-ash"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <p className="py-16 text-center font-sans text-sm text-ash">
            该类别暂无作品。
          </p>
        )}
      </div>
    </section>
  );
}
