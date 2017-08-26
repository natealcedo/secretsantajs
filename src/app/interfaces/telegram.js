import TeleBot from "telebot";
import { TELEBOT_CONFIG } from "config";
import { commandNotFound } from "lib/utils/responses";
import { telegram as telegramRoutes } from "app/routes";
import _controller from "app/controllers";
import { logger } from "lib/utils";
import { errors } from "lib";

// Expose interface/platform to controller
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
    await sendMessage(message.chat.id, CREATE_GROUP_SUCCESS);
  } catch (error) {
    handleError(error, message);
  }
});

telegramBot.on("/join", async message => {
  try {
    await controller.addUserToGroup(message.from.id, message.chat.id);
    const fullName = nameFromObject(message.from);
    await sendMessage(
      message.chat.id,
      JOIN_GROUP_SUCCESS.replace("$0", fullName),
    );
  } catch (error) {
    handleError(error, message);
  }
});

telegramBot.on("/leave", async message => {
  try {
    await controller.removeUserFromGroup(message.from.id, message.chat.id);
    const fullName = nameFromObject(message.from);
    await sendMessage(
      message.chat.id,
      LEAVE_GROUP_SUCCESS.replace("$0", fullName),
    );
  } catch (error) {
    handleError(error, message);
  }
});

telegramBot.on("/list", async message => {
  try {
    const userIds = await controller.getUserList(message.chat.id);
    const userNames = await getNamesFromIds(userIds, message.chat.id);
    if (userNames.length === 0) {
      message.reply.text(NO_PARTICIPANTS);
      return;
    }
    const namesWithIndex = userNames.map(
      (name, index) => `\n${index + 1}. ${name}`,
    );
    console.log(namesWithIndex);
    await sendMessage(
      message.chat.id,
      LIST_PARTICIPANTS.replace("$0", namesWithIndex.join("")),
    );
  } catch (error) {
    handleError(error, message);
  }
});

telegramBot.on("/shuffle", async message => {
  try {
    const receipients = await controller.assignGiftRecepients(message.chat.id);
  } catch (error) {
    handleError(error, message);
  }
});

telegramBot.on("/test", async message => {
  console.log(message);
  try {
    await sendMessage(message.chat.id, "it works!");
  } catch (error) {
    handleError(error, message);
  }
});

telegramBot.on("/disperse", async message => {
  try {
    // Get chat group title
    const groupObject = await telegramBot.getChat(message.chat.id);
    // Get group object from db
    const group = await controller.getGroup(message.chat.id);
    const groupName = groupObject.result.title;
    // Get names from db's group object
    const receipientNames = await getNamesFromIds(
      group.receipients,
      message.chat.id,
    );
    const text = RECEIPIENT_REVEAL.replace("$0", groupName);
    // Blast private messages
    const promises = group.users.map((user, index) => {
      const receipientName = receipientNames[index];
      const finalText = text.replace("$1", receipientName);
      return sendMessage(user, finalText);
    });
    await Promise.all(promises);
  } catch (error) {
    handleError(error, message);
  }
});

telegramBot.on("/receipients", async message => {
  try {
    const receipients = await controller.getReceipients(message.from.id);
    console.log(receipients);
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

const sendMessage = (chatId, message) =>
  telegramBot.sendMessage(chatId, message, { parseMode: "HTML" });

const handleError = (error, message) => {
  if (!error.name && error.error_code) {
    sendMessage(
      message.chat.id,
      `ERROR ${error.error_code}: ${error.description}`,
    );
    return;
  }
  sendMessage(message.chat.id, `ERROR ${error.name}: ${error.message}`);
};

const getNamesFromIds = async (userIds, groupId) => {
  if (!groupId) {
    throw errors.GROUP_DOES_NOT_EXIST; // he attac but he also protec
  }
  try {
    const userPromises = userIds.map(userId =>
      telegramBot.getChatMember(groupId, userId),
    );
    const rawUsers = await Promise.all(userPromises);
    const users = rawUsers.map(value => value.result.user);
    return users.map(nameFromObject);
  } catch (error) {
    throw error;
  }
};

const nameFromObject = fromObject => {
  const nameArray = [];
  if (fromObject.first_name) {
    nameArray.push(`<b>${escapeCharacters(fromObject.first_name)}`);
  }
  if (fromObject.last_name) {
    nameArray.push(`${escapeCharacters(fromObject.last_name)}</b>`);
  }
  if (fromObject.username) {
    nameArray.push(`(@${fromObject.username})`);
  }
  const name = nameArray.join(" ");
  return name;
};

const escapeCharacters = string =>
  string
    .replace("<", "&lt;")
    .replace(">", "&gt;")
    .replace("&", "&amp;")
    .replace("\"", "&quot;");

export default telegramBot;

const RECEIPIENT_REVEAL = "Your secret santa gift receipient from $0 is $1.";
const NO_PARTICIPANTS =
  "No one has joined the secret santa yet! Type /join to participate.";
const LIST_PARTICIPANTS = "Secret santa participants: $0";
const CREATE_GROUP_SUCCESS =
  "Ho ho ho! A secret santa has been started! Type /join to participate.";
const JOIN_GROUP_SUCCESS = "$0 has joined the secret santa.";
const LEAVE_GROUP_SUCCESS = "$0 has left the secret santa.";
