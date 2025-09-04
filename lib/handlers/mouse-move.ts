import { boardStore } from "../stores/board.store";
import { Action, BoardMode, KonvaMouseEvent } from "../types";

export default function mouseMove(e: KonvaMouseEvent) {
  const { activeTool } = boardStore.getState();

  switch (activeTool) {
    case Action.Select: selectAction(e); break;
    case Action.Frame: frameAction(e); break;
    case Action.Rectangle: rectangleAction(e); break;
    case Action.Circle: circleAction(e); break;
    case Action.Arrow: arrowAction(e); break;
    case Action.Line: lineAction(e); break;
    case Action.Pen: penAction(e); break;
    case Action.Star: starAction(e); break;
    case Action.Polygon: polygonAction(e); break;
    case Action.Ring: ringAction(e); break;
    case Action.Text: textAction(e); break;
    case Action.Image: imageAction(e); break;
    default: break;
  }
}

const selectAction = (e: KonvaMouseEvent) => {
  const { mode } = boardStore.getState();

  if (mode === BoardMode.Idle) return;
  console.log("Selecting at", e.target.getStage()?.getPointerPosition());
};

const frameAction = (e: KonvaMouseEvent) => {
  const { mode } = boardStore.getState();
  
  if (mode === BoardMode.Idle) return;
  console.log("Drawing frame at", e.target.getStage()?.getPointerPosition());
};

const rectangleAction = (e: KonvaMouseEvent) => {
  const { mode } = boardStore.getState();
  
  if (mode === BoardMode.Idle) return;
  console.log("Drawing rectangle at", e.target.getStage()?.getPointerPosition());
};

const circleAction = (e: KonvaMouseEvent) => {
  const { mode } = boardStore.getState();
  
  if (mode === BoardMode.Idle) return;
  console.log("Drawing circle at", e.target.getStage()?.getPointerPosition());
};

const arrowAction = (e: KonvaMouseEvent) => {
  const { mode } = boardStore.getState();
  
  if (mode === BoardMode.Idle) return;
  console.log("Drawing arrow at", e.target.getStage()?.getPointerPosition());
};

const lineAction = (e: KonvaMouseEvent) => {
  const { mode } = boardStore.getState();
  
  if (mode === BoardMode.Idle) return;
  console.log("Drawing line at", e.target.getStage()?.getPointerPosition());
};

const penAction = (e: KonvaMouseEvent) => {
  const { mode } = boardStore.getState();
  
  if (mode === BoardMode.Idle) return;
  console.log("Drawing with pen at", e.target.getStage()?.getPointerPosition());
};

const starAction = (e: KonvaMouseEvent) => {
  const { mode } = boardStore.getState();
  
  if (mode === BoardMode.Idle) return;
  console.log("Drawing star at", e.target.getStage()?.getPointerPosition());
};

const polygonAction = (e: KonvaMouseEvent) => {
  const { mode } = boardStore.getState();
  
  if (mode === BoardMode.Idle) return;
  console.log("Drawing polygon at", e.target.getStage()?.getPointerPosition());
};

const ringAction = (e: KonvaMouseEvent) => {
  const { mode } = boardStore.getState();
  
  if (mode === BoardMode.Idle) return;
  console.log("Drawing ring at", e.target.getStage()?.getPointerPosition());
};

const textAction = (e: KonvaMouseEvent) => {
  const { mode } = boardStore.getState();
  
  if (mode === BoardMode.Idle) return;
  console.log("Adding text at", e.target.getStage()?.getPointerPosition());
};

const imageAction = (e: KonvaMouseEvent) => {
  const { mode } = boardStore.getState();
  
  if (mode === BoardMode.Idle) return;
  console.log("Adding image at", e.target.getStage()?.getPointerPosition());
};