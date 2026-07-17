import { siteContent } from "@/content/content.config";

/**
 * 联络：反色暗底（炭黑），居中品牌 + 联系方式。
 * 作为页面底部，提供视觉节奏对比。
 */
export default function Contact() {
  const { brand, contact } = siteContent;

  const items = [
    contact.email && {
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    contact.instagram && {
      label: "Instagram",
      value: contact.instagram,
      href: `https://instagram.com/${contact.instagram.replace(/^@/, "")}`,
    },
    contact.weibo && {
      label: "微博",
      value: contact.weibo,
      href: `https://weibo.com/${contact.weibo.replace(/^@/, "")}`,
    },
    contact.xiaohongshu && {
      label: "小红书",
      value: contact.xiaohongshu,
      href: `https://www.xiaohongshu.com/user/profile/${contact.xiaohongshu.replace(/^@/, "")}`,
    },
    contact.website && {
      label: "Website",
      value: contact.website,
      href: contact.website.startsWith("http")
        ? contact.website
        : `https://${contact.website}`,
    },
  ].filter(Boolean) as { label: string; value: string; href: string }[];

  return (
    <section id="contact" className="bg-ink py-24 text-white md:py-32">
      <div className="mx-auto max-w-gallery px-6 text-center md:px-10">
        <div className="reveal mb-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider2 text-blue">
          <span className="h-px w-8 bg-blue/50" />
          <span>03 · Contact</span>
          <span className="h-px w-8 bg-blue/50" />
        </div>

        <h2 className="reveal font-display text-4xl font-semibold tracking-tight md:text-6xl">
          {brand}
        </h2>

        <p className="reveal mx-auto mt-5 max-w-md font-sans text-sm leading-relaxed text-white/60 md:text-base">
          欢迎来信洽询作品 / 展览合作 / 收藏意向。
        </p>

        {items.length > 0 && (
          <div className="reveal mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {items.map((it) => (
              <a
                key={it.label}
                href={it.href}
                target={it.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group text-left"
              >
                <div className="font-mono text-[10px] uppercase tracking-caption text-blue">
                  {it.label}
                </div>
                <div className="mt-0.5 font-sans text-sm text-white/80 transition-colors group-hover:text-white">
                  {it.value}
                </div>
              </a>
            ))}
          </div>
        )}

        <div className="mt-20 border-t border-white/10 pt-8 font-mono text-[10px] uppercase tracking-caption text-white/40">
          © {new Date().getFullYear()} {brand} · All works © respective artist
        </div>
      </div>
    </section>
  );
}
