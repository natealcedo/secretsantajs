import { responses } from "lib";
import { handleError, sendMessage } from "lib/utils/telegram";

const help = async message => {
  try {
    await sendMessage(message.chat.id, responses.HELP_INFO_GROUP);
  } catch (error) {
    handleError(error, message);
  }
};

export default help;
