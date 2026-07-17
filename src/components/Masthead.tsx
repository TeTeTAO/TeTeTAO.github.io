import { siteContent } from "@/content/content.config";

/**
 * 杂志刊头：大号衬线字 + 上下细线 + 期号旁注。
 * 刊名字符逐个落下入场。
 */
export default function Masthead() {
  const name = siteContent.magazineName;
  const chars = Array.from(name);

  return (
    <header className="relative w-full text-center">
      {/* 上分隔线 */}
      <div className="mx-auto mb-3 flex items-center gap-3 text-ink-faint">
        <span className="h-px flex-1 bg-ink/30" />
        <span className="font-mono text-[10px] uppercase tracking-caption">
          {siteContent.issue}
        </span>
        <span className="h-px w-12 bg-ink/30" />
        <span className="font-mono text-[10px] uppercase tracking-caption">
          EDITED BY THE ARTIST
        </span>
        <span className="h-px flex-1 bg-ink/30" />
      </div>

      <h1 className="font-display text-[11vw] font-semibold leading-none tracking-masthead text-ink md:text-[120px]">
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

      {/* 下分隔线 */}
      <div className="mx-auto mt-3 flex items-center gap-3 text-ink-faint">
        <span className="h-px flex-1 bg-ink/30" />
        <span className="font-body italic text-base text-ink-soft">
          {siteContent.subtitle}
        </span>
        <span className="h-px flex-1 bg-ink/30" />
      </div>
    </header>
  );
}
