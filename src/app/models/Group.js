import { ROOT_MONGO } from "lib/mongo";
import mongoose, { Schema } from "mongoose";
import Promise from "bluebird";

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
    // All stored strings here are user ids
    users: [String], // participants
    receipients: [String], // generated gift receipients
    informed: [Boolean], // participants who are informed of their receipients
    _createdBy: String,
  },
  {
    timestamps: true,
  },
);

const Group = ROOT_MONGO.model("Group", groupSchema);
export default Group;
