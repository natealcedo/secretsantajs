const GROUP_ALREADY_EXISTS = new Error(
  "The secret santa group for this chat already exists.",
);
GROUP_ALREADY_EXISTS.name = "GroupAlreadyExists";

const errors = {
  GROUP_ALREADY_EXISTS,
};
export default errors;
