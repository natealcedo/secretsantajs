import { ROOT_MONGO } from "lib/mongo";
import mongoose, { Schema } from "mongoose";
import Promise from "bluebird";

mongoose.Promise = Promise;

export const wishlistSchema = new Schema(
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
    wishlist: String,
  },
  {
    timestamps: true,
  },
);

const Wishlist = ROOT_MONGO.model("Wishlist", wishlistSchema);
export default Wishlist;
