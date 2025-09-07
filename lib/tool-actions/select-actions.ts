import Konva from "konva";
import { boardStore } from "../stores/board.store";
import { BoardMode, KonvaMouseEvent } from "../types";

export const click = (e: KonvaMouseEvent) => {
  const { selectionNet, selectedNodes, setSelectedNodes } = boardStore.getState();

  if (selectionNet.visible) return;

  const target = e.target;
  const isEmptyAreaClick =
    target === target.getStage() ||
    target.getType() === "Layer" ||
    target.hasName("background");

  if (isEmptyAreaClick) {
    setSelectedNodes([]);
    return;
  }

  if (!target.hasName("root-child")) return;

  let clickedId = target.id();
  const shiftPressed = e.evt.shiftKey;
  const ctrlPressed = e.evt.ctrlKey || e.evt.metaKey;

  // Shift: climb up to group if exists
  if (shiftPressed) {
    const group = target.findAncestor("Group", true);
    if (group && group.hasName("root-child")) {
      clickedId = group.id();
    }
  }

  const isSelected = selectedNodes.includes(clickedId);

  if (ctrlPressed) {
    // Multi-select toggle
    if (isSelected) {
      setSelectedNodes(selectedNodes.filter((id) => id !== clickedId));
    } else {
      setSelectedNodes([...selectedNodes, clickedId]);
    }
  } else {
    // Replace selection
    setSelectedNodes([clickedId]);
  }
};

export const mouseDown = (e: KonvaMouseEvent) => {
  const { setSelectionNet, setMode } = boardStore.getState();

  const target = e.target;
  console.log(target);
  const isEmptyArea =
    target === target.getStage() ||
    target.getType() === 'Layer' ||
    target.hasName('background');

  if (!isEmptyArea) return;

  // Start selection rectangle
  setMode(BoardMode.Selecting);
  const stage = e.target.getStage();
  const pos = stage?.getPointerPosition();
  if (!pos) return;

  setSelectionNet({
    visible: true,
    x1: pos.x,
    y1: pos.y,
    x2: pos.x,
    y2: pos.y,
  });
};

export const mouseMove = (e: KonvaMouseEvent) => {
  const { mode, selectionNet, setSelectionNet } = boardStore.getState();

  if (mode !== BoardMode.Selecting) return;

  const stage = e.target.getStage();
  const pos = stage?.getPointerPosition();
  if (!pos) return;

  setSelectionNet({
    ...selectionNet,
    x2: pos.x,
    y2: pos.y,
  });
};

export const mouseUp = (e: KonvaMouseEvent) => {
  const { mode, setMode, setSelectionNet, selectionNet, setSelectedNodes } = boardStore.getState();

  if(mode !== BoardMode.Selecting) return;

  setMode(BoardMode.Idle);

  setTimeout(() => {
    setSelectionNet({
      ...selectionNet,
      visible: false,
    });
  });

  const { x1, y1, x2, y2 } = selectionNet;
  const net = {
    x: Math.min(x1, x2),
    y: Math.min(y1, y2),
    width: Math.abs(x2 - x1),
    height: Math.abs(y2 - y1),
  };

  const stage = e.target.getStage();
  if (!stage) return;

  const elements = stage.find('.root-child');
  
  const selected = elements.filter(el =>
    Konva.Util.haveIntersection(net, el.getClientRect())
  );

  setSelectedNodes(selected.map(el => el.id()));
};