import { sendMessage } from "app/interfaces/telegram/bot";

const handleError = (error, message) => {
  if (!error.name && error.error_code) {
    sendMessage(
      message.chat.id,
      `ERROR ${error.error_code}: ${error.description}`,
    );
    return;
  }
  sendMessage(message.chat.id, `ERROR ${error.name}: ${error.message}`);
};

export default handleError;
