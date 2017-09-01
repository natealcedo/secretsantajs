import { responses } from "lib";
import { handleError, sendMessage } from "lib/utils/telegram";

const info = async message => {
  try {
    await sendMessage(message.chat.id, responses.BOT_INFO);
  } catch (error) {
    handleError(error, message);
  }
};

export default info;
