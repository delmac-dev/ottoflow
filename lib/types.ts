import { z } from "zod";
import * as Schema from './schema';
import Konva from "konva";
import { Document, Types } from "mongoose";

export type ISignUp = z.infer<typeof Schema.ZSignUp>;
export type ISignIn = z.infer<typeof Schema.ZSignIn>;
export type IAIArea = z.infer<typeof Schema.ZAIArea>;

export type IQuery = {
  params: {[key: string]: string}
  searchParams: { [key: string]: string }
}

export type KonvaMouseEvent = Konva.KonvaEventObject<MouseEvent>;

export enum BoardMode {
  Selecting = "Selecting",
  Drawing = "Drawing",
  Transforming = "Transforming",
  Idle = "Idle",                 
}

export enum Action {
  Select = "Select",
  Frame = "Frame",
  Rectangle = "Rectangle",
  Circle = "Circle",
  Arrow = "Arrow",
  Line = "Line",
  Pen = "Pen",
  Star = "Star",
  Polygon = "Polygon",
  Ring = "Ring",
  Text = "Text",
  Image = "Image",
}

export interface IProfile extends Document {
  username: string;
  email: string;
  password: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProject extends Document {
  name: string;
  owner_id: Types.ObjectId;
  data: { key: string; value: string }[][];
  properties: { type: "text" | "boolean"; key: string }[];
  createdAt: Date;
  updatedAt: Date;
};

export interface IBoard extends Document {
  name: string;
  owner_id: Types.ObjectId;
  project_id: Types.ObjectId;
  root: INode;
  createdAt: Date;
  updatedAt: Date;
}

export interface INode {
  id: string;
  name: string;
  type: "Page" | "Rect" | "Circle" | "Ellipse" | "Line" | "Arrow" | "Pen" | "Polygon" | "Star" | "Ring" | "Text" | "Frame";

  // Base props
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  rotation?: number;
  opacity?: number;
  visible?: boolean;
  fill?: string;
  fillGradient?: string;
  stroke?: string;
  strokeWidth?: number;
  shadow?: {
    x?: number;
    y?: number;
    blur?: number;
    spread?: number;
    color?: string;
    opacity?: number;
  };

  // Shape-specific
  cornerRadius?: number | number[];
  radius?: number;
  radiusX?: number;
  radiusY?: number;
  points?: number[];
  closed?: boolean;
  pointerLength?: number;
  pointerWidth?: number;
  path?: string;
  sides?: number;
  totalPoints?: number;
  innerRadius?: number;
  outerRadius?: number;

  // Text-specific
  text?: {
    type: "literal" | "property";
    key?: string;
    value?: string;
  };
  fontFamily?: string;
  fontSize?: number;
  fontStyle?: "normal" | "bold" | "italic";
  fontWeight?: number;
  align?: "left" | "center" | "right" | "justify";
  verticalAlign?: "top" | "middle" | "bottom";
  lineHeight?: number;
  letterSpacing?: number;
  decoration?: "none" | "underline" | "line-through";
  textCase?: "none" | "capitalize" | "uppercase" | "lowercase";

  // Frame-specific
  layoutType?: "vertical" | "horizontal" | "grid";
  children?: INode[];
  component?: INode;
}