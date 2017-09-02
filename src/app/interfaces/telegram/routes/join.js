import { controllerForInterface } from "lib/utils";
import { responses, errors } from "lib";
import {
  handleError,
  sendMessage,
  getNameFromUser,
  isGroupChat,
} from "lib/utils/telegram";
const controller = controllerForInterface("telegram");

const join = async message => {
  try {
    // Protect route
    if (!isGroupChat(message.chat)) {
      return;
    }

    await controller.addUserToGroup(message.from.id, message.chat.id);
    const fullName = getNameFromUser(message.from);
    const text = responses.JOIN_GROUP_SUCCESS.replace("$0", fullName);
    await sendMessage(message.chat.id, text);
    await sendMessage(message.from.id, responses.REVEAL_PROMPT);
  } catch (error) {
    handleError(error, message);
  }
};

export default join;
