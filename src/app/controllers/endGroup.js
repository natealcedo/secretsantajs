import { Group } from "app/models";
import { errors } from "lib";

const _getGroup = platform => async identifier => {
  const group = await Group.findOne({ platform, identifier, ended: false });
  if (!group) {
    throw errors.GROUP_DOES_NOT_EXIST;
  }
  group.ended = true;
  await group.save();
  return group;
};

export default _getGroup;
