import { controllerForInterface } from "lib/utils";
import { responses } from "lib";
import { handleError, sendMessage, getNamesFromIds } from "lib/utils/telegram";
const controller = controllerForInterface("telegram");

const list = async message => {
  try {
    const userIds = await controller.getUserList(message.chat.id);
    const userNames = await getNamesFromIds(userIds, message.chat.id);
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
  } catch (error) {
    handleError(error, message);
  }
};

export default list;
