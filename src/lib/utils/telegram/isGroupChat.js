const isGroupChat = chat => chat.type === "group" || chat.type === "supergroup";

export default isGroupChat;
