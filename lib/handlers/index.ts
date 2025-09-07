import Konva from "konva";
import { boardStore } from "../stores/board.store";

export const handleDragEnd = (e: Konva.KonvaEventObject<MouseEvent>) => {
  const id = e.target.id();
  const { updateRoot } = boardStore.getState();
  
  updateRoot(id, (node) => ({
    ...node,
    x: e.target.x(),
    y: e.target.y()
  }));
};

export const handleTransformEnd = (e: Konva.KonvaEventObject<MouseEvent>) => {
  const id = e.target.id();
  const node = e.target;
  const { updateRoot } = boardStore.getState();
  
  const scaleX = node.scaleX();
  const scaleY = node.scaleY();

  // Reset scale to avoid compound scaling
  node.scaleX(1);
  node.scaleY(1);

  updateRoot(id, (currentNode) => ({
    ...currentNode,
    x: node.x(),
    y: node.y(),
    width: Math.max(5, node.width() * scaleX),
    height: Math.max(5, node.height() * scaleY),
    rotation: node.rotation(),
  }));
};