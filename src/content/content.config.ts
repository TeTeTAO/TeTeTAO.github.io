/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║                                                                    ║
 * ║   作品集 — 内容配置文件                                              ║
 * ║   ★ 这是作者唯一需要修改的文件 ★                                    ║
 * ║                                                                    ║
 * ║   1. 把图片丢进 public/works/ 目录（建议文件名语义化，如            ║
 * ║      painting-01.jpg / installation-01.jpg / photo-01.jpg）        ║
 * ║   2. 在下方 works 数组里新增 / 修改一条                             ║
 * ║   3. pnpm dev 实时预览；满意后 commit + push 即可                  ║
 * ║                                                                    ║
 * ║   —— 完全不需要碰任何组件代码 ——                                   ║
 * ║                                                                    ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * ┌─ Work 字段速查 ──────────────────────────────────────┐
 * │  id         唯一 id，用作 React key                  │
 * │  src        图片路径，相对 public，如 /works/x.jpg    │
 * │  title      作品标题                                 │
 * │  medium     媒介，如「布面油画」「综合材料装置」      │
 * │  year       年份                                     │
 * │  note       创作手记（可选）                         │
 * │  category   painting / installation / photography   │
 * │  alt        无障碍 alt 文本（可选，默认用 title）    │
 * │  featured   true 时置顶展示在 Hero 下方精选区（可选）│
 * └──────────────────────────────────────────────────────┘
 *
 * ┌─ 图片保护（protection）──────────────────────────────┐
 * │  部署站点上的图片会叠加 CSS 水印、禁右键、禁拖拽       │
 * │  但仓库里的原图仍可被下载（public 仓库的本质）        │
 * │  要彻底保护：上传前先跑 pnpm prepare:images 处理图片  │
 * │  （压缩到 1600px + 加水印 + 清 EXIF），再上传处理后的 │
 * └──────────────────────────────────────────────────────┘
 */

import type { SiteContent } from "./content.types";

