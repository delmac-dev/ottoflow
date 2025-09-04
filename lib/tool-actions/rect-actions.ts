import { boardStore } from "../stores/board.store";
import { BoardMode, KonvaMouseEvent } from "../types";

export const click = (e: KonvaMouseEvent) => {
  console.log("Create rectangle at", e.target.getStage()?.getPointerPosition());
};

export const mouseDown = (e: KonvaMouseEvent) => {
  const { setMode } = boardStore.getState();

  setMode(BoardMode.Drawing);
  console.log("Start rectangle at", e.target.getStage()?.getPointerPosition());
};

export const mouseMove = (e: KonvaMouseEvent) => {
  const { mode } = boardStore.getState();
  
  if (mode === BoardMode.Idle) return;
  console.log("Drawing rectangle at", e.target.getStage()?.getPointerPosition());
};

export const mouseUp = (e: KonvaMouseEvent) => {
  const { setMode } = boardStore.getState();

  setMode(BoardMode.Idle);
  console.log("Finished rectangle tool at", e.target.getStage()?.getPointerPosition());
};