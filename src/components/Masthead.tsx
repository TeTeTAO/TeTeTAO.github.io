import { siteContent } from "@/content/content.config";

/**
 * 杂志刊头：大号宋体 + 上下朱砂细线 + 期号旁注 + 朱砂印章。
 * 刊名字符逐个落下入场。
 */
export default function Masthead() {
  const name = siteContent.magazineName;
  const chars = Array.from(name);

  return (
    <header className="relative w-full text-center">
      {/* 上分隔线：朱砂细线 + 期号 + 编辑 */}
      <div className="mx-auto mb-3 flex items-center gap-3 text-ink-faint">
        <span className="h-px flex-1 bg-vermilion/40" />
        <span className="font-mono text-[10px] uppercase tracking-caption text-vermilion/80">
          {siteContent.issue}
        </span>
        <span className="h-px w-12 bg-vermilion/40" />
        <span className="font-mono text-[10px] uppercase tracking-caption">
          編輯 · 美術生
        </span>
        <span className="h-px flex-1 bg-vermilion/40" />
      </div>

      <div className="relative">
        <h1 className="font-display text-[10vw] font-bold leading-none tracking-masthead text-ink md:text-[110px]">
          {chars.map((c, i) => (
            <span
              key={`${c}-${i}`}
              className="mast-char"
              style={{ animationDelay: `${0.05 + i * 0.05}s` }}
            >
              {c === " " ? "\u00A0" : c}
            </span>
          ))}
        </h1>
        {/* 右下角朱砂闲章 */}
        <span className="seal absolute -right-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 rotate-3 flex-col items-center justify-center text-[13px] leading-none md:flex">
          <span>夢</span>
          <span>墨</span>
        </span>
      </div>

      {/* 下分隔线：副标题 */}
      <div className="mx-auto mt-3 flex items-center gap-3 text-ink-faint">
        <span className="h-px flex-1 bg-vermilion/40" />
        <span className="font-body italic text-base text-ink-soft">
          {siteContent.subtitle}
        </span>
        <span className="h-px flex-1 bg-vermilion/40" />
      </div>
    </header>
  );
}