export const siteContent: SiteContent = {
  // ─────────────── 站点信息 ───────────────
  brand: "特特特",
  heroGreeting: "Welcome to my portfolio",
  tagline: "绘画 · 装置 · 摄影 — 一处安静的展示空间。",
  heroImage: "/works/hero.jpg",

  // ─────────────── 类别（控制筛选 tab 顺序与文案） ───────────────
  categories: [
    { id: "painting", label: "绘画", caption: "PAINTING" },
    { id: "installation", label: "装置", caption: "INSTALLATION" },
    { id: "photography", label: "摄影", caption: "PHOTOGRAPHY" },
  ],

  // ─────────────── 关于 ───────────────
  about: {
    title: "关于",
    body: [
      "你好，我是一名纯艺创作者。作品涵盖绘画、装置与摄影三种媒介，关注日常中那些容易被忽略的瞬间——光的偏移、物的位移、人留下的痕迹。",
      "绘画于我是一种慢速的对话，把一束午后光线反复涂抹进画布肌理；装置是把空间当作材料的延伸，让物体在真实场域里产生新的张力；摄影则是更直接的截取，记录下那些无法用画笔复刻的现实切片。",
      "这里是一个会持续更新的展示空间，欢迎慢慢看。",
    ],
    // portrait: "/works/portrait.jpg",
  },

  // ─────────────── 作品 ───────────────
  // 图片放入 public/works/ 后，按顺序添加到下方数组即可
  // category: painting / installation / photography
  works: [
    // ===== 绘画 =====
    {
      id: "painting-01",
      src: "/works/painting-01.jpg",
      title: "红色象的夜间独白",
      medium: "水性综合材料",
      year: 2026,
      note: "在不该承载重量的玩具上，你暂时停止了与世界的交互。",
      category: "painting",
    },
    {
      id: "painting-02",
      src: "/works/painting-02.jpg",
      title: "蓝色机体的无航线研究",
      medium: "综合材料",
      year: 2026,
      note: "这架机体被设计为摇动，却被我用于静止。飞行的概念被取消，只剩下关于\"起飞前\"的无限延长。",
      category: "painting",
    },
    {
      id: "painting-03",
      src: "/works/painting-03.jpg",
      title: "旋翼停机后的安静区",
      medium: "综合材料",
      year: 2026,
      note: "旋翼的沉默是一种结构性的暂停。我在这暂停里观察自己的内部回声，它们与木质机体的空洞互相抵消。",
      category: "painting",
    },
    {
      id: "painting-04",
      src: "/works/painting-04.jpg",
      title: "旋转结构中的光学残留",
      medium: "色粉",
      year: 2026,
      note: "在循环的光影里，情绪被迫重复成同一个瞬间。",
      category: "painting",
    },
    {
      id: "painting-05",
      src: "/works/painting-05.jpg",
      title: "静水上的多色体排列",
      medium: "水彩",
      year: 2026,
      note: "停泊的色块在水面上排列成一组被延迟的前进。",
      category: "painting",
    },

    // ===== 装置 =====
    {
      id: "installation-01",
      src: "/works/installation-01.jpg",
      title: "城中清晨：面窝的记忆结构",
      year: 2019,
      note: "这件装置以武汉的\"过早\"文化为线索，通过面窝与糯米包油条的造型，重构城市清晨最具烟火气的记忆结构。作品顶部的三个面窝与一个糯米包油条，是武汉人日常却深刻的味觉符号；而下方面窝的拼贴，则取材自武汉历史报纸，将城市的新闻、时代的片段与早餐的形态叠加在一起。我希望观众在观看时能感受到：城市的阅读不仅发生在书页之间，也在味道、街巷与日常动作里。面窝的圆形像是一枚时间的截面，报纸的纹理像是城市的呼吸。通过\"吃\"与\"读\"的并置，作品试图呈现武汉独特的生活节奏——一种从清晨开始、由普通人共同书写的城市叙事。",
      category: "installation",
    },
    {
      id: "installation-02",
      src: "/works/installation-02.jpg",
      title: "震惊……",
      year: 2017,
      category: "installation",
    },
    {
      id: "installation-03",
      src: "/works/installation-03.jpg",
      title: "盐的几何",
      medium: "盐 / 玻璃 / 木",
      year: 2024,
      note: "把一种最日常的物质摆成严谨的形。",
      category: "installation",
    },
    {
      id: "installation-04",
      src: "/works/installation-04.jpg",
      title: "回声室",
      medium: "镜面 / 音频装置",
      year: 2024,
      note: "你说的每一句话都会被空间原样还回来。",
      category: "installation",
    },

    // ===== 摄影 =====
    {
      id: "photo-01",
      src: "/works/photo-01.jpg",
      title: "地铁站口的橘猫",
      medium: "胶片摄影 35mm · Portra 400",
      year: 2024,
      note: "它在等一个永远不来的人，我也是。",
      category: "photography",
    },
    {
      id: "photo-02",
      src: "/works/photo-02.jpg",
      title: "外婆家的下午三点",
      medium: "胶片摄影 120 · Ektar 100",
      year: 2023,
      note: "光从竹帘缝隙里漏下来，落在搪瓷杯上。",
      category: "photography",
    },
    {
      id: "photo-03",
      src: "/works/photo-03.jpg",
      title: "夜班便利店",
      medium: "胶片摄影 35mm · Cinestill 800T",
      year: 2024,
      note: "凌晨三点，整个城市只剩这里还醒着。",
      category: "photography",
    },
    {
      id: "photo-04",
      src: "/works/photo-04.jpg",
      title: "海边的废弃旅馆",
      medium: "胶片摄影 35mm · Gold 200",
      year: 2023,
      note: "墙上还贴着十年前的房价单。",
      category: "photography",
    },
  ],

  // ─────────────── 联系方式 ───────────────
  contact: {
    email: "dodittao@outlook.com",
    instagram: "@doditao720",
    weibo: "@Dodi特",
    xiaohongshu: "@虎皮鹦鹉咬一切",
    website: "TeTeTAO.github.io",
  },

  // ─────────────── 图片保护配置 ───────────────
  // 部署站点上的防护；仓库里的原图仍需上传前用脚本处理
  protection: {
    watermark: true,
    watermarkText: "© 特特特",
    disableContextMenu: true,
    disableDrag: true,
  },
};
