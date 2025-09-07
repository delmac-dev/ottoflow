import { createStore } from "zustand/vanilla";
import { subscribeWithSelector } from "zustand/middleware";
import { Action, BoardMode, INode } from "../types";
import { getNodeById, removeNodeById, updateNodeById } from "../utils";

interface ISelectionNet {
  visible: boolean,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
}

interface IBoardStore {
  boardID: string,
  name: string,
  setBoardID: (id: string) => void,
  setName: (name: string) => void,

  isSaving: boolean;
  setIsSaving: (isSaving: boolean) => void;

  width: number;
  height: number;
  activeTool: Action;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  setActiveTool: (tool: Action) => void;

  root: INode | null;
  setRoot: (root: INode) => void;
  updateRoot: (id: string, updater: (node: INode) => INode) => void;
  addNode: (parentId: string, newNode: INode) => void;
  getNode: (id: string) => INode | undefined;
  removeNode: (id: string) => void;

  selectionNet: ISelectionNet;
  hideSelectionNet: () => void;
  setSelectionNet: (selectionNet: ISelectionNet) => void;

  selectedNodes: string[];
  setSelectedNodes: (ids: string[]) => void;
  toggleSelectedNode: (id: string) => void;

  mode: BoardMode;
  setMode: (mode: BoardMode) => void;

  shouldDownload: boolean;
  triggerDownload: () => void;
  clearDownload: () => void;
};

export const boardStore = createStore<IBoardStore>()(subscribeWithSelector(
  (set, get) => ({
    name: "",
    boardID: "",
    width: 1200,
    height: 600,
    isSaving: false,
    activeTool: Action.Select,
    shouldDownload: false,
    mode: BoardMode.Idle,
    selectedNodes: [],
    selectionNet: {
      visible: false,
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
    },
    root: null,

    setName: (name) => set({ name }),
    setBoardID: (id) => set({ boardID: id }),
    setIsSaving: (isSaving: boolean) => set({ isSaving }),

    setSelectionNet: (selectionNet: ISelectionNet) => {
      set({ selectionNet: { ...selectionNet } });
    },
    hideSelectionNet: () => {
      set({ selectionNet: { ...get().selectionNet, visible: false } });
    },
    setSelectedNodes: (nodes: string[]) => set({ selectedNodes: nodes }),
    toggleSelectedNode: (id) =>
    set((state) => ({
      selectedNodes: state.selectedNodes.includes(id)
        ? state.selectedNodes.filter((nid) => nid !== id) // remove if exists
        : [...state.selectedNodes, id], // add if not
    })),
    setWidth: (width: number) => set({ width }),
    setHeight: (height: number) => set({ height }),
    setMode: (mode: BoardMode) => set({ mode }),
    setActiveTool: (tool: Action) => set({ activeTool: tool }),
    triggerDownload: () => set({ shouldDownload: true }),
    clearDownload: () => set({ shouldDownload: false }),

    setRoot: (root: INode) => set({ root }),
    updateRoot: (id: string, updater: (node: INode) => INode) => {
      set(state => ({
        root: state.root ? updateNodeById(state.root, id, updater) : null
      }));
    },
    addNode: (parentId: string, newNode: INode) => {
      const root = get().root;
      if (!root) return;

      // Use updateRoot instead of direct mutation
      get().updateRoot(parentId, (parent) => {
        // Only "Page" or "Frame" can have children
        if (parent.type !== "Page" && parent.type !== "Frame") return parent;

        return {
          ...parent,
          children: [...(parent.children || []), newNode]
        };
      });
    },
    getNode: (id: string) => {
      const state = get();
      return state.root ? getNodeById(state.root, id) : undefined;
    },
    removeNode: (id: string) => {
      set(state => ({
        root: state.root ? removeNodeById(state.root, id) : null,
      }));
    },
  })
));