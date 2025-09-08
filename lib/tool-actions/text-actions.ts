import { v4 as uuidv4 } from "uuid";
import { DEFAULT_TEXT } from "../constant";
import { boardStore } from "../stores/board.store";
import { BoardMode, INode, KonvaMouseEvent } from "../types";
import { getDropTarget } from "../utils";

export const click = (e: KonvaMouseEvent) => {
  const { addNode } = boardStore.getState();
  
    const result = getDropTarget(e);
    if (!result) return;
  
    const { parentId, relativePos, isPage } = result;
  
    // new text node
    const newNode: INode = {
      ...DEFAULT_TEXT,
      id: uuidv4(),
      name: `${DEFAULT_TEXT.name} ${!isPage ? "frame-element" : ""}`,
      x: relativePos.x,
      y: relativePos.y,
    };
  
    // add it to the tree
    addNode(parentId, newNode);
};

export const mouseDown = (e: KonvaMouseEvent) => {
  const { setMode } = boardStore.getState();

  setMode(BoardMode.Drawing);
  console.log("Start text at", e.target.getStage()?.getPointerPosition());
};

export const mouseMove = (e: KonvaMouseEvent) => {
  const { mode } = boardStore.getState();
  
  if (mode === BoardMode.Idle) return;
  console.log("Adding text at", e.target.getStage()?.getPointerPosition());
};

export const mouseUp = (e: KonvaMouseEvent) => {
  const { setMode } = boardStore.getState();

  setMode(BoardMode.Idle);
  console.log("Finished text tool at", e.target.getStage()?.getPointerPosition());
}