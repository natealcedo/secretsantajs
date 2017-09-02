import { controllerForInterface } from "lib/utils";
import { responses } from "lib";
import {
  handleError,
  sendMessage,
  getNamesFromId,
  isGroupChat,
} from "lib/utils/telegram";

const controller = controllerForInterface("telegram");
const list = async message => {
  try {
    if (isGroupChat(message.chat)) {
      const userIds = await controller.getUserList(message.chat.id);
      const userNames = await getNamesFromId(userIds, message.chat.id);
      if (userNames.length === 0) {
        message.reply.text(responses.NO_PARTICIPANTS);
        return;
      }
      const namesWithIndex = userNames.map(
        (name, index) => `\n${index + 1}. ${name}`,
      );
      await sendMessage(
        message.chat.id,
        responses.LIST_PARTICIPANTS.replace("$0", namesWithIndex.join("")),
      );
    }
    // else send back a list of all secret santas the player is participating in and include his recipient if possible
  } catch (error) {
    handleError(error, message);
  }
};

export default list;
