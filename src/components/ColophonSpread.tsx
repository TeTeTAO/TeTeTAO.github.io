import { siteContent } from "@/content/content.config";
import WorkImage from "./WorkImage";

/**
 * 关于 / 版权页：
 * 左侧人物照（带胶片框），右侧三段衬线简介，
 * 下方联系方式（等宽字），底部版权信息。
 */
export default function ColophonSpread() {
  const { about, contact, colophon } = siteContent;

  const contactList: { label: string; value?: string; href?: string }[] = [
    { label: "EMAIL", value: contact.email, href: contact.email ? `mailto:${contact.email}` : undefined },
    { label: "INSTAGRAM", value: contact.instagram, href: contact.instagram ? `https://instagram.com/${contact.instagram.replace(/^@/, "")}` : undefined },
    { label: "WEIBO", value: contact.weibo, href: contact.weibo ? `https://weibo.com/n/${contact.weibo.replace(/^@/, "")}` : undefined },
    { label: "XIAOHONGSHU", value: contact.xiaohongshu, href: undefined },
    { label: "WEBSITE", value: contact.website, href: contact.website ? `https://${contact.website}` : undefined },
  ].filter((c) => c.value);

  return (
    <div className="allow-scroll mx-auto h-full w-full max-w-spread overflow-y-auto px-6 py-10 md:px-16 md:py-14">
      {/* 顶部小标识 */}
      <div className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-caption text-ink-faint">
        <span className="h-px flex-1 bg-vermilion/30" />
        <span className="text-vermilion/80">§ 版權頁</span>
        <span className="h-px flex-1 bg-vermilion/30" />
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
        {/* 左侧：人物照 */}
        <figure className="work-frame md:col-span-5">
          <div className="relative overflow-hidden bg-mo/20 aspect-[3/4]">
            <WorkImage
              work={{
                id: "portrait",
                src: about.portrait,
                title: about.title,
                category: "photography",
              }}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-ink/20" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-mo-deep/35 via-transparent to-gold/15" />
          </div>
          <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-caption text-ink-faint">
            自畫像 · 畫室
          </figcaption>
        </figure>

        {/* 右侧：简介 + 联系 */}
        <div className="md:col-span-7">
          <h2 className="font-display text-4xl font-bold leading-tight text-ink md:text-5xl">
            {about.title}
          </h2>

          <div className="mt-5 space-y-4 font-body text-[17px] leading-relaxed text-ink-soft">
            {about.body.map((p, i) => (
              <p key={i} className={i === 0 ? "first-letter:font-display first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:leading-[0.9] first-letter:text-vermilion" : ""}>
                {p}
              </p>
            ))}
          </div>

          {/* 联系方式 */}
          <div className="mt-8">
            <p className="font-mono text-[10px] uppercase tracking-caption text-vermilion">
              § 聯絡方式
            </p>
            <ul className="mt-3 divide-y divide-vermilion/15 border-y border-vermilion/20">
              {contactList.map((c) => (
                <li key={c.label} className="flex items-baseline gap-4 py-2">
                  <span className="w-28 font-mono text-[10px] uppercase tracking-caption text-ink-faint">
                    {c.label}
                  </span>
                  <span className="h-px flex-1 bg-vermilion/15 self-center" />
                  {c.href ? (
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="font-display text-lg italic text-ink hover:text-vermilion"
                    >
                      {c.value}
                    </a>
                  ) : (
                    <span className="font-display text-lg italic text-ink">
                      {c.value}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 版权页 */}
      <footer className="mt-12 border-t border-vermilion/30 pt-5">
        <p className="font-mono text-[10px] uppercase tracking-caption text-vermilion/80">
          § 版權頁
        </p>
        <div className="mt-3 grid grid-cols-1 gap-6 font-body text-sm text-ink-soft md:grid-cols-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-caption text-ink-faint">
              印製
            </p>
            <p className="mt-1 italic">{colophon.printer}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-caption text-ink-faint">
              字體
            </p>
            <ul className="mt-1 space-y-1 italic">
              {colophon.typefaces.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-caption text-ink-faint">
              銘謝
            </p>
            <p className="mt-1 italic">{colophon.thanks}</p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between font-mono text-[10px] uppercase tracking-caption text-ink-faint">
          <span>© {new Date().getFullYear()} {siteContent.magazineName}</span>
          <span className="font-display italic text-base text-ink-soft">
            — 卷終 —
          </span>
          <span>{siteContent.issue}</span>
        </div>
      </footer>
    </div>
  );
}
