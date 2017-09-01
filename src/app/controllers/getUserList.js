import { Group } from "app/models";
import { errors } from "lib";

const _getUserList = platform => async identifier => {
  const group = await Group.findOne({ platform, identifier, ended: false });
  if (!group) {
    throw errors.GROUP_DOES_NOT_EXIST;
  }
  return group.users;
};

export default _getUserList;
