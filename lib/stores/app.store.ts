import { createStore } from "zustand/vanilla";

interface IAppStore {
  projectID: string;
  setProjectID: (id: string) => void;
};

export const appStore = createStore<IAppStore>()((set) => ({
  projectID: "",
  setProjectID: (id) => set({ projectID: id }),
}));
