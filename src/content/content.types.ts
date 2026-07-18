/**
 * 内容配置类型定义
 * 作者只需要关心 src/content/content.config.ts，本文件提供类型与约束。
 *
 * 滚动式布局，三类作品（绘画 / 装置 / 摄影）共用同一数据模型。
 */

export type Category = "painting" | "installation" | "photography";

/** 类别元信息：展示用名称 + 英文小标签 + 用于筛选 tab 的 id */
export interface CategoryMeta {
  id: Category;
  label: string; // 中文展示名，如「绘画」
  caption: string; // 英文小标签，如 "PAINTING"
}

export interface Work {
  /** 唯一 id，用作 React key 与灯箱定位 */
  id: string;
  /** 图片路径，相对 public 目录，例如 /works/dream-01.jpg */
  src: string;
  /** 作品标题 */
  title: string;
  /** 媒介，例如「布面油画」「综合材料装置」「胶片摄影 35mm Portra 400」 */
  medium: string;
  /** 年份，例如 2024 */
  year: string | number;
  /** 一两句话创作手记 */
  note?: string;
  /** 作品类别，用于筛选 */
  category: Category;
  /** 可选 alt 文本，无障碍用；不填则用 title */
  alt?: string;
  /** 是否精选作品（置顶展示在 Hero 下方） */
  featured?: boolean;
}

export interface About {
  title: string;
  body: string[];
  portrait?: string;
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
  /** 作者名 / 工作室名，用于 Nav、Hero、Footer */
  brand: string;
  /** Hero 区打招呼文案，放在品牌名上方 */
  heroGreeting?: string;
  /** 一句话定位，Hero 副标题用 */
  tagline: string;
  /** Hero 区可选背景图（不填则用纯色 + 文字） */
  heroImage?: string;
  /** 类别元信息，控制筛选 tab 的展示顺序与文案 */
  categories: CategoryMeta[];
  about: About;
  works: Work[];
  contact: Contact;
  /** 图片保护配置；不填则使用默认值 */
  protection?: ProtectionConfig;
}
