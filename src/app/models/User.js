import { ROOT_MONGO } from "lib/mongo";
import mongoose, { Schema } from "mongoose";
import Promise from "bluebird";

mongoose.Promise = Promise;

export const userSchema = new Schema(
  {
    platform: {
      type: String,
      required: true,
      enum: ["facebook", "telegram", "slack"],
    },
    identifier: {
      type: String,
      required: true,
    },
    username: String,
  },
  {
    timestamps: true,
  },
);

const User = ROOT_MONGO.model("User", userSchema);
export default User;
