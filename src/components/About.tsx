import { siteContent } from "@/content/content.config";

/**
 * 关于：浅灰底，左侧肖像（可选）+ 右侧文字，移动端纵向堆叠。
 */
export default function About() {
  const { about } = siteContent;

  return (
    <section id="about" className="bg-mist py-24 md:py-32">
      <div className="mx-auto max-w-gallery px-6 md:px-10">
        <div className="reveal mb-12 flex items-baseline gap-4">
          <span className="font-mono text-[11px] uppercase tracking-wider2 text-blue">
            02
          </span>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            {about.title}
          </h2>
        </div>

        <div
          className={`grid gap-10 md:gap-16 ${
            about.portrait ? "md:grid-cols-[1fr_2fr]" : "md:grid-cols-1"
          }`}
        >
          {about.portrait && (
            <div className="reveal">
              <div className="aspect-[4/5] overflow-hidden bg-fog">
                <img
                  src={about.portrait}
                  alt="作者肖像"
                  loading="lazy"
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </div>
            </div>
          )}

          <div className="reveal max-w-prose">
            {about.body.map((p, i) => (
              <p
                key={i}
                className={`font-sans text-[15px] leading-[1.85] text-slate md:text-base ${
                  i > 0 ? "mt-5" : ""
                }`}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
