import Konva from "konva";
import { boardStore } from "../stores/board.store";
import { Action, BoardMode, KonvaMouseEvent } from "../types";

export const handleDragEnd = (e: KonvaMouseEvent) => {
  const id = e.target.id();
  const { updateRoot } = boardStore.getState();
  
  updateRoot(id, (node) => ({
    ...node,
    x: e.target.x(),
    y: e.target.y()
  }));
};

export const handleTransformEnd = (e: KonvaMouseEvent) => {
  const id = e.target.id();
  const node = e.target;
  const { updateRoot } = boardStore.getState();
  
  const scaleX = node.scaleX();
  const scaleY = node.scaleY();

  // Reset scale to avoid compound scaling
  node.scaleX(1);
  node.scaleY(1);

  switch (node.getAttr("nodeType")) {
    case "Circle": {
      const scale = (scaleX + scaleY) / 2;
      updateRoot(id, (currentNode) => ({
        ...currentNode,
        x: node.x(),
        y: node.y(),
        radius: Math.max(5, (currentNode.radius ?? node.width() / 2) * scale),
      }));
      break;
    }

    case "Ellipse": {
      updateRoot(id, (currentNode) => ({
        ...currentNode,
        x: node.x(),
        y: node.y(),
        radiusX: Math.max(5, (currentNode.radiusX ?? node.width() / 2) * scaleX),
        radiusY: Math.max(5, (currentNode.radiusY ?? node.height() / 2) * scaleY),
      }));
      break;
    }

    case "Arrow":
    case "Line": {
      const lineNode = node as Konva.Line;
      updateRoot(id, (currentNode) => ({
        ...currentNode,
        x: lineNode.x(),
        y: lineNode.y(),
        points: lineNode.points(),
        rotation: lineNode.rotation(),
      }));
      break;
    }

    default: {
      // Rect, Image, Text, etc.
      updateRoot(id, (currentNode) => ({
        ...currentNode,
        x: node.x(),
        y: node.y(),
        width: Math.max(5, node.width() * scaleX),
        height: Math.max(5, node.height() * scaleY),
        rotation: node.rotation(),
      }));
    }
  }
};

export const handleDragStart = (e: KonvaMouseEvent) => {
  const activeTool = boardStore.getState().activeTool;

  if (activeTool !== Action.Select) {
    e.cancelBubble = true;
    e.target.stopDrag();
    return;
  }
};