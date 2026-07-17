import type { Slot } from "@/content/content.types";

interface GridPos {
  /** grid-column 起始（1-based） */
  colStart: number;
  /** grid-row 起始（1-based） */
  rowStart: number;
  /** 默认 align-self */
  align: "start" | "center" | "end";
}

/** 槽位 → 12 栏 × 3 行网格中的位置 */
const SLOT_MAP: Record<Slot, GridPos> = {
  "left-top": { colStart: 1, rowStart: 1, align: "start" },
  "left-center": { colStart: 1, rowStart: 2, align: "center" },
  "left-bottom": { colStart: 1, rowStart: 3, align: "end" },
  "center-top": { colStart: 4, rowStart: 1, align: "start" },
  center: { colStart: 4, rowStart: 2, align: "center" },
  "center-bottom": { colStart: 4, rowStart: 3, align: "end" },
  "right-top": { colStart: 9, rowStart: 1, align: "start" },
  "right-center": { colStart: 9, rowStart: 2, align: "center" },
  "right-bottom": { colStart: 9, rowStart: 3, align: "end" },
  "full-bleed": { colStart: 1, rowStart: 1, align: "center" },
};

export function getGridPos(slot: Slot): GridPos {
  return SLOT_MAP[slot] ?? SLOT_MAP.center;
}

/**
 * 给定 span（占几栏），计算 grid-column 的起止。
 * 槽位决定 colStart 的"锚点"，span 决定延伸几栏。
 */
export function gridColumnFor(slot: Slot, span: number): string {
  if (slot === "full-bleed") return "1 / -1";
  const pos = getGridPos(slot);
  const end = Math.min(13, pos.colStart + Math.max(1, span));
  return `${pos.colStart} / ${end}`;
}

export function gridRowFor(slot: Slot): string {
  if (slot === "full-bleed") return "1 / -1";
  const pos = getGridPos(slot);
  // 单行高，让 align-self 控制对齐
  return `${pos.rowStart} / span 1`;
}
