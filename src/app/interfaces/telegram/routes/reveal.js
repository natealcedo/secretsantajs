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
const reveal = async message => {
  try {
    // Protect route
    if (!isGroupChat(message.chat)) {
      return;
    }
    if (!await getIfUserIsAdmin(message.chat, message.user)) {
      return;
    }

    const group = await controller.getGroup(message.chat.id);
    // Get list from db and build pairing list
    const recipientNames = await getNamesFromId(
      group.recipients,
      message.chat.id,
    );
    const giverNames = group.users.map(
      recipient => recipientNames[group.recipients.indexOf(recipient)],
    );
    const pairings = group.users.map((user, index) => {
      const recipient = recipientNames[index];
      const giver = giverNames[index];
      const finalText = text.replace("$1", recipient);
      return { recipient, giver };
    });
    // Build string from arrays
    const pairingsStringArray = pairings.map(
      (pairing, index) =>
        `${index}. ${pairing.giver} is the secret santa of ${pairing.recipient}`,
    );
    const text = responses.LIST_PARTICIPANTS_AND_SANTAS;
    await sendMessage(
      message.chat.id,
      text.replace("$0", pairingsStringArray.join("\n")),
    );
  } catch (error) {
    handleError(error, message);
  }
};

export default reveal;
