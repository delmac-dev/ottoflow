import { DEFAULT_RECT } from "../constant";
import { v4 as uuidv4 } from "uuid";
import { boardStore } from "../stores/board.store";
import { BoardMode, INode, KonvaMouseEvent } from "../types";
import { getDropTarget } from "../utils";

export const click = (e: KonvaMouseEvent) => {
  const { addNode } = boardStore.getState();

  const result = getDropTarget(e);
  if (!result) return;

  const { parentId, relativePos } = result;

  // new rect node
  const newNode: INode = {
    ...DEFAULT_RECT,
    id: uuidv4(),
    x: relativePos.x,
    y: relativePos.y,
  };

  // add it to the tree
  addNode(parentId, newNode);
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