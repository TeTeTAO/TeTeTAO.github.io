import type { Work } from "@/content/content.types";
import WorkCard from "./WorkCard";

interface SpreadLayoutProps {
  spreadNumber: number;
  works: Work[];
  /** 在整本书中的起始序号，用于编号显示 */
  startOrdinal: number;
}

/**
 * 12 栏 × 3 行编辑网格容器。
 * 把当前跨页内的所有作品按其 slot / span / rotate / offset 摆好。
 */
export default function SpreadLayout({
  spreadNumber,
  works,
  startOrdinal,
}: SpreadLayoutProps) {
  return (
    <div className="relative mx-auto flex h-full w-full max-w-spread flex-col px-6 py-10 md:px-16 md:py-14">
      {/* 跨页眉：左侧 spread 编号 + 右侧章节标识占位 */}
      <div className="mb-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-caption text-ink-faint">
        <span>SPREAD № {String(spreadNumber).padStart(2, "0")}</span>
        <span className="hidden md:inline">— DREAMCORE & GRAIN —</span>
        <span className="hidden md:inline">{works.length} PLATE(S)</span>
      </div>

      {/* 主体网格 */}
      <div
        className="grid flex-1 gap-x-6 gap-y-8"
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
      <div className="mt-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-caption text-ink-faint">
        <span className="font-display italic text-base text-ink-soft">
          {spreadNumber % 2 === 0 ? "verso" : "recto"}
        </span>
        <span>— {spreadNumber * 2 - 1} / {spreadNumber * 2} —</span>
        <span>turn the page →</span>
      </div>
    </div>
  );
}
