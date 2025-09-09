import mongoose, { Schema } from "mongoose";
import { IProject } from "../types";

const ProjectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  owner_id: { type: Schema.Types.ObjectId, ref: "Profile", required: true },
  data: [
    {
      _id: false,
      type: Schema.Types.Mixed
    },
  ],
  properties: [
    {
      _id: false,
      type: { type: String, enum: ["text", "boolean"], required: true },
      key: { type: String, required: true },
    },
  ],
}, {
  timestamps: true,
});

export default mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);