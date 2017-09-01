import bot from "app/interfaces/telegram";

const sendMessage = (chatId, message) =>
  bot.sendMessage(chatId, message, { parseMode: "HTML" });

export default sendMessage;
