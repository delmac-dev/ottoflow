import { boardStore } from "../stores/board.store";
import { BoardMode, KonvaMouseEvent } from "../types";

export const click = (e: KonvaMouseEvent) => {
  console.log("Create frame at", e.target.getStage()?.getPointerPosition());
};

export const mouseDown = (e: KonvaMouseEvent) => {
  const { setMode } = boardStore.getState();

  setMode(BoardMode.Transforming);
  console.log("Start frame at", e.target.getStage()?.getPointerPosition());
};

export const mouseMove = (e: KonvaMouseEvent) => {
  const { mode } = boardStore.getState();
  
  if (mode === BoardMode.Idle) return;
  console.log("Drawing frame at", e.target.getStage()?.getPointerPosition());
};

export const mouseUp = (e: KonvaMouseEvent) => {
  const { setMode } = boardStore.getState();

  setMode(BoardMode.Idle);
  console.log("Finished frame tool at", e.target.getStage()?.getPointerPosition());
}