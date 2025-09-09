import mongoose, { Schema } from "mongoose";
import { IBoard, INode } from "../types";

const ShadowSchema = new Schema({
  x: Number,
  y: Number,
  blur: Number,
  spread: Number,
  color: String,
  opacity: Number,
}, { _id: false });

const TextSchema = new Schema({
  type: { type: String, enum: ["literal", "property"], required: true },
  key: String,
  value: String,
}, { _id: false });

const NodeSchema = new Schema<INode>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ["Page", "Rect", "Circle", "Ellipse", "Line", "Arrow", "Pen", "Polygon", "Star", "Ring", "Text", "Frame", "Image", "Component"],
    required: true,
  },
  layout: { type: Number, default: 0 },
  padding: { type: Number, default: 0 },
  gapX: { type: Number, default: 0 },
  gapY: { type: Number, default: 0 },

  // Base
  x: Number,
  y: Number,
  width: Number,
  height: Number,
  rotation: Number,
  opacity: Number,
  visible: Boolean,
  fill: String,
  fillGradient: String,
  stroke: String,
  strokeWidth: Number,
  shadow: ShadowSchema,

  // Shape-specific
  cornerRadius: Schema.Types.Mixed,
  radius: Number,
  radiusX: Number,
  radiusY: Number,
  points: [Number],
  closed: Boolean,
  pointerLength: Number,
  pointerWidth: Number,
  path: String,
  sides: Number,
  totalPoints: Number,
  innerRadius: Number,
  outerRadius: Number,
  image: String,

  // Text
  text: TextSchema,
  fontFamily: String,
  fontSize: Number,
  fontStyle: { type: String, enum: ["normal", "bold", "italic"] },
  fontWeight: Number,
  align: { type: String, enum: ["left", "center", "right", "justify"] },
  verticalAlign: { type: String, enum: ["top", "middle", "bottom"] },
  lineHeight: Number,
  letterSpacing: Number,
  decoration: { type: String, enum: ["none", "underline", "line-through"] },
  textCase: { type: String, enum: ["none", "capitalize", "uppercase", "lowercase"] },

  // Frame
  layoutType: { type: String, enum: ["vertical", "horizontal", "grid"] },
  children: { type: [Object], default: [] },
  component: { type: Object },
}, { _id: false });

const BoardSchema = new Schema<IBoard>({
  name: { type: String, required: true },
  owner_id: { type: Schema.Types.ObjectId, ref: "Profile", required: true },
  project_id: { type: Schema.Types.ObjectId, ref: "Project", required: true },
  root: {
    type: NodeSchema,
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.Board || mongoose.model<IBoard>("Board", BoardSchema);