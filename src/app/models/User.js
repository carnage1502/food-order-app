import { model, models, Schema } from "mongoose";

const UserScehma = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
  },
  { timestamps: true }
);

export const User = models?.User || model("User", UserScehma);
