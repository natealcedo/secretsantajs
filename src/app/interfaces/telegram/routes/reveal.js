import { controllerForInterface } from "lib/utils";
import { responses } from "lib";
import { handleError, sendMessage, getNamesFromId } from "lib/utils/telegram";
import bot from "app/interfaces/telegram";

const controller = controllerForInterface("telegram");
const assign = async message => {
  try {
    // Get group object from db
    const group = await controller.getGroup(message.chat.id);
    // Get names from db's group object
    const recipientNames = await getNamesFromId(
      group.recipients,
      message.chat.id,
    );
    const giverNames = group.users.map(
      recipient => recipientNames[group.recipients.indexOf(recipient)],
    );
    const text = responses.LIST_PARTICIPANTS_AND_SANTAS;
    // Blast private messages
    const pairings = group.users.map((user, index) => {
      const recipient = recipientNames[index];
      const giver = giverNames[index];
      const finalText = text.replace("$1", recipient);
      return { recipient, giver };
    });
    await sendMessage(message.chat.id, text);
  } catch (error) {
    handleError(error, message);
  }
};

export default assign;
