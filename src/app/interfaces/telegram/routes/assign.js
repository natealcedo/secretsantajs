import { controllerForInterface } from "lib/utils";
import { responses } from "lib";
import {
  handleError,
  sendMessage,
  getNamesFromId,
  isGroupChat,
  getIfUserIsAdmin,
} from "lib/utils/telegram";
import bot from "app/interfaces/telegram";

const controller = controllerForInterface("telegram");
const assign = async message => {
  try {
    // Protect route
    if (!isGroupChat(message.chat)) {
      return;
    }
    if (!await getIfUserIsAdmin(message.chat, message.user)) {
      return;
    }

    await controller.assignGiftRecipients(message.chat.id);
    // Get chat group title
    const groupObject = await bot.getChat(message.chat.id);
    // Get group object from db
    const group = await controller.getGroup(message.chat.id);
    const groupName = groupObject.result.title;
    // Get names from db's group object
    const receipientNames = await getNamesFromId(
      group.receipients,
      message.chat.id,
    );
    const text = responses.RECEIPIENT_REVEAL.replace("$0", groupName);
    // Blast private messages
    const promises = group.users.map((user, index) => {
      const receipientName = receipientNames[index];
      const finalText = text.replace("$1", receipientName);
      return sendMessage(user, finalText);
    });
    await Promise.all(promises);
  } catch (error) {
    handleError(error, message);
  }
};

export default assign;
