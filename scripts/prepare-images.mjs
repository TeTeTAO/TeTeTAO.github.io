#!/usr/bin/env node
/**
 * 图片预处理脚本：压缩 + 加水印 + 清 EXIF
 *
 * 用法：
 *   pnpm prepare:images                       # 处理 raw-images/ 全部图片，输出到 public/works/
 *   pnpm prepare:images --text "我的名字"     # 自定义水印文字
 *   pnpm prepare:images --max 2000            # 自定义最大边长（默认 1600）
 *   pnpm prepare:images --opacity 0.5         # 水印不透明度 0-1（默认 0.35）
 *
 * 工作流：
 *   1. 把你的原图（高清）放进项目根的 raw-images/ 目录
 *   2. 跑 pnpm prepare:images
 *   3. 处理后的低清带水印版会输出到 public/works/（覆盖同名文件）
 *   4. 把 public/works/ 里的版本 commit + push 到 GitHub
 *   5. 原图自己留着，不要上传
 *
 * 这样仓库里只有低清带水印版，即使被下载也无法高清印刷盗用。
 * 需要 sharp：首次运行会自动安装（pnpm install sharp）。
 */

import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join, extname, basename } from "node:path";
import { spawnSync } from "node:child_process";

// 解析命令行参数
const args = process.argv.slice(2);
const textIdx = args.indexOf("--text");
const maxIdx = args.indexOf("--max");
const opacityIdx = args.indexOf("--opacity");
const WATERMARK_TEXT =
  textIdx >= 0 && args[textIdx + 1] ? args[textIdx + 1] : "DREAMCORE & GRAIN";
const MAX_EDGE = maxIdx >= 0 && args[maxIdx + 1] ? parseInt(args[maxIdx + 1], 10) : 1600;
const OPACITY =
  opacityIdx >= 0 && args[opacityIdx + 1] ? parseFloat(args[opacityIdx + 1]) : 0.35;

const RAW_DIR = join(process.cwd(), "raw-images");
const OUT_DIR = join(process.cwd(), "public", "works");

// 确保 sharp 已安装
async function ensureSharp() {
  try {
    return await import("sharp");
  } catch {
    console.log("首次运行，正在安装 sharp...");
    const res = spawnSync("pnpm", ["add", "-D", "sharp"], {
      stdio: "inherit",
      shell: process.platform === "win32",
    });
    if (res.status !== 0) {
      console.error("sharp 安装失败，请手动运行：pnpm add -D sharp");
      process.exit(1);
    }
    return await import("sharp");
  }
}

/** 生成平铺水印的 SVG overlay（用于叠加到图片上） */
function makeWatermarkSvg(width, height) {
  const fontSize = Math.max(16, Math.floor(Math.min(width, height) / 28));
  const text = WATERMARK_TEXT.toUpperCase();
  // 平铺间距
  const stepX = width / 3;
  const stepY = height / 4;
  const rows = [];
  for (let r = 0; r <= 4; r++) {
    for (let c = 0; c <= 3; c++) {
      const x = c * stepX + (r % 2 === 0 ? 0 : stepX / 2);
      const y = r * stepY;
      rows.push(
        `<text x="${x}" y="${y}" font-family="monospace" font-size="${fontSize}" fill="white" fill-opacity="${OPACITY}" transform="rotate(-30 ${x} ${y})" letter-spacing="${fontSize * 0.3}">${escapeXml(text)}</text>`,
      );
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><g>${rows.join("")}</g></svg>`;
}

function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff"]);

async function processOne(sharp, file) {
  const inPath = join(RAW_DIR, file);
  const ext = extname(file).toLowerCase();
  const outName = basename(file, extname(file)) + ".jpg";
  const outPath = join(OUT_DIR, outName);

  const meta = await sharp(inPath).metadata();
  console.log(
    `  ${file}  ${meta.width}×${meta.height} → 压缩到 ≤${MAX_EDGE}px，清 EXIF，加水印「${WATERMARK_TEXT}」`,
  );

  // 先 resize（保持比例，最大边不超过 MAX_EDGE）+ 清 EXIF
  let pipeline = sharp(inPath, { failOn: "none" })
    .rotate() // 按相机方向自动旋转
    .resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: "inside",
      withoutEnlargement: true,
    })
    .removeExif(); // 关键：清除所有 EXIF（拍摄位置、设备、时间等隐私）

  // 叠加水印
  const w = Math.min(meta.width, MAX_EDGE);
  const h = Math.round(w * (meta.height / meta.width));
  const overlay = Buffer.from(makeWatermarkSvg(w, h));
  pipeline = pipeline.composite([
    { input: overlay, blend: "over", gravity: "center" },
  ]);

  // 输出为 JPEG（quality 82，体积与质量平衡）
  await pipeline
    .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: "4:2:0" })
    .toFile(outPath);

  const outStat = statSync(outPath);
  console.log(`    ✓ 输出 ${outName}  ${(outStat.size / 1024).toFixed(0)} KB`);
}

async function main() {
  const sharp = await ensureSharp();

  if (!existsSync(RAW_DIR)) {
    console.error(`找不到 raw-images/ 目录。请先在项目根创建 raw-images/，把原图放进去。`);
    process.exit(1);
  }
  mkdirSync(OUT_DIR, { recursive: true });

  const files = readdirSync(RAW_DIR).filter((f) =>
    EXTS.has(extname(f).toLowerCase()),
  );

  if (files.length === 0) {
    console.log("raw-images/ 里没有可处理的图片（支持 jpg/jpeg/png/webp/tif/tiff）。");
    return;
  }

  console.log(`\n开始处理 ${files.length} 张图片...`);
  console.log(`  水印文字：${WATERMARK_TEXT}`);
  console.log(`  最大边长：${MAX_EDGE}px`);
  console.log(`  水印不透明度：${OPACITY}\n`);

  let ok = 0;
  for (const f of files) {
    try {
      await processOne(sharp, f);
      ok++;
    } catch (e) {
      console.error(`  ✗ ${f} 处理失败：${e.message}`);
    }
  }

  console.log(`\n完成：${ok}/${files.length} 张已输出到 public/works/`);
  console.log(`现在可以 commit + push 上传 public/works/ 里的版本了。`);
  console.log(`原图请留在 raw-images/ 不要上传（已在 .gitignore 中忽略）。\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
