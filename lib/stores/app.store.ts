import { create } from "zustand";

type AppStore = {
  canvas_options: {
    width: number,
    height: number
  },
  setCanvasOptions: (options: AppStore["canvas_options"]) => void;
};

export const useAppStore = create<AppStore>((set) => ({
  canvas_options: {
    width: 0,
    height: 0
  },
  setCanvasOptions: (options) => set({ canvas_options: options }),
}));