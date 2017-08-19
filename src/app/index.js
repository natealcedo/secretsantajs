import { TELEBOT_CONFIG } from "config";
import TeleBot from "telebot";

const bot = new TeleBot(process.env.TELEGRAM_TOKEN);

bot.on("start", () => {
  console.log("Bot now polling for updates...");
});

bot.on("text", msg => msg.reply.text(msg.text));

export default bot;
