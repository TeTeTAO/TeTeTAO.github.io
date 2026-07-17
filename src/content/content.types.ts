/**
 * 内容配置类型定义
 * 作者只需要关心 src/content/content.config.ts，本文件提供类型与约束。
 */

export type Category = "painting" | "photography";

/** 图片方向，决定作品卡的宽高比，避免横图被裁切 */
export type Orientation = "portrait" | "landscape" | "square";

/**
 * 12 栏 × 3 行编辑网格中的预设槽位。
 * 想让作品出现在跨页的哪个区域，就选哪个槽位。
 *
 * 大图槽位（推荐用来突出作品）：
 *   full-bleed        整页出血横版（16:9，撑满整张跨页）
 *   full-bleed-tall   整页出血竖版（4:5，撑满整张跨页）
 *   left-full         左半页满高（占 6 栏 × 3 行，图占大半页）
 *   right-full        右半页满高（占 6 栏 × 3 行，图占大半页）
 *   center-full       中央满高（占 8 栏 × 3 行，居中大图）
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
  | "full-bleed"
  | "full-bleed-tall"
  | "left-full"
  | "right-full"
  | "center-full";

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
  /** 图片方向，决定作品卡宽高比；不填默认 portrait（竖版） */
  orientation?: Orientation;
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

export interface ProtectionConfig {
  /** 是否在作品图上叠加 CSS 水印（截图会带水印，但不影响原图文件） */
  watermark: boolean;
  /** 水印文字，一般用作者名 / 站点名 */
  watermarkText: string;
  /** 是否禁用右键菜单（挡小白，挡不住 F12） */
  disableContextMenu: boolean;
  /** 是否禁用图片拖拽 */
  disableDrag: boolean;
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
  /** 图片保护配置；不填则使用默认值 */
  protection?: ProtectionConfig;
}
