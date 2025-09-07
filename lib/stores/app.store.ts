import { createStore } from "zustand/vanilla";

interface IAppStore {
  projectID: string | null;
  setProjectID: (id: IAppStore["projectID"]) => void;
};

export const appStore = createStore<IAppStore>()((set) => ({
  projectID: null,
  setProjectID: (id) => set({ projectID: id }),
}));
