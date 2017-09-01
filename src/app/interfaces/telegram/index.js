import { TELEBOT_CONFIG } from "config";
import { logger } from "lib/utils";
import {
  assign,
  end,
  help,
  info,
  join,
  leave,
  list,
  start,
  reveal,
} from "./routes";
import bot from "./bot";

bot.on("/help", help);
bot.on("/start", start);
bot.on("/join", join);
bot.on("/leave", leave);
bot.on("/list", list);
bot.on("/assign", assign);
bot.on("/reveal", reveal);
bot.on("/end", end);
bot.on("/info", info);

// Sample logging. Add what you think should get logged.
bot.on("text", message => {
  logger.info(`
user: ${message.from.username}
date-time: ${message.date}
chat-type: ${message.chat.type}
message-received: ${message.text}
  `);
});

export default bot;
