const GROUP_ALREADY_EXISTS = new Error(
  "The secret santa group for this chat already exists.",
);
GROUP_ALREADY_EXISTS.name = "GroupAlreadyExists";

const ERROR = {
  GROUP_ALREADY_EXISTS,
};
export default ERROR;
