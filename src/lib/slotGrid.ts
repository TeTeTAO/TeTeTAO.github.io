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
  // 大图槽位：起始锚点
  "full-bleed": { colStart: 1, rowStart: 1, align: "center" },
  "full-bleed-tall": { colStart: 1, rowStart: 1, align: "center" },
  "left-full": { colStart: 1, rowStart: 1, align: "center" },
  "right-full": { colStart: 7, rowStart: 1, align: "center" },
  "center-full": { colStart: 3, rowStart: 1, align: "center" },
};

/** 大图槽位集合：撑满整张跨页的高度（占 3 行） */
const TALL_SLOTS = new Set<Slot>([
  "full-bleed",
  "full-bleed-tall",
  "left-full",
  "right-full",
  "center-full",
]);

/** 整页出血槽位（横/竖向都撑满 12 栏） */
const FULL_PAGE_SLOTS = new Set<Slot>(["full-bleed", "full-bleed-tall"]);

export function getGridPos(slot: Slot): GridPos {
  return SLOT_MAP[slot] ?? SLOT_MAP.center;
}

export function isTallSlot(slot: Slot): boolean {
  return TALL_SLOTS.has(slot);
}

export function isFullPageSlot(slot: Slot): boolean {
  return FULL_PAGE_SLOTS.has(slot);
}

/**
 * 给定 span（占几栏），计算 grid-column 的起止。
 * 槽位决定 colStart 的"锚点"，span 决定延伸几栏。
 * 大图槽位用各自固定的栏宽，忽略 span。
 */
export function gridColumnFor(slot: Slot, span: number): string {
  // 整页出血：撑满 12 栏
  if (FULL_PAGE_SLOTS.has(slot)) return "1 / -1";
  // 左/右半页满高：固定 6 栏
  if (slot === "left-full") return "1 / 7";
  if (slot === "right-full") return "7 / 13";
  // 中央满高：固定 8 栏（3–10）
  if (slot === "center-full") return "3 / 11";

  const pos = getGridPos(slot);
  const end = Math.min(13, pos.colStart + Math.max(1, span));
  return `${pos.colStart} / ${end}`;
}

export function gridRowFor(slot: Slot): string {
  // 大图槽位：撑满 3 行
  if (TALL_SLOTS.has(slot)) return "1 / -1";
  const pos = getGridPos(slot);
  // 单行高，让 align-self 控制对齐
  return `${pos.rowStart} / span 1`;
}
