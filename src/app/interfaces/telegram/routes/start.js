import { controllerForInterface } from "lib/utils";
import { responses } from "lib";
import {
  sendMessage,
  handleError,
  isGroupChat,
  getIfUserIsAdmin,
} from "lib/utils/telegram";
const controller = controllerForInterface("telegram");

const start = async message => {
  // Protect route
  if (!isGroupChat(message.chat)) {
    return;
  }
  if (!await getIfUserIsAdmin(message.chat, message.user)) {
    return;
  }

  try {
    await controller.createGroup(message.chat.id);
    await sendMessage(message.chat.id, responses.CREATE_GROUP_SUCCESS);
  } catch (error) {
    handleError(error, message);
  }
};

export default start;
