import { sendMessage } from "lib/utils/telegram";

const handleError = (error, message) => {
  if (!error.name && error.error_code) {
    return sendMessage(
      message.chat.id,
      `ERROR ${error.error_code}: ${error.description}`,
    );
  }
  sendMessage(message.chat.id, `ERROR ${error.name}: ${error.message}`);
};

export default handleError;
