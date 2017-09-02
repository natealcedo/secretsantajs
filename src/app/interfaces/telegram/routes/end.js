import { controllerForInterface } from "lib/utils";
import { responses } from "lib";
import {
  handleError,
  sendMessage,
  isGroupChat,
  getIfUserIsAdmin,
  getNameFromUser,
} from "lib/utils/telegram";

const controller = controllerForInterface("telegram");
const end = async message => {
  try {
    // Protect route
    if (!isGroupChat(message.chat)) {
      return;
    }
    if (!await getIfUserIsAdmin(message.chat, message.user)) {
      return;
    }

    await controller.endGroup(message.chat.id);
    const fullName = getNameFromUser(message.from);
    await sendMessage(
      message.chat.id,
      responses.END_GROUP_SUCCESS.replace("$0", fullName),
    );
  } catch (error) {
    handleError(error, message);
  }
};

export default end;
