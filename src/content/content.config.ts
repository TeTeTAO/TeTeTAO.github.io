/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║                                                                    ║
 * ║   夢墨 · 中式夢核編輯部 — 內容配置文件                              ║
 * ║   ★ 這是作者唯一需要修改的文件 ★                                    ║
 * ║                                                                    ║
 * ║   1. 把圖片丟進 public/works/ 目錄（建議檔名語義化，如             ║
 * ║      dream-01.jpg）                                                ║
 * ║   2. 在下方 works 陣列裡新增 / 修改一條                            ║
 * ║   3. 想換圖片位置：改 spread / slot / span / rotate / offset       ║
 * ║   4. pnpm dev 實時預覽；滿意後 commit + push 即可                  ║
 * ║                                                                    ║
 * ║   —— 完全不需要碰任何組件代碼 ——                                   ║
 * ║                                                                    ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * ┌─ 槽位（slot）速查 ──────────────────────────────────┐
 * │  普通槽位（圖 + 下方文字，aspect 由 orientation 定）│
 * │  left-top      左上      center-top     中上        │
 * │  left-center   左中      center         正中        │
 * │  left-bottom   左下      center-bottom  中下        │
 * │  right-top     右上      right-center   右中        │
 * │  right-bottom  右下                                │
 * │                                                     │
 * │  ★ 大圖槽位（圖撐滿高度，文字疊在圖上，推薦用）     │
 * │  full-bleed       整頁出血橫版（12 欄 × 3 行）       │
 * │  full-bleed-tall  整頁出血豎版（12 欄 × 3 行）       │
 * │  left-full        左半頁滿高（6 欄 × 3 行）          │
 * │  right-full       右半頁滿高（6 欄 × 3 行）          │
 * │  center-full      中央滿高（8 欄 × 3 行）            │
 * │                                                     │
 * │  span：占幾欄（1–12），默認 6（大圖槽位忽略 span）  │
 * │  rotate：旋轉角度，建議 -2 ~ +2                      │
 * │  offset：{ x, y } 微調偏移（單位 px）                │
 * │  spread：第幾張跨頁（從 1 開始，同跨頁可放 1–3 張）  │
 * │  orientation：圖片方向                              │
 * │     portrait  豎版（4:5，默認）                      │
 * │     landscape 橫版（3:2）                            │
 * │     square    方版（1:1）                            │
 * └──────────────────────────────────────────────────────┘
 *
 * ┌─ 圖片保護（protection）──────────────────────────────┐
 * │  deployed site 上的圖片會疊加 CSS 水印、禁右鍵、禁拖拽│
 * │  但倉庫裡的原圖仍可被下載（public 倉庫的本質）        │
 * │  要徹底保護：上傳前先跑 pnpm prepare:images 處理圖片  │
 * │  （壓縮到 1600px + 加水印 + 清 EXIF），再上傳處理後的 │
 * └──────────────────────────────────────────────────────┘
 */

import type { SiteContent } from "./content.types";

