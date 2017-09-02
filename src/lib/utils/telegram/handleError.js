import sendMessage from "./sendMessage";
import { errors } from "lib";
import { logger } from "lib/utils";
import getNameFromUser from "./getNameFromUser";

const handleError = async (error, message) => {
  try {
    // For when use tries to send a PM on telegram but failed due to inability to initiate conversation or user has blocked bot
    if (
      error.name === errors.USER_HAVE_NOT_TALKED.name ||
      error.error_code === 403
    ) {
      const fullName = getNameFromUser(message.from);
      await sendMessage(
        message.chat.id,
        errors.USER_HAVE_NOT_TALKED.message.replace("$0", fullName),
      );
      return;
    }
    // For telegram API errors
    if (!error.name && error.error_code) {
      await sendMessage(
        message.chat.id,
        `ERROR ${error.error_code}: ${error.description}`,
      );
      return;
    }
    // For other errors
    await sendMessage(message.chat.id, error.message);
  } catch (error) {
    logger.error(error);
  }
};

export default handleError;
