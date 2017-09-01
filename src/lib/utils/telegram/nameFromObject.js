import escapeCharacters from "./escapeCharacters";

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

export default nameFromObject;
