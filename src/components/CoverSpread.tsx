import { siteContent } from "@/content/content.config";
import { useReaderStore } from "@/store/readerStore";
import Masthead from "./Masthead";
import WorkImage from "./WorkImage";
import type { SpreadEntry } from "@/lib/spreadComposer";

interface CoverSpreadProps {
  /** 全部 spread 序列，用于生成目录 */
  spreads: SpreadEntry[];
}

/**
 * 封面跨页：刊头 + 主图 + 副标题 / 目录 + 翻页提示
 */
export default function CoverSpread({ spreads }: CoverSpreadProps) {
  const go = useReaderStore((s) => s.go);

  // 目录：列出每个章节封面 + 版权页
  const tocItems = spreads
    .filter(
      (s) => s.kind === "chapter" || s.kind === "colophon",
    )
    .map((s) => {
      if (s.kind === "chapter") {
        return {
          index: s.index,
          label: s.chapter.title,
          sub: s.chapter.subtitle ?? "",
        };
      }
      return {
        index: s.index,
        label: "关于这本刊物",
        sub: "COLOPHON · ABOUT",
      };
    });

  return (
    <div className="relative mx-auto flex h-full w-full max-w-spread flex-col px-6 py-8 md:px-16 md:py-12">
      <Masthead />

      {/* 主体：左主图 + 右目录 */}
      <div className="mt-8 grid flex-1 grid-cols-1 gap-8 md:grid-cols-12">
        <div className="md:col-span-7">
          <figure className="work-frame h-full">
            <div className="relative h-full min-h-[260px] overflow-hidden bg-cocoa/20 md:min-h-[420px]">
              <WorkImage
                work={{
                  id: "cover",
                  src: siteContent.coverImage,
                  title: siteContent.magazineName,
                  category: "photography",
                }}
                className="h-full w-full object-cover"
                loading="eager"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-ink/15" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-cocoa-deep/30 via-transparent to-cream/20" />
              {/* 胶片日期戳 */}
              <div className="absolute right-4 top-4 border border-cream/60 px-2 py-1 font-mono text-[10px] uppercase tracking-caption text-cream/90 backdrop-blur-sm">
                EXP · {new Date().getFullYear()}
              </div>
            </div>
            <figcaption className="mt-3 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-caption text-ink-faint">
              <span>COVER PLATE</span>
              <span className="italic font-display text-sm text-ink-soft">
                {siteContent.subtitle}
              </span>
            </figcaption>
          </figure>
        </div>

        <div className="flex flex-col justify-between md:col-span-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-caption text-rouge">
              § In This Issue
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold leading-tight text-ink md:text-4xl">
              一本由颜料与银盐共同显影的小刊物
            </h2>
            <p className="mt-3 font-body text-base italic leading-relaxed text-ink-soft">
              没有目录的严肃感，只有慢慢翻的耐心。点击任一章节直达。
            </p>
          </div>

          <ul className="mt-6 space-y-3">
            {tocItems.map((item, i) => (
              <li key={item.index}>
                <button
                  type="button"
                  onClick={() => go(item.index)}
                  className="group flex w-full items-baseline gap-3 border-b border-ink/15 pb-2 text-left hover:border-rouge/60"
                >
                  <span className="font-mono text-[10px] uppercase tracking-caption text-ink-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-xl font-medium text-ink group-hover:text-rouge">
                    {item.label}
                  </span>
                  <span className="ml-auto font-mono text-[10px] uppercase tracking-caption text-ink-faint">
                    p. {String(item.index + 1).padStart(2, "0")}
                  </span>
                </button>
                {item.sub && (
                  <span className="mt-1 block font-mono text-[10px] uppercase tracking-caption text-ink-faint">
                    {item.sub}
                  </span>
                )}
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => go(1)}
            className="group mt-8 inline-flex items-center gap-3 self-start font-mono text-xs uppercase tracking-caption text-ink hover:text-rouge"
          >
            <span className="h-px w-10 bg-ink transition-all group-hover:w-16 group-hover:bg-rouge" />
            TURN THE PAGE
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
