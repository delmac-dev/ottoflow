import { create } from 'zustand';

type CanvasStore = {
  width: number;
  height: number;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
};

export const useCanvasStore = create<CanvasStore>((set) => ({
  width: 480,
  height: 480,
  setWidth: (width: number) => set(() => ({ width })),
  setHeight: (height: number) => set(() => ({ height })),
}))