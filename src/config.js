const PORT = 8080;
const ROOT_MONGO_CONNECTION =
  process.env.NODE_ENV !== "production"
    ? "mongodb://localhost:27017/secretsantajs"
    : process.env.MONGO;

export default {
  PORT,
  ROOT_MONGO_CONNECTION,
};
