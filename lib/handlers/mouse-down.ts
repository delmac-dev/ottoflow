import { boardStore } from "../stores/board.store";
import { Action, BoardMode, KonvaMouseEvent } from "../types";

export default function mouseDown(e: KonvaMouseEvent) {
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
  const { setMode } = boardStore.getState();

  setMode(BoardMode.Selecting);
  console.log('select action');
}

const frameAction = (e: KonvaMouseEvent) => {
  const { setMode } = boardStore.getState();

  setMode(BoardMode.Transforming);
  console.log("Start frame at", e.target.getStage()?.getPointerPosition());
}

const rectangleAction = (e: KonvaMouseEvent) => {
  const { setMode } = boardStore.getState();

  setMode(BoardMode.Drawing);
  console.log("Start rectangle at", e.target.getStage()?.getPointerPosition());
}

const circleAction = (e: KonvaMouseEvent) => {
  const { setMode } = boardStore.getState();

  setMode(BoardMode.Drawing);
  console.log("Start circle at", e.target.getStage()?.getPointerPosition());
}

const arrowAction = (e: KonvaMouseEvent) => {
  const { setMode } = boardStore.getState();

  setMode(BoardMode.Drawing);
  console.log("Start arrow at", e.target.getStage()?.getPointerPosition());
}

const lineAction = (e: KonvaMouseEvent) => {
  const { setMode } = boardStore.getState();

  setMode(BoardMode.Drawing);
  console.log("Start line at", e.target.getStage()?.getPointerPosition());
}

const penAction = (e: KonvaMouseEvent) => {
  const { setMode } = boardStore.getState();

  setMode(BoardMode.Drawing);
  console.log("Start pen at", e.target.getStage()?.getPointerPosition());
}

const starAction = (e: KonvaMouseEvent) => {
  const { setMode } = boardStore.getState();

  setMode(BoardMode.Drawing);
  console.log("Start star at", e.target.getStage()?.getPointerPosition());
}

const polygonAction = (e: KonvaMouseEvent) => {
  const { setMode } = boardStore.getState();

  setMode(BoardMode.Drawing);
  console.log("Start polygon at", e.target.getStage()?.getPointerPosition());
}

const ringAction = (e: KonvaMouseEvent) => {
  const { setMode } = boardStore.getState();

  setMode(BoardMode.Drawing);
  console.log("Start ring at", e.target.getStage()?.getPointerPosition());
}

const textAction = (e: KonvaMouseEvent) => {
  const { setMode } = boardStore.getState();

  setMode(BoardMode.Drawing);
  console.log("Start text at", e.target.getStage()?.getPointerPosition());
}

const imageAction = (e: KonvaMouseEvent) => {
  const { setMode } = boardStore.getState();

  setMode(BoardMode.Drawing);
  console.log("Start image at", e.target.getStage()?.getPointerPosition());
}