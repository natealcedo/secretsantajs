import bot from "app/interfaces/telegram/bot";

const getIfUserIsAdmin = async (chat, user) => {
  if (chat.all_members_are_administrators) {
    return true;
  }
  const admins = await bot.getChatAdministrators(chat.id);
  const adminIds = admins.map(admin => admin.status);
  return adminIds.includes(user.id);
};

export default getIfUserIsAdmin;
