import bot from "app/interfaces/telegram/bot";

const getIfCanMessageUser = async user => {
  const chat = await bot.getChatMember(user.id, bot.me.id);
  console.log("test");
  console.log(chat);
  console.log("test2");
  return chat.result.user.status !== "restricted";
};

export default getIfCanMessageUser;
