/**
 * 内容配置类型定义
 * 作者只需要关心 src/content/content.config.ts，本文件提供类型与约束。
 */

export type Category = "painting" | "photography";

/**
 * 12 栏 × 3 行编辑网格中的预设槽位。
 * 想让作品出现在跨页的哪个区域，就选哪个槽位。
 */
export type Slot =
  | "left-top"
  | "left-center"
  | "left-bottom"
  | "center-top"
  | "center"
  | "center-bottom"
  | "right-top"
  | "right-center"
  | "right-bottom"
  | "full-bleed";

export interface Work {
  /** 唯一 id，用作 React key 与 URL hash 锚点 */
  id: string;
  /** 图片路径，相对 public 目录，例如 /works/dream-01.jpg */
  src: string;
  /** 作品标题 */
  title: string;
  /** 媒介，例如「布面油画」「胶片摄影 35mm Portra 400」 */
  medium: string;
  /** 年份，例如 2024 */
  year: string | number;
  /** 一两句话创作手记 */
  note?: string;
  /** 作品类别，用于章节归档与图标区分 */
  category: Category;
  /** 所属章节 id；不填则按 spread 顺序归到当前章节 */
  chapterId?: string;
  /** 版面位置：出现在第几张跨页（从 1 开始） */
  spread: number;
  /** 12 栏网格中的槽位 */
  slot: Slot;
  /** 占据几栏，1–12，默认 6 */
  span?: number;
  /** 轻微旋转角度，默认 0；建议 -2 ~ +2 */
  rotate?: number;
  /** 在槽位基础上的微调偏移（px） */
  offset?: { x?: number; y?: number };
  /** 可选 alt 文本，无障碍用；不填则用 title */
  alt?: string;
}

export interface Chapter {
  id: string;
  title: string;
  subtitle?: string;
  category?: Category;
  /** 在 spread 序列中插入一张整页章节封面，作者手动指定该 spread 编号 */
  insertAtSpread?: number;
}

export interface Contact {
  email?: string;
  instagram?: string;
  weibo?: string;
  xiaohongshu?: string;
  website?: string;
}

export interface SiteContent {
  magazineName: string;
  issue: string;
  subtitle: string;
  coverImage: string;
  about: {
    title: string;
    body: string[];
    portrait: string;
  };
  colophon: {
    printer: string;
    typefaces: string[];
    thanks: string;
  };
  chapters: Chapter[];
  works: Work[];
  contact: Contact;
}
