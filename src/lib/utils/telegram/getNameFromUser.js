import escapeCharacters from "./escapeCharacters";

const getNameFromUser = fromObject => {
  const nameArray = [];
  if (fromObject.first_name) {
    nameArray.push(`<b>${escapeCharacters(fromObject.first_name)}</b>`);
  }
  if (fromObject.last_name) {
    nameArray.push(`<b>${escapeCharacters(fromObject.last_name)}</b>`);
  }
  if (fromObject.username) {
    nameArray.push(`(@${fromObject.username})`);
  }
  const name = nameArray.join(" ");
  return name;
};

export default getNameFromUser;
