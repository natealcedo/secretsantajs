import ROOT_MONGO from "lib/mongo";
import mongoose, { Schema } from "mongoose";

const GroupSchema = new Schema(
  {
    _createdBy: {
      ref: "User",
      required: true,
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  },
);

const Group = ROOT_MONGO.model("Group", GroupSchema);
export default Group;
