import { Group } from "app/models";
import { errors } from "lib";

const _getGroup = platform => async identifier => {
  const group = await Group.findOne({ platform, identifier });
  if (!group) {
    throw errors.GROUP_DOES_NOT_EXIST;
  }
  return group;
};

export default _getGroup;
