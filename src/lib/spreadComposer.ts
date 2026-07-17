import type { Chapter, SiteContent, Work } from "@/content/content.types";

export type SpreadEntry =
  | { kind: "cover"; index: number }
  | { kind: "chapter"; index: number; chapter: Chapter }
  | { kind: "portfolio"; index: number; spreadNumber: number; works: Work[] }
  | { kind: "colophon"; index: number };

/**
 * 把站点内容编排成有序的 spread 序列：
 * 封面 → （章节封面 + 作品跨页）× N → 版权页
 */
export function composeSpreads(content: SiteContent): SpreadEntry[] {
  const entries: SpreadEntry[] = [];
  let i = 0;

  // 1. 封面
  entries.push({ kind: "cover", index: i++ });

  // 2. 按作品中出现过的 spread 编号升序，依次发射章节封面与作品跨页
  const spreadNumbers = Array.from(
    new Set(content.works.map((w) => w.spread)),
  ).sort((a, b) => a - b);

  for (const n of spreadNumbers) {
    const chaptersHere = content.chapters.filter(
      (c) => c.insertAtSpread === n,
    );
    for (const ch of chaptersHere) {
      entries.push({ kind: "chapter", index: i++, chapter: ch });
    }
    const works = content.works.filter((w) => w.spread === n);
    if (works.length > 0) {
      entries.push({
        kind: "portfolio",
        index: i++,
        spreadNumber: n,
        works,
      });
    }
  }

  // 3. 版权 / 关于页
  entries.push({ kind: "colophon", index: i++ });

  return entries;
}
