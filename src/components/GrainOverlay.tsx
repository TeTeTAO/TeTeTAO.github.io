/**
 * 全局颗粒 / 漏光 / 暗角 / 划痕叠层。
 * 固定铺在视口上，不影响交互。
 */
export default function GrainOverlay() {
  return (
    <>
      <div className="scratches-layer" aria-hidden />
      <div className="vignette-layer" aria-hidden />
      <div className="grain-layer" aria-hidden />
    </>
  );
}
