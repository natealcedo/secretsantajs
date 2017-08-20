import TeleBot from "telebot";
import { TELEBOT_CONFIG } from "config";
import { commandNotFound } from "lib/utils/responses";
import { telegram as telegramRoutes } from "app/routes";
import controller from "app/controllers";
import { logger } from "lib/utils";
import { ERROR } from "lib";

const telegramBot = new TeleBot(process.env.TELEGRAM_TOKEN);

telegramBot.on("start", () => {
  logger.info("Bot now polling for updates...");
});

telegramBot.on("/start", async message => {
  try {
    await controller.createGroup("telegram")(message.chat.id);
    message.reply.text(
      "Ho ho ho! A secret santa game has been started! Type /join to participate.",
    );
  } catch (error) {
    switch (error) {
      case ERROR.GROUP_ALREADY_EXISTS:
        message.reply.text(
          "The game has already been started! Type /join to participate.",
        );
        break;
    }
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

export default telegramBot;
