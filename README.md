# DREAMCORE & GRAIN — 胶片梦核编辑部

一座纯艺美术生 / 摄影爱好者的线上「编辑部」：把绘画与胶片摄影作品编排进一本会呼吸的复古杂志。杂志编辑版式 × 胶片颗粒 × 梦核柔光。

线上站点：<https://tetetao.github.io/>

---

## 日常维护（在 GitHub 网页上就能改）

### 改文字 / 标题 / 位置

打开 [`src/content/content.config.ts`](src/content/content.config.ts)，点右上角 ✏️ 铅笔图标编辑，commit 后 GitHub Actions 自动构建上线。

每件作品一条配置，控制图片的跨页位置、槽位、栏宽、旋转、偏移、方向：

```ts
{
  id: 'dream-01',
  src: '/works/dream-01.jpg',
  title: '夏日午后的回声',
  medium: '布面油画',
  year: 2024,
  note: '一只没有脸的猫坐在碎花窗帘前…',
  category: 'painting',
  spread: 1,                      // 第几张跨页
  slot: 'left-top',               // 槽位（见文件顶部速查表）
  span: 7,                        // 占几栏（1–12）
  rotate: -1.2,                   // 旋转角度
  offset: { x: 0, y: 16 },        // 微调偏移
  orientation: 'landscape',       // portrait 竖版 / landscape 横版 / square 方版
}
```

### 上传图片

进 [`public/works/`](public/works/) 目录 → `Add file → Upload files` → 拖图片进去 → commit。

---

## ⚠️ 图片保护（重要）

### 残酷真相

任何放到公网上的图片都**无法 100% 防止被复制**——浏览器要显示就必须能下载字节流，截图、F12 网络面板都能拿到。我们能做的是**分层提高门槛 + 让被拿走的版本对你无害**。

这个仓库是 **public**（GitHub Pages 免费要求），所以**上传到仓库的任何文件本身就是公开可下载的**。要保护作品，必须做两层：

### 第一层：上传前处理（关键，保护仓库里的文件）

**不要直接上传高清原图。** 上传前先用脚本把图片压缩到 ≤1600px + 加水印 + 清 EXIF，把处理后的版本上传，原图自己留着。

```bash
# 1. 把高清原图放进项目根的 raw-images/ 目录（已被 .gitignore 忽略，不会被上传）
mkdir -p raw-images
cp /你的原图路径/*.jpg raw-images/

# 2. 跑处理脚本（首次会自动安装 sharp）
pnpm prepare:images
# 或自定义参数：
pnpm prepare:images --text "你的名字" --max 2000 --opacity 0.5

# 3. 处理后的低清带水印版会输出到 public/works/
# 4. commit + push 上传 public/works/ 里的版本
```

脚本做的事：
- 压缩到最大边 1600px（足够网页清晰，不够印刷盗用）
- 加平铺半透明水印（默认文字 `DREAMCORE & GRAIN`，可用 `--text` 改）
- 清除所有 EXIF（拍摄位置、设备、时间等隐私）
- 输出 JPEG quality 82（体积与质量平衡）

### 第二层：前端加固（保护 deployed site）

已在代码里默认开启，由 `content.config.ts` 的 `protection` 配置控制：

```ts
protection: {
  watermark: true,              // CSS 水印叠层（截图会带水印）
  watermarkText: "DREAMCORE & GRAIN",
  disableContextMenu: true,     // 禁右键菜单
  disableDrag: true,            // 禁图片拖拽
}
```

这层挡得住普通小白（右键保存、拖到桌面都失效），挡不住懂行的人（F12 网络面板仍可拿）。所以**第一层才是关键**。

### 总结：三种上传方式的风险

| 方式 | 仓库原图 | deployed site | 推荐度 |
|---|---|---|---|
| 直接传高清原图 | ❌ 可被高清下载 | 有 CSS 水印+禁右键 | 不推荐 |
| 先跑脚本再上传处理版 | ✅ 只有低清水印版 | 有 CSS 水印+禁右键 | ✅ 推荐 |
| 仓库设 private + Pro 账号 | 别人看不到仓库 | 有 CSS 水印+禁右键 | 最强但需付费 |

---

## 本地开发

```bash
pnpm install
pnpm dev          # 启动开发服务器
pnpm build        # 构建生产版本到 dist/
pnpm check        # TypeScript 类型检查
```

## 技术栈

React 18 + TypeScript + Vite + Tailwind CSS 3，纯静态构建部署到 GitHub Pages。
字体自托管（@fontsource），不依赖外部 CDN。
