import TeleBot from "telebot";
import { TELEBOT_CONFIG } from "config";
import { commandNotFound } from "lib/utils/responses";
import { telegram as telegramRoutes } from "app/routes";
import controller from "app/controllers";
import { logger } from "lib/utils";
import { errors } from "lib";

const telegramBot = new TeleBot(process.env.TELEGRAM_TOKEN);

telegramBot.on("start", () => {
  logger.info("Bot now polling for updates...");
});

telegramBot.on("/start", async message => {
  try {
    await controller.createGroup("telegram")(message.chat.id);
    message.reply.text(CREATE_GROUP_SUCCESS);
  } catch (error) {
    handleError(error, message);
  }
});

telegramBot.on("/join", async message => {
  try {
    await controller.addUserToGroup("telegram")(
      message.chat.id,
      message.chat.id,
    );
    const fullName = nameFromObject(message.from);
    message.reply.text(JOIN_GROUP_SUCCESS.replace("$0", fullName));
  } catch (error) {
    handleError(error, message);
  }
});

// Sample logging. Add what you think should get logged.
telegramBot.on("text", message => {
  logger.info(`
user: ${message.from.username}
date-time: ${message.date}
chat-type: ${message.chat.type}
message-received: ${message.text}
  `);
  /*
   * TODO: Implement a parser to parse input.
   * Eg: If the input command is wrong, show an error.
   * Or if command is correct but second command is wrong still need
   * to respond in a more friendly manner.
   *
   */
  const userInput = message.text.toLowerCase();
  if (!telegramRoutes.includes(userInput)) {
    const response = commandNotFound();
    return message.reply.text(response);
  }
  // message.reply.text(message.text);
});

const handleError = (error, message) => {
  message.reply.text(`ERROR ${error.name}: ${error.message}`);
};

const nameFromObject = fromObject => {
  if (fromObject.last_name) {
    return `${fromObject.first_name} ${fromObject.last_name}`;
  }
  return fromObject.first_name;
};

export default telegramBot;

const CREATE_GROUP_SUCCESS =
  "Ho ho ho! A secret santa game has been started! Type /join to participate.";
const JOIN_GROUP_SUCCESS = "$0 has joined the secret santa game!";
