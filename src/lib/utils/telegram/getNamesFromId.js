import bot from "app/interfaces/telegram/bot";
import { errors } from "lib";
import { nameFromObject } from "lib/utils/telegram";

const getNamesFromId = async (userIds, groupId) => {
  if (!groupId) {
    throw errors.GROUP_DOES_NOT_EXIST; // he attac but he also protec
  }
  try {
    const userPromises = userIds.map(userId =>
      bot.getChatMember(groupId, userId),
    );
    const rawUsers = await Promise.all(userPromises);
    const users = rawUsers.map(value => value.result.user);
    return users.map(nameFromObject);
  } catch (error) {
    throw error;
  }
};

export default getNamesFromId;
