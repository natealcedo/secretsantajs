import TeleBot from "telebot";
import { TELEBOT_CONFIG } from "config";
import { logger } from "lib/utils";

// Instantiate bot instance
const botInstance = new TeleBot(process.env.TELEGRAM_TOKEN);

// Log once when bot starts
botInstance.on("start", () => {
  logger.info("Bot now polling for updates...");
});

export default botInstance;
