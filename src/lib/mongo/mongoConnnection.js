import mongoose from "mongoose";
import { ROOT_MONGO_CONNECTION } from "config";
const ROOT_MONGO = mongoose.createConnection(ROOT_MONGO_CONNECTION);

export default ROOT_MONGO;
