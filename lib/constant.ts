import { v4 as uuidv4 } from "uuid";
import { INode } from "./types";

export const DEFAULT_PAGE: INode = {
  id: uuidv4(),
  name: "page",
  type: "Page",
  x: 0,
  y: 0,
  width: 480,
  height: 480,
  rotation: 0,
  opacity: 1,
  visible: true,
  fill: "#fff",
  fillGradient: undefined,
  stroke: undefined,
  strokeWidth: undefined,
  shadow: undefined,
  cornerRadius: undefined,
  children: []
};

export const DEFAULT_FRAME: INode = {
  id: uuidv4(),
  name: "frame",
  type: "Frame",
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  rotation: 0,
  opacity: 1,
  visible: true,
  fill: undefined,
  fillGradient: undefined,
  stroke: undefined,
  strokeWidth: undefined,
  shadow: undefined,
  cornerRadius: undefined,
  component: {
    id: uuidv4(),
    name: "component",
    type: "Component",
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    rotation: 0,
    opacity: 1,
    visible: true,
    fill: undefined,
    fillGradient: undefined,
    stroke: undefined,
    strokeWidth: undefined,
    shadow: undefined,
    cornerRadius: undefined,
  },
  children: []
};

export const DEFAULT_RECT: INode = {
  id: uuidv4(),
  name: "rectangle",
  type: "Rect",
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  rotation: 0,
  opacity: 1,
  visible: true,
  fill: "#C4C4C4",
  fillGradient: undefined,
  stroke: undefined,
  strokeWidth: undefined,
  shadow: undefined,
  cornerRadius: undefined
};

export const DEFAULT_CIRCLE: INode = {
  id: uuidv4(),
  name: "circle",
  type: "Circle",
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  rotation: 0,
  opacity: 1,
  visible: true,
  fill: "#C4C4C4",
  fillGradient: undefined,
  stroke: undefined,
  strokeWidth: undefined,
  radius: undefined
};

export const DEFAULT_ELLIPSE: INode = {
  id: uuidv4(),
  name: "ellipse",
  type: "Ellipse",
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  rotation: 0,
  opacity: 1,
  visible: true,
  fill: "#C4C4C4",
  fillGradient: undefined,
  stroke: undefined,
  strokeWidth: undefined,
  radiusX: undefined,
  radiusY: undefined
};

export const DEFAULT_LINE: INode = {
  id: uuidv4(),
  name: "line",
  type: "Line",
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  rotation: 0,
  opacity: 1,
  visible: true,
  fill: "#C4C4C4",
  fillGradient: undefined,
  stroke: undefined,
  strokeWidth: undefined,
  points: [0, 0, 100, 100],
  closed: false
};

export const DEFAULT_ARROW: INode = {
  id: uuidv4(),
  name: "arrow",
  type: "Arrow",
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  rotation: 0,
  opacity: 1,
  visible: true,
  fill: "#C4C4C4",
  fillGradient: undefined,
  stroke: undefined,
  strokeWidth: undefined,
  pointerLength: 10,
  pointerWidth: 5,
};

export const DEFAULT_PEN: INode = {
  id: uuidv4(),
  name: "pen",
  type: "Pen",
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  rotation: 0,
  opacity: 1,
  visible: true,
  fill: "#C4C4C4",
  fillGradient: undefined,
  stroke: undefined,
  strokeWidth: undefined,
  path: ""
};

export const DEFAULT_POLYGON: INode = {
  id: uuidv4(),
  name: "polygon",
  type: "Polygon",
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  rotation: 0,
  opacity: 1,
  visible: true,
  fill: "#C4C4C4",
  fillGradient: undefined,
  stroke: undefined,
  strokeWidth: undefined,
  sides: 3,
  radius: 50
};

export const DEFAULT_STAR: INode = {
  id: uuidv4(),
  name: "star",
  type: "Star",
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  rotation: 0,
  opacity: 1,
  visible: true,
  fill: "#C4C4C4",
  fillGradient: undefined,
  stroke: undefined,
  strokeWidth: undefined,
  innerRadius: 5,
  outerRadius: 5
};

export const DEFAULT_RING: INode = {
  id: uuidv4(),
  name: "ring",
  type: "Ring",
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  rotation: 0,
  opacity: 1,
  visible: true,
  fill: "#C4C4C4",
  fillGradient: undefined,
  stroke: undefined,
  strokeWidth: undefined,
  innerRadius: 5,
  outerRadius: 5
};

export const DEFAULT_IMAGE: INode = {
  id: uuidv4(),
  name: "image",
  type: "Image",
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  rotation: 0,
  opacity: 1,
  visible: true,
  fill: "#C4C4C4",
  fillGradient: undefined,
  stroke: undefined,
  strokeWidth: undefined,
  shadow: undefined,
  image: ""
};

export const DEFAULT_TEXT: INode = {
  id: uuidv4(),
  name: "text",
  type: "Text",
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  rotation: 0,
  opacity: 1,
  visible: true,
  fill: "#000",
  fillGradient: undefined,
  stroke: undefined,
  strokeWidth: undefined,
  text: {
    type: "literal",
    value: ""
  },
  fontSize: 16,
  fontFamily: "Arial",
  fontWeight: undefined,
  fontStyle: undefined,
  align: undefined,
  verticalAlign: undefined,
  lineHeight: undefined,
  letterSpacing: undefined,
  decoration: "none",
  textCase: "none",
};
