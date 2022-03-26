import mongoose from "mongoose";

export const idify = (value: string | string[]): any => {
  if (typeof value === "string") return new mongoose.Types.ObjectId(value);
  return value.map((id) => idify(id));
};
