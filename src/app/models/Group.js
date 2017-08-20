import { ROOT_MONGO } from "lib/mongo";
import mongoose, { Schema } from "mongoose";
import Promise from "bluebird";
import { userSchema } from "./User";

mongoose.Promise = Promise;

export const groupSchema = new Schema(
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
    _users: [userSchema],
    _createdBy: userSchema,
  },
  {
    timestamps: true,
  },
);

const Group = ROOT_MONGO.model("Group", groupSchema);
export default Group;
