import { useEffect } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WorksGrid from "@/components/WorksGrid";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Lightbox from "@/components/Lightbox";

/**
 * 滚动式作品集主页：Nav + Hero + Works + About + Contact。
 * 顶部 fixed nav，下方一气呵成的纵向滚动布局。
 * Intersection Observer 触发 .reveal 元素的渐入。
 */
export default function App() {
  // 全局 .reveal 渐入观察器
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );

    const run = () => {
      document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => {
        obs.observe(el);
      });
    };
    run();
    // 延迟再扫一次，确保动态渲染的元素也被观察到
    const t = window.setTimeout(run, 200);

    return () => {
      obs.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main>
        <Hero />
        <WorksGrid />
        <About />
        <Contact />
      </main>
      <Lightbox />
    </div>
  );
}
