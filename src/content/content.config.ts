/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║                                                                    ║
 * ║   胶片梦核编辑部 — 内容配置文件                                     ║
 * ║   ★ 这是作者唯一需要修改的文件 ★                                    ║
 * ║                                                                    ║
 * ║   1. 把图片丢进 public/works/ 目录（建议文件名语义化，如           ║
 * ║      dream-01.jpg）                                                ║
 * ║   2. 在下方 works 数组里新增 / 修改一条                             ║
 * ║   3. 想换图片位置：改 spread / slot / span / rotate / offset       ║
 * ║   4. pnpm dev 实时预览；满意后 commit + push 即可                  ║
 * ║                                                                    ║
 * ║   —— 完全不需要碰任何组件代码 ——                                    ║
 * ║                                                                    ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * ┌─ 槽位（slot）速查 ──────────────────────────────────┐
 * │  left-top      左上      center-top     中上        │
 * │  left-center   左中      center         正中        │
 * │  left-bottom   左下      center-bottom  中下        │
 * │  right-top     右上      right-center   右中        │
 * │  right-bottom  右下      full-bleed     整页出血    │
 * │                                                     │
 * │  span：占几栏（1–12），默认 6                        │
 * │  rotate：旋转角度，建议 -2 ~ +2                       │
 * │  offset：{ x, y } 微调偏移（单位 px）                 │
 * │  spread：第几张跨页（从 1 开始，同跨页可放 1–3 张）   │
 * │  orientation：图片方向                                │
 * │     portrait  竖版（4:5，默认）                       │
 * │     landscape 横版（3:2）                             │
 * │     square    方版（1:1）                             │
 * └──────────────────────────────────────────────────────┘
 *
 * ┌─ 图片保护（protection）──────────────────────────────┐
 * │  deployed site 上的图片会叠加 CSS 水印、禁右键、禁拖拽│
 * │  但仓库里的原图仍可被下载（public 仓库的本质）        │
 * │  要彻底保护：上传前先跑 pnpm prepare:images 处理图片  │
 * │  （压缩到 1600px + 加水印 + 清 EXIF），再上传处理后的 │
 * └──────────────────────────────────────────────────────┘
 */

import type { SiteContent } from "./content.types";

