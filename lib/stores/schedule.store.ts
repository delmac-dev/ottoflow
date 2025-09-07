import { createStore } from "zustand/vanilla";

interface IScheduleStore {
  data: Record<string, string>[]; // Array of data objects
  properties: {
    type: string,
    key: string,
  }[],
  setData: (data: IScheduleStore["data"]) => void;
  setProperties: (properties: IScheduleStore["properties"]) => void;
};

export const scheduleStore = createStore<IScheduleStore>()((set) => ({
  data: [],
  properties: [],
  setData: (data) => set({ data }),
  setProperties: (properties) => set({ properties }),
}));
