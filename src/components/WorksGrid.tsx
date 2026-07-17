import { useMemo, useState } from "react";
import { siteContent } from "@/content/content.config";
import type { Category } from "@/content/content.types";
import WorkCard from "./WorkCard";

type Filter = "all" | Category;

/**
 * 作品网格：
 *  - 顶部精选区（featured: true 的作品，3 列大图）
 *  - 类别筛选 tab（全部 / 绘画 / 装置 / 摄影）
 *  - 下方 masonry 瀑布流（CSS columns，按图片原始比例排）
 */
export default function WorksGrid() {
  const { works, categories } = siteContent;
  const [filter, setFilter] = useState<Filter>("all");

  const featured = useMemo(
    () => works.filter((w) => w.featured),
    [works]
  );

  const rest = useMemo(() => {
    const list = works.filter((w) => !w.featured);
    if (filter === "all") return list;
    return list.filter((w) => w.category === filter);
  }, [works, filter]);

  const tabs: { id: Filter; label: string }[] = [
    { id: "all", label: "全部" },
    ...categories.map((c) => ({ id: c.id as Filter, label: c.label })),
  ];

  return (
    <section id="works" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-gallery px-6 md:px-10">
        {/* 标题 */}
        <div className="reveal mb-12 flex items-baseline gap-4 md:mb-16">
          <span className="font-mono text-[11px] uppercase tracking-wider2 text-blue">
            01
          </span>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            作品
          </h2>
          <span className="ml-auto hidden font-mono text-[11px] uppercase tracking-caption text-ash md:inline">
            Works · {works.length} 件
          </span>
        </div>

        {/* 精选区 */}
        {featured.length > 0 && (
          <div className="reveal mb-20 md:mb-28">
            <div className="mb-6 flex items-baseline gap-3">
              <span className="h-px w-6 bg-blue" />
              <span className="font-mono text-[11px] uppercase tracking-wider2 text-slate">
                Featured · 精选
              </span>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
              {featured.map((w) => (
                <WorkCard key={w.id} work={w} reveal={false} size="featured" />
              ))}
            </div>
          </div>
        )}

        {/* 筛选 tab */}
        <div className="reveal mb-10 flex flex-wrap items-center gap-2 border-b border-haze pb-4">
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

        {/* masonry 瀑布流 */}
        {rest.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
            {rest.map((w) => (
              <WorkCard key={w.id} work={w} reveal={false} />
            ))}
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
