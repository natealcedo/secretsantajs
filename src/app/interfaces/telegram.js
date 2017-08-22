import TeleBot from "telebot";
import { TELEBOT_CONFIG } from "config";
import { commandNotFound } from "lib/utils/responses";
import { telegram as telegramRoutes } from "app/routes";
import _controller from "app/controllers";
import { logger } from "lib/utils";
import { errors } from "lib";

// Expose platform to controller
const INTERFACE = "telegram";
const controller = Object.keys(_controller).reduce((acc, key) => {
  acc[key] = _controller[key](INTERFACE);
  return acc;
}, {});

// Instantiate bot instance
const telegramBot = new TeleBot(process.env.TELEGRAM_TOKEN);
// Log once when bot starts
telegramBot.on("start", () => {
  logger.info("Bot now polling for updates...");
});

telegramBot.on("/start", async message => {
  try {
    await controller.createGroup(message.chat.id);
    message.reply.text(CREATE_GROUP_SUCCESS);
  } catch (error) {
    handleError(error, message);
  }
});

telegramBot.on("/join", async message => {
  try {
    await controller.addUserToGroup(message.from.id, message.chat.id);
    const fullName = nameFromObject(message.from);
    message.reply.text(JOIN_GROUP_SUCCESS.replace("$0", fullName));
  } catch (error) {
    handleError(error, message);
  }
});

telegramBot.on("/list", async message => {
  try {
    const userIdList = await controller.getUserList(message.chat.id);
    const userPromises = await userIdList.map(async userId =>
      telegramBot.getChatMember(message.chat.id, userId),
    );
    const rawUsers = await Promise.all(userPromises);
    const users = rawUsers.map(value => value.result.user);
    const fullNames = users.map(user => nameFromObject(user));
    const namesWithIndex = fullNames.map(
      (name, index) => `\n${index + 1}. ${name}`,
    );
    message.reply.text(`Secret santa participants: ${namesWithIndex}`);
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
