import TeleBot from "telebot";
import { TELEBOT_CONFIG } from "config";
import { logger } from "lib/utils";

const bot = new TeleBot(process.env.TELEGRAM_TOKEN);

bot.on("start", () => {
  logger.info("Bot now polling for updates...");
});

bot.on("text", msg => {
  logger.info(`User sent: ${msg}`);
  msg.reply.text(msg.text);
});

export default bot;
