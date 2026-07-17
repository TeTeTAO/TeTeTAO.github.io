import type { Work } from "@/content/content.types";
import SpreadLayout from "./SpreadLayout";

interface PortfolioSpreadProps {
  spreadNumber: number;
  works: Work[];
  startOrdinal: number;
}

/**
 * 单张作品跨页。展开 SpreadLayout，
 * 在 12 栏 × 3 行网格上摆当前 spread 内的全部作品。
 */
export default function PortfolioSpread({
  spreadNumber,
  works,
  startOrdinal,
}: PortfolioSpreadProps) {
  return (
    <SpreadLayout
      spreadNumber={spreadNumber}
      works={works}
      startOrdinal={startOrdinal}
    />
  );
}
