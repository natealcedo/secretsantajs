import sendMessage from "./sendMessage";

const handleError = (error, message) => {
  // For telegram API errors
  if (!error.name && error.error_code) {
    return sendMessage(
      message.chat.id,
      `ERROR ${error.error_code}: ${error.description}`,
    );
  }
  // For other errors
  sendMessage(message.chat.id, error.message);
};

export default handleError;
