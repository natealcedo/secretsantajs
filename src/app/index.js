import TeleBot from "telebot";
import { TELEBOT_CONFIG } from "config";
import { logger } from "lib/utils";

const telegramBot = new TeleBot(process.env.TELEGRAM_TOKEN);

telegramBot.on("start", () => {
  logger.info("Bot now polling for updates...");
});

// Sample logging. Add what you think should get logged.
telegramBot.on("text", message => {
  logger.info(`
user: ${message.from.username}
date-time: ${message.date}
chat-type: ${message.chat.type}
message-received: ${message.text}
  `);
  message.reply.text(message.text);
});

export default telegramBot;