export const siteContent: SiteContent = {
  // ─────────────── 刊头信息 ───────────────
  magazineName: "DREAMCORE & GRAIN",
  issue: "ISSUE 07",
  subtitle: "一座由颜料与银盐共同显影的私人编辑部",
  coverImage: "/works/cover.jpg",

  // ─────────────── 关于页 ───────────────
  about: {
    title: "关于这本「刊物」的编辑者",
    body: [
      "你好，我是这本「刊物」唯一的编辑。白天用油画颜料在亚麻布上做梦，傍晚带着一台老式胶片相机在城市的褶皱里散步。",
      "画画于我是一种慢速的呼吸——把一束午后光线、一只没有脸的猫、一段被遗忘的童年旋律，反复涂改进画布的肌理里；摄影则更像一次迅速的偷窃——快门按下的瞬间，时间被胶片悄悄咬了一小口。",
      "这里没有作品集的严肃感，只有一本会持续更新的小刊物。欢迎你慢慢翻。",
    ],
    portrait: "/works/portrait.jpg",
  },

  // ─────────────── 版权页信息 ───────────────
  colophon: {
    printer: "在家里的旧桌面打印机上小批量输出 / 网页版由 Vite 静态构建",
    typefaces: [
      "Cormorant Garamond · 刊头与标题",
      "EB Garamond · 正文与手记",
      "JetBrains Mono · 编号与版权",
    ],
    thanks: "致每一束被我偷走的光，以及愿意翻到这里的人。",
  },

  // ─────────────── 章节 ───────────────
  // insertAtSpread 决定章节封面出现在第几张跨页之前
  chapters: [
    {
      id: "ch-painting",
      title: "颜料的回声",
      subtitle: "PAINTINGS · 布面 / 木板 / 纸本",
      category: "painting",
      insertAtSpread: 1,
    },
    {
      id: "ch-photo",
      title: "银盐日记",
      subtitle: "PHOTOGRAPHS · 35mm & 120 胶片",
      category: "photography",
      insertAtSpread: 4,
    },
  ],

  // ─────────────── 作品 ───────────────
  // 同一张跨页（spread 数字相同）可放 1–3 件作品
  works: [
    // ===== 油画系列 =====
    {
      id: "dream-01",
      src: "/works/dream-01.jpg",
      title: "夏日午后的回声",
      medium: "布面油画",
      year: 2024,
      note: "一只没有脸的猫坐在碎花窗帘前，光像融化的黄油。",
      category: "painting",
      chapterId: "ch-painting",
      spread: 1,
      slot: "left-top",
      span: 7,
      rotate: -1.2,
      offset: { x: 0, y: 16 },
      orientation: "landscape",
    },
    {
      id: "dream-02",
      src: "/works/dream-02.jpg",
      title: "没人记得的房间",
      medium: "木板油画",
      year: 2024,
      note: "祖母家的客厅，但所有家具都飘了起来。",
      category: "painting",
      chapterId: "ch-painting",
      spread: 1,
      slot: "right-bottom",
      span: 5,
      rotate: 1.5,
      orientation: "portrait",
    },
    {
      id: "dream-03",
      src: "/works/dream-03.jpg",
      title: "镜子里多出来的那个人",
      medium: "纸本水彩 + 彩铅",
      year: 2023,
      note: "画完才发现镜子里的不是我。",
      category: "painting",
      chapterId: "ch-painting",
      spread: 2,
      slot: "center",
      span: 8,
      rotate: -0.6,
      offset: { x: 24, y: 0 },
      orientation: "landscape",
    },
    {
      id: "dream-04",
      src: "/works/dream-04.jpg",
      title: "雨季的卧室",
      medium: "布面油画",
      year: 2023,
      note: "连续下了二十一天的雨，床垫长出了蘑菇。",
      category: "painting",
      chapterId: "ch-painting",
      spread: 3,
      slot: "right-top",
      span: 6,
      rotate: 1.1,
      orientation: "square",
    },
    {
      id: "dream-05",
      src: "/works/dream-05.jpg",
      title: "无题（黄）",
      medium: "布面油画",
      year: 2025,
      note: "整张画只剩下一种颜色时，它就开始呼吸了。",
      category: "painting",
      chapterId: "ch-painting",
      spread: 3,
      slot: "left-center",
      span: 5,
      rotate: -1.8,
      offset: { x: 0, y: -12 },
      orientation: "portrait",
    },

    // ===== 胶片摄影系列 =====
    {
      id: "film-01",
      src: "/works/film-01.jpg",
      title: "地铁站口的橘猫",
      medium: "胶片摄影 35mm · Portra 400",
      year: 2024,
      note: "它在等一个永远不来的人，我也是。",
      category: "photography",
      chapterId: "ch-photo",
      spread: 4,
      slot: "full-bleed",
      span: 12,
      rotate: 0,
      orientation: "landscape",
    },
    {
      id: "film-02",
      src: "/works/film-02.jpg",
      title: "外婆家的下午三点",
      medium: "胶片摄影 120 · Ektar 100",
      year: 2023,
      note: "光从竹帘缝隙里漏下来，落在搪瓷杯上。",
      category: "photography",
      chapterId: "ch-photo",
      spread: 5,
      slot: "left-center",
      span: 7,
      rotate: -0.8,
      offset: { x: 0, y: 8 },
      orientation: "landscape",
    },
    {
      id: "film-03",
      src: "/works/film-03.jpg",
      title: "夜班便利店",
      medium: "胶片摄影 35mm · Cinestill 800T",
      year: 2024,
      note: "凌晨三点，整个城市只剩这里还醒着。",
      category: "photography",
      chapterId: "ch-photo",
      spread: 5,
      slot: "right-bottom",
      span: 5,
      rotate: 1.4,
      orientation: "portrait",
    },
    {
      id: "film-04",
      src: "/works/film-04.jpg",
      title: "海边的废弃旅馆",
      medium: "胶片摄影 35mm · Gold 200",
      year: 2023,
      note: "墙上还贴着十年前的房价单。",
      category: "photography",
      chapterId: "ch-photo",
      spread: 6,
      slot: "center-top",
      span: 9,
      rotate: -0.4,
      orientation: "landscape",
    },
  ],

  // ─────────────── 联系方式（关于页底部） ───────────────
  contact: {
    email: "hello@example.com",
    instagram: "@your_handle",
    weibo: "@your_handle",
    xiaohongshu: "@your_handle",
    website: "your-name.github.io",
  },

  // ─────────────── 图片保护配置 ───────────────
  // deployed site 上的防护；仓库里的原图仍需上传前用脚本处理
  protection: {
    watermark: true,
    watermarkText: "DREAMCORE & GRAIN",
    disableContextMenu: true,
    disableDrag: true,
  },
};
