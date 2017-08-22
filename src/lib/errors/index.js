const GROUP_ALREADY_EXISTS = new Error(
  "The secret santa group for this chat already exists.",
);
GROUP_ALREADY_EXISTS.name = "GroupAlreadyExists";
const GROUP_DOES_NOT_EXIST = new Error(
  "No one has started the secret santa game for this chat group yet! Type /start to start.",
);
GROUP_DOES_NOT_EXIST.name = "GroupDoesNotExist";
const USER_ALREADY_IN_GROUP = new Error("You have already joined the game!");
USER_ALREADY_IN_GROUP.name = "UserAlreadyInGroup";
const USER_NOT_IN_GROUP = new Error(
  "You have yet to join the game, type /join to join!",
);
USER_NOT_IN_GROUP.name = "UserNotInGroup";

const errors = {
  GROUP_ALREADY_EXISTS,
  GROUP_DOES_NOT_EXIST,
  USER_ALREADY_IN_GROUP,
  USER_NOT_IN_GROUP,
};
export default errors;