export const siteContent: SiteContent = {
  // ─────────────── 刊頭信息 ───────────────
  magazineName: "夢墨",
  issue: "甲辰 · 第七輯",
  subtitle: "一座由顏料與銀鹽共同顯影的私人編輯部",
  coverImage: "/works/cover.jpg",

  // ─────────────── 關於頁 ───────────────
  about: {
    title: "關於這本「刊物」的編輯者",
    body: [
      "你好，我是這本「刊物」唯一的編輯。白天用油畫顏料在亞麻布上做夢，傍晚帶著一台老式膠片相機在城市的褶皺裡散步。",
      "畫畫於我是一種慢速的呼吸——把一束午後光線、一隻沒有臉的貓、一段被遺忘的童年旋律，反覆塗改進畫布的肌理裡；攝影則更像一次迅速的偷竊——快門按下的瞬間，時間被膠片悄悄咬了一小口。",
      "這裡沒有作品集的嚴肅感，只有一本會持續更新的小刊物。歡迎你慢慢翻。",
    ],
    portrait: "/works/portrait.jpg",
  },

  // ─────────────── 版權頁信息 ───────────────
  colophon: {
    printer: "在家裡的舊桌面打印機上小批量輸出 / 網頁版由 Vite 靜態構建",
    typefaces: [
      "Noto Serif SC · 思源宋體 · 刊頭與標題",
      "Cormorant Garamond · 西文引文",
      "JetBrains Mono · 編號與版權",
    ],
    thanks: "致每一束被我偷走的光，以及願意翻到這裡的人。",
  },

  // ─────────────── 章 ───────────────
  // insertAtSpread 決定章節封面出現在第幾張跨頁之前
  chapters: [
    {
      id: "ch-painting",
      title: "顏料回聲",
      subtitle: "卷一 · PAINTINGS · 布面 / 木板 / 紙本",
      category: "painting",
      insertAtSpread: 1,
    },
    {
      id: "ch-photo",
      title: "銀鹽日記",
      subtitle: "卷二 · PHOTOGRAPHS · 35mm & 120 膠片",
      category: "photography",
      insertAtSpread: 4,
    },
  ],

  // ─────────────── 作品 ───────────────
  // 同一張跨頁（spread 數字相同）可放 1–3 件作品
  // 大圖槽位一張跨頁通常只放一件，圖片占比最大
  works: [
    // ===== 油畫系列 =====
    // 跨頁 1：左半頁大圖 + 右半頁大圖，兩件作品各占半頁
    {
      id: "dream-01",
      src: "/works/dream-01.jpg",
      title: "夏日午後的回聲",
      medium: "布面油畫",
      year: 2024,
      note: "一隻沒有臉的貓坐在碎花窗簾前，光像融化的黃油。",
      category: "painting",
      chapterId: "ch-painting",
      spread: 1,
      slot: "left-full",
      rotate: 0,
      orientation: "landscape",
    },
    {
      id: "dream-02",
      src: "/works/dream-02.jpg",
      title: "沒人記得的房間",
      medium: "木板油畫",
      year: 2024,
      note: "祖母家的客廳，但所有家具都飄了起來。",
      category: "painting",
      chapterId: "ch-painting",
      spread: 1,
      slot: "right-full",
      rotate: 0,
      orientation: "portrait",
    },
    // 跨頁 2：整頁出血大圖，一件作品撐滿
    {
      id: "dream-03",
      src: "/works/dream-03.jpg",
      title: "鏡子裡多出來的那個人",
      medium: "紙本水彩 + 彩鉛",
      year: 2023,
      note: "畫完才發現鏡子裡的不是我。",
      category: "painting",
      chapterId: "ch-painting",
      spread: 2,
      slot: "full-bleed",
      rotate: 0,
      orientation: "landscape",
    },
    // 跨頁 3：中央大圖 + 兩側小圖（普通槽位）
    {
      id: "dream-04",
      src: "/works/dream-04.jpg",
      title: "雨季的臥室",
      medium: "布面油畫",
      year: 2023,
      note: "連續下了二十一天的雨，床墊長出了蘑菇。",
      category: "painting",
      chapterId: "ch-painting",
      spread: 3,
      slot: "left-top",
      span: 7,
      rotate: 1.1,
      orientation: "landscape",
    },
    {
      id: "dream-05",
      src: "/works/dream-05.jpg",
      title: "無題（黃）",
      medium: "布面油畫",
      year: 2025,
      note: "整張畫只剩下一種顏色時，它就開始呼吸了。",
      category: "painting",
      chapterId: "ch-painting",
      spread: 3,
      slot: "right-bottom",
      span: 5,
      rotate: -1.8,
      orientation: "portrait",
    },

    // ===== 膠片攝影系列 =====
    // 跨頁 4：整頁出血豎版大圖
    {
      id: "film-01",
      src: "/works/film-01.jpg",
      title: "地鐵站口的橘貓",
      medium: "膠片攝影 35mm · Portra 400",
      year: 2024,
      note: "它在等一個永遠不來的人，我也是。",
      category: "photography",
      chapterId: "ch-photo",
      spread: 4,
      slot: "full-bleed-tall",
      rotate: 0,
      orientation: "portrait",
    },
    // 跨頁 5：左半頁大圖 + 右半頁大圖
    {
      id: "film-02",
      src: "/works/film-02.jpg",
      title: "外婆家的下午三點",
      medium: "膠片攝影 120 · Ektar 100",
      year: 2023,
      note: "光從竹簾縫隙裡漏下來，落在搪瓷杯上。",
      category: "photography",
      chapterId: "ch-photo",
      spread: 5,
      slot: "left-full",
      rotate: 0,
      orientation: "landscape",
    },
    {
      id: "film-03",
      src: "/works/film-03.jpg",
      title: "夜班便利店",
      medium: "膠片攝影 35mm · Cinestill 800T",
      year: 2024,
      note: "凌晨三點，整個城市只剩這裡還醒著。",
      category: "photography",
      chapterId: "ch-photo",
      spread: 5,
      slot: "right-full",
      rotate: 0,
      orientation: "portrait",
    },
    // 跨頁 6：中央大圖
    {
      id: "film-04",
      src: "/works/film-04.jpg",
      title: "海邊的廢棄旅館",
      medium: "膠片攝影 35mm · Gold 200",
      year: 2023,
      note: "牆上還貼著十年前的房價單。",
      category: "photography",
      chapterId: "ch-photo",
      spread: 6,
      slot: "center-full",
      rotate: 0,
      orientation: "landscape",
    },
  ],

  // ─────────────── 聯繫方式（關於頁底部） ───────────────
  contact: {
    email: "hello@example.com",
    instagram: "@your_handle",
    weibo: "@your_handle",
    xiaohongshu: "@your_handle",
    website: "your-name.github.io",
  },

  // ─────────────── 圖片保護配置 ───────────────
  // deployed site 上的防護；倉庫裡的原圖仍需上傳前用腳本處理
  protection: {
    watermark: true,
    watermarkText: "夢墨 · DREAMCORE",
    disableContextMenu: true,
    disableDrag: true,
  },
};
