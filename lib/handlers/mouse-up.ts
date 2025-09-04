import { boardStore } from "../stores/board.store";
import { Action, BoardMode, KonvaMouseEvent } from "../types";

export default function mouseUp(e: KonvaMouseEvent) {
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
};

function selectAction(e: KonvaMouseEvent) {
  const { setMode } = boardStore.getState();

  setMode(BoardMode.Idle);
  console.log("Select tool mouse up");
}

function frameAction(e: KonvaMouseEvent) {
  const { setMode } = boardStore.getState();

  setMode(BoardMode.Idle);
  console.log("Finished frame tool at", e.target.getStage()?.getPointerPosition());
}

function rectangleAction(e: KonvaMouseEvent) {
  const { setMode } = boardStore.getState();

  setMode(BoardMode.Idle);
  console.log("Finished rectangle tool at", e.target.getStage()?.getPointerPosition());
}
function circleAction(e: KonvaMouseEvent) {
  const { setMode } = boardStore.getState();

  setMode(BoardMode.Idle);
  console.log("Finished circle tool at", e.target.getStage()?.getPointerPosition());
}

function arrowAction(e: KonvaMouseEvent) {
  const { setMode } = boardStore.getState();

  setMode(BoardMode.Idle);
  console.log("Finished arrow tool at", e.target.getStage()?.getPointerPosition());
}

function lineAction(e: KonvaMouseEvent) {
  const { setMode } = boardStore.getState();

  setMode(BoardMode.Idle);
  console.log("Finished line tool at", e.target.getStage()?.getPointerPosition());
}

function penAction(e: KonvaMouseEvent) {
  const { setMode } = boardStore.getState();

  setMode(BoardMode.Idle);
  console.log("Finished pen tool at", e.target.getStage()?.getPointerPosition());
}

function starAction(e: KonvaMouseEvent) {
  const { setMode } = boardStore.getState();

  setMode(BoardMode.Idle);
  console.log("Finished star tool at", e.target.getStage()?.getPointerPosition());
}

function polygonAction(e: KonvaMouseEvent) {
  const { setMode } = boardStore.getState();

  setMode(BoardMode.Idle);
  console.log("Finished polygon tool at", e.target.getStage()?.getPointerPosition());
}

function ringAction(e: KonvaMouseEvent) {
  const { setMode } = boardStore.getState();

  setMode(BoardMode.Idle);
  console.log("Finished ring tool at", e.target.getStage()?.getPointerPosition());
}

function textAction(e: KonvaMouseEvent) {
  const { setMode } = boardStore.getState();

  setMode(BoardMode.Idle);
  console.log("Finished text tool at", e.target.getStage()?.getPointerPosition());
}

function imageAction(e: KonvaMouseEvent) {
  const { setMode } = boardStore.getState();

  setMode(BoardMode.Idle);
  console.log("Finished image tool at", e.target.getStage()?.getPointerPosition());
}