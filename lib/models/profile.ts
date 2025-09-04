import mongoose, { Schema } from "mongoose";
import { IProfile } from "../types";

const ProfileSchema = new Schema<IProfile>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: "" },
}, {
  timestamps: true,
});

export default mongoose.models.Profile || mongoose.model<IProfile>("Profile", ProfileSchema);