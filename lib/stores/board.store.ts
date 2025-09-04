import Konva from "konva";
import { createStore } from "zustand/vanilla";
import { subscribeWithSelector } from "zustand/middleware";
import { Action, BoardMode } from "../types";

interface IElements {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  id: string;
  name: string;
  rotation: number;
};

interface ISelectionNet {
  visible: boolean,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
}

interface IBoardStore {
  width: number;
  height: number;
  activeTool: Action;
  shouldDownload: boolean;
  mode: BoardMode;

  selectionNet: ISelectionNet;
  hideSelectionNet: () => void;
  setSelectionNet: (selectionNet: Omit<ISelectionNet, 'visible'>) => void;
  setMode: (mode: BoardMode) => void;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  setActiveTool: (tool: Action) => void;
  triggerDownload: () => void;
  clearDownload: () => void;
};

interface IExampleOneStore {
  isSelecting: boolean;
  selectedIds: string[];
  elements: IElements[];
  selectionNet: ISelectionNet;
  setSelectionNet: (selectionNet: ISelectionNet) => void;
  setIsSelecting: (isSelecting: boolean) => void;
  setElements: (elements: IElements[]) => void;
  setSelectedIds: (ids: string[]) => void;
}

interface IExampleThreeStore {
  position: { x: number; y: number };
  history: { x: number; y: number }[];
  historyStep: number;
  setPosition: (position: { x: number; y: number }) => void;
  undo: () => void;
  redo: () => void;
  dragEnd: (e: Konva.KonvaEventObject<DragEvent>) => void;
}

export const boardStore = createStore<IBoardStore>()(subscribeWithSelector(
  (set, get) => ({
    width: 1200,
    height: 600,
    activeTool: Action.Select,
    shouldDownload: false,
    mode: BoardMode.Idle,
    selectionNet: {
      visible: false,
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
    },
    setSelectionNet: (selectionNet: Omit<ISelectionNet, 'visible'>) => {
      set({ selectionNet: { ...selectionNet, visible: true } });
    },
    hideSelectionNet: () => {
      set({ selectionNet: { ...get().selectionNet, visible: false } });
    },
    setWidth: (width: number) => set({ width }),
    setHeight: (height: number) => set({ height }),
    setMode: (mode: BoardMode) => set({ mode }),
    setActiveTool: (tool: Action) => set({ activeTool: tool }),
    triggerDownload: () => set({ shouldDownload: true }),
    clearDownload: () => set({ shouldDownload: false }),
  })
));

export const exampleOneStore = createStore<IExampleOneStore>()(
  (set) => ({
    isSelecting: false,
    selectedIds: [],
    elements: [],
    selectionNet: {
      visible: false,
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
    },
    setSelectionNet: (selectionNet: ISelectionNet) => set({ selectionNet }),
    setIsSelecting: (isSelecting: boolean) => set({ isSelecting }),
    setElements: (elements: IElements[]) => set({ elements }),
    setSelectedIds: (ids: string[]) => set({ selectedIds: ids }),
  })
);

export const exampleThreeStore = createStore<IExampleThreeStore>()(
  (set, get) => ({
    position: { x: 20, y: 20 },
    history: [{ x: 20, y: 20 }],
    historyStep: 0,
    setPosition: (position: { x: number; y: number }) => set({ position }),
    undo: () => {
      const s = get();
      if (s.historyStep === 0) return;
      set({
        historyStep: s.historyStep - 1,
        position: s.history[s.historyStep - 1]
      });
    },
    redo: () => {
      const s = get();
      if (s.historyStep === s.history.length - 1) return;
      set({
        historyStep: s.historyStep + 1,
        position: s.history[s.historyStep + 1]
      });
    },
    dragEnd: (e: Konva.KonvaEventObject<DragEvent>) => {
      const s = get();
      // Remove all states after current step
      s.history = s.history.slice(0, s.historyStep + 1);
      const pos = {
        x: e.target.x(),
        y: e.target.y(),
      };
      // Push the new state
      s.history = s.history.concat([pos]);
      s.historyStep += 1;
      set({
        history: s.history,
        historyStep: s.historyStep,
        position: pos
      });
    }
  })
);
