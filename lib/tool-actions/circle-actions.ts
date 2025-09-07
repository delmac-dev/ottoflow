import { DEFAULT_CIRCLE } from "../constant";
import { boardStore } from "../stores/board.store";
import { BoardMode, INode, KonvaMouseEvent } from "../types";
import { getDropTarget } from "../utils";
import { v4 as uuidv4 } from "uuid";

export const click = (e: KonvaMouseEvent) => {
  const { addNode } = boardStore.getState();

  const result = getDropTarget(e);
  if (!result) return;

  const { parentId, relativePos } = result;

  // new circle node
  const newNode: INode = {
    ...DEFAULT_CIRCLE,
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