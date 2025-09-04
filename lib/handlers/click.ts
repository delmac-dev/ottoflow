import { boardStore } from "../stores/board.store";
import { Action, KonvaMouseEvent } from "../types";

export default function click(e: KonvaMouseEvent) {
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
  console.log('select action');
}

const frameAction = (e: KonvaMouseEvent) => {
  console.log("Create frame at", e.target.getStage()?.getPointerPosition());
}

const rectangleAction = (e: KonvaMouseEvent) => {
  console.log("Create rectangle at", e.target.getStage()?.getPointerPosition());
}

const circleAction = (e: KonvaMouseEvent) => {
  console.log("Create circle at", e.target.getStage()?.getPointerPosition());
}

const arrowAction = (e: KonvaMouseEvent) => {
  console.log("Create arrow at", e.target.getStage()?.getPointerPosition());
}

const lineAction = (e: KonvaMouseEvent) => {
  console.log("Create line at", e.target.getStage()?.getPointerPosition());
}

const penAction = (e: KonvaMouseEvent) => {
  console.log("Create pen at", e.target.getStage()?.getPointerPosition());
}

const starAction = (e: KonvaMouseEvent) => {
  console.log("Create star at", e.target.getStage()?.getPointerPosition());
}

const polygonAction = (e: KonvaMouseEvent) => {
  console.log("Create polygon at", e.target.getStage()?.getPointerPosition());
}

const ringAction = (e: KonvaMouseEvent) => {
  console.log("Create ring at", e.target.getStage()?.getPointerPosition());
}

const textAction = (e: KonvaMouseEvent) => {
  console.log("Create text at", e.target.getStage()?.getPointerPosition());
}

const imageAction = (e: KonvaMouseEvent) => {
  console.log("Create image at", e.target.getStage()?.getPointerPosition());
}