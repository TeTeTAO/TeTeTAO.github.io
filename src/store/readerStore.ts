import { useEffect } from "react";
import { create } from "zustand";

interface ReaderState {
  /** 灯箱中正在查看的作品 id，null 表示关闭 */
  lightboxWorkId: string | null;
  openLightbox: (id: string) => void;
  closeLightbox: () => void;
}

export const useReaderStore = create<ReaderState>((set) => ({
  lightboxWorkId: null,
  openLightbox: (id) => set({ lightboxWorkId: id }),
  closeLightbox: () => set({ lightboxWorkId: null }),
}));

/**
 * 全局 ESC 监听 hook（在 Lightbox 组件内使用即可，
 * 但抽出后便于其他弹层复用）。
 */
export function useEscapeKey(handler: () => void, active = true) {
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handler();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handler, active]);
}
