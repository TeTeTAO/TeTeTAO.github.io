import { create } from "zustand";

interface ReaderState {
  /** 当前 spread 索引（在 composeSpreads 产出的序列中的位置） */
  currentIndex: number;
  /** 总 spread 数 */
  total: number;
  /** 当前是否正在翻页过渡中（避免连续触发） */
  turning: boolean;
  /** 灯箱中正在查看的作品 id，null 表示关闭 */
  lightboxWorkId: string | null;

  setTotal: (n: number) => void;
  go: (i: number) => void;
  next: () => void;
  prev: () => void;
  setTurning: (v: boolean) => void;
  openLightbox: (id: string) => void;
  closeLightbox: () => void;
}

export const useReaderStore = create<ReaderState>((set, get) => ({
  currentIndex: 0,
  total: 1,
  turning: false,
  lightboxWorkId: null,

  setTotal: (n) => set({ total: Math.max(1, n) }),

  go: (i) => {
    const { total, turning } = get();
    if (turning) return;
    const clamped = Math.max(0, Math.min(total - 1, i));
    if (clamped === get().currentIndex) return;
    set({ turning: true, currentIndex: clamped });
    window.setTimeout(() => set({ turning: false }), 420);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#spread-${clamped}`);
    }
  },

  next: () => get().go(get().currentIndex + 1),
  prev: () => get().go(get().currentIndex - 1),

  setTurning: (v) => set({ turning: v }),

  openLightbox: (id) => set({ lightboxWorkId: id }),
  closeLightbox: () => set({ lightboxWorkId: null }),
}));
