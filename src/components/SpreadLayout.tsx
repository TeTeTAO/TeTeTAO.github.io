import type { Work } from "@/content/content.types";
import WorkCard from "./WorkCard";
import { siteContent } from "@/content/content.config";

interface SpreadLayoutProps {
  spreadNumber: number;
  works: Work[];
  /** 在整本书中的起始序号，用于编号显示 */
  startOrdinal: number;
}

/**
 * 12 栏 × 3 行编辑网格容器。
 * 把当前跨页内的所有作品按其 slot / span / rotate / offset 摆好。
 * padding 已尽量收窄，让作品图占比最大化。
 */
export default function SpreadLayout({
  spreadNumber,
  works,
  startOrdinal,
}: SpreadLayoutProps) {
  return (
    <div className="relative mx-auto flex h-full w-full max-w-spread flex-col px-4 py-6 md:px-10 md:py-8">
      {/* 跨页眉：左侧 spread 编号 + 右侧章节标识占位 */}
      <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-caption text-ink-faint">
        <span className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 bg-vermilion" />
          第 {String(spreadNumber).padStart(2, "0")} 跨页
        </span>
        <span className="hidden md:inline text-vermilion/70">— {siteContent.magazineName} —</span>
        <span className="hidden md:inline">{works.length} 件作品</span>
      </div>

      {/* 主体网格：行高用 1fr 撑满，让大图槽位真正占满高度 */}
      <div
        className="grid flex-1 gap-x-5 gap-y-6"
        style={{
          gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
          gridTemplateRows: "repeat(3, minmax(0, 1fr))",
          gridAutoFlow: "row dense",
        }}
      >
        {works.map((w, i) => (
          <WorkCard
            key={w.id}
            work={w}
            ordinal={startOrdinal + i}
          />
        ))}
      </div>

      {/* 跨页脚：页码 */}
      <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-caption text-ink-faint">
        <span className="font-display italic text-base text-ink-soft">
          {spreadNumber % 2 === 0 ? "verso" : "recto"}
        </span>
        <span className="text-vermilion/80">— {spreadNumber * 2 - 1} / {spreadNumber * 2} —</span>
        <span>翻页 →</span>
      </div>
    </div>
  );
}
