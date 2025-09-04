import { z } from "zod";
import * as Schema from './schema';
import Konva from "konva";

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

export interface IAccount {
  id?: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IProject {
  id?: string;
  name: string;
  ownerId: string;
  avatar: string;
  color: string;
  properties: {
    key: string,
    type: string,
    options?: string[]
  }[];
  schedules: {
    [key: string]: string
  }[];
  createdAt?: string;
  updatedAt?: string;
};

export interface IBoard {
  id?: string;
  projectId: string;
  ownerId: string;

  createdAt?: string;
  updatedAt?: string;
}