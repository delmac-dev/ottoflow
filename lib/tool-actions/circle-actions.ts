import { boardStore } from "../stores/board.store";
import { BoardMode, KonvaMouseEvent } from "../types";

export const click = (e: KonvaMouseEvent) => {
  console.log("Create circle at", e.target.getStage()?.getPointerPosition());
};

export const mouseDown = (e: KonvaMouseEvent) => {
  const { setMode } = boardStore.getState();

  setMode(BoardMode.Drawing);
  console.log("Start circle at", e.target.getStage()?.getPointerPosition());
};

export const mouseMove = (e: KonvaMouseEvent) => {
  const { mode } = boardStore.getState();
  
  if (mode === BoardMode.Idle) return;
  console.log("Drawing circle at", e.target.getStage()?.getPointerPosition());
};

export const mouseUp = (e: KonvaMouseEvent) => {
  const { setMode } = boardStore.getState();

  setMode(BoardMode.Idle);
  console.log("Finished circle tool at", e.target.getStage()?.getPointerPosition());
}