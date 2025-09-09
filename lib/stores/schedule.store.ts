import { createStore } from "zustand/vanilla";

interface IScheduleStore {
  data: Record<string, string>[]; // Array of data objects
  properties: {
    type: string,
    key: string,
  }[],
  isDataSaving: boolean;
  isPropertiesSaving: boolean;
  isAiPending?: boolean;
  setIsDataSaving: (isSaving: boolean) => void;
  setIsPropertiesSaving: (isSaving: boolean) => void;
  setAiPending: (isPending: boolean) => void;
  setData: (data: IScheduleStore["data"]) => void;
  setProperties: (properties: IScheduleStore["properties"]) => void;
};

export const scheduleStore = createStore<IScheduleStore>()((set) => ({
  data: [],
  properties: [],
  isDataSaving: false,
  isPropertiesSaving: false,
  isAiPending: false,
  setAiPending: (isPending) => set({ isAiPending: isPending }),
  setIsDataSaving: (isSaving) => set({ isDataSaving: isSaving }),
  setIsPropertiesSaving: (isSaving) => set({ isPropertiesSaving: isSaving }),
  setData: (data) => set({ data }),
  setProperties: (properties) => set({ properties }),
}));
