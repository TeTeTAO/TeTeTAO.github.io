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
  heroGreeting: "欢迎来到特特特",
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
  // featured: true 的作品会置顶展示在 Hero 下方的精选区
  // 其余作品按类别筛选展示在下方网格中
  works: [
    // ===== 精选（置顶） =====
    {
      id: "featured-01",
      src: "/works/featured-01.jpg",
      title: "无题（蓝）",
      medium: "布面油画",
      year: 2024,
      note: "整张画只剩一种颜色时，它就开始呼吸了。",
      category: "painting",
      featured: true,
    },
    {
      id: "featured-02",
      src: "/works/featured-02.jpg",
      title: "悬浮之物 No.3",
      medium: "综合材料装置",
      year: 2024,
      note: "把重量感从物体中抽离，让它停在半空。",
      category: "installation",
      featured: true,
    },
    {
      id: "featured-03",
      src: "/works/featured-03.jpg",
      title: "凌晨四点的窗",
      medium: "胶片摄影 35mm · Portra 400",
      year: 2023,
      note: "城市还没醒，光已经先到了。",
      category: "photography",
      featured: true,
    },

    // ===== 绘画 =====
    {
      id: "painting-01",
      src: "/works/painting-01.jpg",
      title: "夏日午后的回声",
      medium: "布面油画",
      year: 2024,
      note: "光像融化的黄油，落在碎花窗帘上。",
      category: "painting",
    },
    {
      id: "painting-02",
      src: "/works/painting-02.jpg",
      title: "没人记得的房间",
      medium: "木板油画",
      year: 2024,
      note: "祖母家的客厅，但所有家具都飘了起来。",
      category: "painting",
    },
    {
      id: "painting-03",
      src: "/works/painting-03.jpg",
      title: "镜子里的那个人",
      medium: "纸本水彩 + 彩铅",
      year: 2023,
      note: "画完才发现镜子里不是我。",
      category: "painting",
    },
    {
      id: "painting-04",
      src: "/works/painting-04.jpg",
      title: "雨季的卧室",
      medium: "布面油画",
      year: 2023,
      note: "连续下了二十一天的雨。",
      category: "painting",
    },

    // ===== 装置 =====
    {
      id: "installation-01",
      src: "/works/installation-01.jpg",
      title: "悬浮之物 No.1",
      medium: "金属 / 线 / 灯",
      year: 2023,
      note: "在展厅中央拉出一张看不见的网。",
      category: "installation",
    },
    {
      id: "installation-02",
      src: "/works/installation-02.jpg",
      title: "盐的几何",
      medium: "盐 / 玻璃 / 木",
      year: 2024,
      note: "把一种最日常的物质摆成严谨的形。",
      category: "installation",
    },
    {
      id: "installation-03",
      src: "/works/installation-03.jpg",
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
