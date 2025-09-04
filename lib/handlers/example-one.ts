import Konva from "konva";
import { boardStore, exampleOneStore } from "../stores/board.store";
import { _getClientRect } from "../utils";

export const handleClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
  const { selectionNet, setSelectedIds, selectedIds } = exampleOneStore.getState();
  console.log(e.target.name())

  if (selectionNet.visible) return;

  const target = e.target;
  const isEmptyAreaClick =
    target === target.getStage() ||
    target.getType() === 'Layer' ||
    target.hasName('background');

  // If click on empty area - remove all selections
  if (isEmptyAreaClick) {
    setSelectedIds([]);
    return;
  }
  
  // Do nothing if clicked NOT on our rectangles
  if (!target.hasName('rect')) return;

  const clickedId = target.id();
  const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
  const isSelected = selectedIds.includes(clickedId);

  if (!metaPressed && !isSelected) {
    // If no key pressed and the node is not selected
    // select just one
    setSelectedIds([clickedId]);
  } else if (metaPressed && isSelected) {
    // If we pressed keys and node was selected
    // we need to remove it from selection
    setSelectedIds(selectedIds.filter(id => id !== clickedId));
  } else if (metaPressed && !isSelected) {
    // Add the node into selection
    setSelectedIds([...selectedIds, clickedId]);
  }
};

export const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
  const { setSelectionNet, setIsSelecting } = exampleOneStore.getState();
  const target = e.target;

  const isEmptyArea =
    target === target.getStage() ||
    target.getType() === 'Layer' ||
    target.hasName('background');

  // Do nothing if we mousedown on any shape (not on empty layer area)
  if (!isEmptyArea) return;

  // Start selection rectangle
  setIsSelecting(true);
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

export const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
  const { isSelecting, selectionNet, setSelectionNet } = exampleOneStore.getState();
  // Do nothing if we didn't start selection
  if (!isSelecting) return;

  const pos = e.target.getStage()?.getPointerPosition();
  if (!pos) return;
  setSelectionNet({
    ...selectionNet,
    x2: pos.x,
    y2: pos.y,
  });
};

export const handleMouseUp = (e: Konva.KonvaEventObject<MouseEvent>) => {
  const { isSelecting,selectionNet, setIsSelecting, setSelectionNet, setSelectedIds } =
    exampleOneStore.getState();
  if (!isSelecting) return;

  setIsSelecting(false);

  // Hide selection rectangle
  setTimeout(() => {
    setSelectionNet({
      ...selectionNet,
      visible: false,
    });
  });

  const { x1, y1, x2, y2 } = selectionNet;
  const selBox = {
    x: Math.min(x1, x2),
    y: Math.min(y1, y2),
    width: Math.abs(x2 - x1),
    height: Math.abs(y2 - y1),
  };

  const stage = e.target.getStage();
  if (!stage) return;

  const elements = stage.find('.rect');

  const selected = elements.filter(el =>
    Konva.Util.haveIntersection(selBox, el.getClientRect())
  );

  setSelectedIds(selected.map(node => node.id()));
};